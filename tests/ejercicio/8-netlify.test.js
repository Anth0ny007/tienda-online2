const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

describe('Ejercicio 8: Publicación en Netlify', () => {
  let myPageData, siteHtml;
  const myPagePath = path.join(__dirname, '../../my-page.js');

  // Función auxiliar para hacer peticiones HTTP/HTTPS
  const fetchUrl = (url) => {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      const timeout = 10000; // 10 segundos

      const req = protocol.get(url, { timeout }, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve({ statusCode: res.statusCode, data, headers: res.headers });
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
  };

  // Función para leer y evaluar el archivo my-page.js
  const loadMyPageData = () => {
    try {
      const fileContent = fs.readFileSync(myPagePath, 'utf-8');
      // Crear un contexto aislado para evaluar el código
      const dataMatch = fileContent.match(/data\s*=\s*({[\s\S]*?})/);
      if (dataMatch) {
        // Usar eval de forma segura solo para el objeto data
        const dataString = dataMatch[1];
        return eval(`(${dataString})`);
      }
      return null;
    } catch (error) {
      console.error('Error al leer my-page.js:', error.message);
      return null;
    }
  };

  describe('Archivo my-page.js', () => {
    test('Debe existir el archivo my-page.js', () => {
      expect(fs.existsSync(myPagePath)).toBeTruthy();
    });

    test('El archivo debe contener datos válidos', () => {
      myPageData = loadMyPageData();
      expect(myPageData).toBeTruthy();
      expect(myPageData).toHaveProperty('name');
      expect(myPageData).toHaveProperty('matricula');
      expect(myPageData).toHaveProperty('url');
    });

    test('El campo "name" debe contener un nombre completo válido', () => {
      myPageData = loadMyPageData();
      if (myPageData) {
        expect(myPageData.name).toBeTruthy();
        expect(myPageData.name.length).toBeGreaterThan(5);
        expect(myPageData.name).not.toMatch(/Nombre completo del estudiante/i);
        // Verificar que tenga al menos dos palabras (nombre y apellido)
        const words = myPageData.name.trim().split(/\s+/);
        expect(words.length).toBeGreaterThanOrEqual(2);
      }
    });

    test('El campo "matricula" debe ser válido', () => {
      myPageData = loadMyPageData();
      if (myPageData) {
        expect(myPageData.matricula).toBeTruthy();
        expect(myPageData.matricula.toString().length).toBeGreaterThan(4);
        expect(myPageData.matricula).not.toMatch(/Su matrícula sin guiones/i);
        expect(myPageData.matricula).not.toMatch(/matrícula/i);
        // Verificar que no contenga guiones
        expect(myPageData.matricula.toString()).not.toMatch(/-/);
      }
    });

    test('El campo "url" debe tener formato válido de Netlify', () => {
      myPageData = loadMyPageData();
      if (myPageData) {
        expect(myPageData.url).toBeTruthy();
        const urlPattern = /^https?:\/\/.+/;
        expect(urlPattern.test(myPageData.url)).toBeTruthy();
        expect(myPageData.url).not.toMatch(/su-url-personal/i);
      }
    });

    test('La URL debe terminar con /', () => {
      myPageData = loadMyPageData();
      if (myPageData && myPageData.url) {
        expect(myPageData.url.endsWith('/')).toBeTruthy();
      }
    });
  });

  describe('Accesibilidad del Sitio', () => {
    beforeAll(async () => {
      myPageData = loadMyPageData();
      
      if (myPageData && myPageData.url) {
        let url = myPageData.url;
        
        // Asegurar que la URL termine con /
        if (!url.endsWith('/')) {
          url += '/';
        }

        try {
          const response = await fetchUrl(url);
          siteHtml = response.data;
        } catch (error) {
          console.error('Error al obtener el sitio:', error.message);
          siteHtml = '';
        }
      }
    }, 30000); // Timeout de 30 segundos para el beforeAll

    test('El sitio debe ser accesible (código 200)', async () => {
      if (!myPageData || !myPageData.url) {
        throw new Error('No se pudo leer la URL del archivo my-page.js');
      }

      try {
        const response = await fetchUrl(myPageData.url);
        expect(response.statusCode).toBe(200);
      } catch (error) {
        throw new Error(`Sitio no accesible: ${error.message}`);
      }
    }, 15000);

    test('El sitio debe retornar contenido HTML', async () => {
      if (!myPageData || !myPageData.url) {
        throw new Error('No se pudo leer la URL del archivo my-page.js');
      }

      try {
        const response = await fetchUrl(myPageData.url);
        expect(response.headers['content-type']).toMatch(/text\/html/);
      } catch (error) {
        console.warn('No se pudo verificar el content-type:', error.message);
      }
    }, 15000);
  });

  describe('Contenido del Sitio Publicado', () => {
    test('El HTML debe tener un título apropiado', () => {
      if (siteHtml) {
        const titleMatch = siteHtml.match(/<title>(.*?)<\/title>/i);
        expect(titleMatch).toBeTruthy();
        if (titleMatch) {
          const title = titleMatch[1];
          const hasRelevantTitle = /ejercicio|api|tienda|store/i.test(title);
          expect(hasRelevantTitle).toBeTruthy();
        }
      } else {
        console.warn('No se pudo obtener el HTML del sitio');
      }
    });

    test('El HTML debe incluir Bootstrap 5', () => {
      if (siteHtml) {
        const hasBootstrap = /bootstrap@5|bootstrap\/5|bootstrap\.min\.css/i.test(siteHtml);
        expect(hasBootstrap).toBeTruthy();
      }
    });

    test('El HTML debe tener el elemento con id="ofertas"', () => {
      if (siteHtml) {
        const hasOfertas = /id\s*=\s*["']ofertas["']/i.test(siteHtml);
        expect(hasOfertas).toBeTruthy();
      }
    });

    test('El HTML debe tener el elemento con id="carrusel" o "carousel"', () => {
      if (siteHtml) {
        const hasCarrusel = /id\s*=\s*["']carr(?:u|o)sel["']/i.test(siteHtml);
        expect(hasCarrusel).toBeTruthy();
      }
    });

    test('El HTML debe tener el elemento con id="catalogo"', () => {
      if (siteHtml) {
        const hasCatalogo = /id\s*=\s*["']catalogo["']/i.test(siteHtml);
        expect(hasCatalogo).toBeTruthy();
      }
    });

    test('El HTML debe tener un modal de Bootstrap', () => {
      if (siteHtml) {
        const hasModal = /class\s*=\s*["'][^"']*\bmodal\b[^"']*["']/i.test(siteHtml);
        expect(hasModal).toBeTruthy();
      }
    });

    test('El HTML debe tener un navbar', () => {
      if (siteHtml) {
        const hasNavbar = /class\s*=\s*["'][^"']*\bnavbar\b[^"']*["']|<nav/i.test(siteHtml);
        expect(hasNavbar).toBeTruthy();
      }
    });

    test('El HTML debe incluir el archivo JavaScript', () => {
      if (siteHtml) {
        const hasJS = /src\s*=\s*["'][^"']*api-store\.js["']|src\s*=\s*["'][^"']*js\/api-store\.js["']/i.test(siteHtml);
        expect(hasJS).toBeTruthy();
      }
    });
  });

  describe('Estructura del Proyecto Local', () => {
    test('Debe existir index.html en docs/', () => {
      const indexPath = path.join(__dirname, '../../docs/index.html');
      expect(fs.existsSync(indexPath)).toBeTruthy();
    });

    test('Debe existir api-store.js en docs/js/', () => {
      const jsPath = path.join(__dirname, '../../docs/js/api-store.js');
      expect(fs.existsSync(jsPath)).toBeTruthy();
    });

    test('La carpeta docs debe existir', () => {
      const docsPath = path.join(__dirname, '../../docs');
      expect(fs.existsSync(docsPath)).toBeTruthy();
    });
  });

  describe('Verificación Final', () => {
    test('Todos los archivos necesarios están presentes', () => {
      const requiredFiles = [
        path.join(__dirname, '../../my-page.js'),
        path.join(__dirname, '../../docs/index.html'),
        path.join(__dirname, '../../docs/js/api-store.js')
      ];

      const allExist = requiredFiles.every(file => fs.existsSync(file));
      expect(allExist).toBeTruthy();
    });

    test('Los datos en my-page.js son válidos y el sitio es accesible', async () => {
      myPageData = loadMyPageData();
      
      if (!myPageData || !myPageData.url) {
        throw new Error('No se pudo leer los datos del archivo my-page.js');
      }

      // Verificar que los datos no sean los valores por defecto
      expect(myPageData.name).not.toMatch(/Nombre completo del estudiante/i);
      expect(myPageData.matricula).not.toMatch(/Su matrícula sin guiones/i);
      expect(myPageData.url).not.toMatch(/su-url-personal/i);

      // Verificar que el sitio sea accesible
      try {
        const response = await fetchUrl(myPageData.url);
        expect(response.statusCode).toBe(200);
        expect(response.data.length).toBeGreaterThan(0);
      } catch (error) {
        throw new Error(`No se pudo verificar la URL: ${error.message}`);
      }
    }, 15000);
  });
});
