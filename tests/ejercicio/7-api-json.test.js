const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Ejercicio 7: Uso de API - JSON', () => {
  let htmlContent, jsContent, cssContent, dom, window, document;
  const htmlPath = path.join(__dirname, '../../docs/index.html');
  const jsPath = path.join(__dirname, '../../docs/js/api-store.js');
  const cssPath = path.join(__dirname, '../../docs/css/api-store.css');

  beforeAll(() => {
    // Verificar que los archivos existan
    if (!fs.existsSync(htmlPath)) {
      throw new Error(`No se encuentra el archivo ${htmlPath}`);
    }
    if (!fs.existsSync(jsPath)) {
      throw new Error(`No se encuentra el archivo ${jsPath}`);
    }

    htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    jsContent = fs.readFileSync(jsPath, 'utf-8');
    
    // CSS es opcional
    if (fs.existsSync(cssPath)) {
      cssContent = fs.readFileSync(cssPath, 'utf-8');
    }
  });

  describe('Estructura HTML', () => {
    beforeAll(() => {
      dom = new JSDOM(htmlContent);
      window = dom.window;
      document = window.document;
    });

    test('El HTML debe tener un título apropiado', () => {
      const title = document.querySelector('title');
      expect(title).toBeTruthy();
      expect(title.textContent).toMatch(/ejercicio\s*7|api|tienda|store/i);
    });

    test('Debe incluir Bootstrap 5 CSS', () => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      const hasBootstrap = Array.from(links).some(link => 
        link.href.includes('bootstrap') && link.href.includes('5')
      );
      expect(hasBootstrap).toBeTruthy();
    });

    test('Debe incluir Bootstrap 5 JS', () => {
      const scripts = document.querySelectorAll('script');
      const hasBootstrapJS = Array.from(scripts).some(script => 
        script.src.includes('bootstrap') && script.src.includes('5')
      );
      expect(hasBootstrapJS).toBeTruthy();
    });

    test('Debe enlazar el archivo api-store.js', () => {
      const scripts = document.querySelectorAll('script');
      const hasApiStoreJS = Array.from(scripts).some(script => 
        script.src.includes('api-store.js') || 
        script.getAttribute('src')?.includes('api-store.js') ||
        script.src.includes('js/api-store.js') ||
        script.getAttribute('src')?.includes('js/api-store.js')
      );
      expect(hasApiStoreJS).toBeTruthy();
    });

    test('Debe existir un elemento con id "ofertas"', () => {
      const ofertas = document.querySelector('#ofertas');
      expect(ofertas).toBeTruthy();
    });

    test('Debe existir un elemento con id "carrusel" o "carousel"', () => {
      const carrusel = document.querySelector('#carrusel') || document.querySelector('#carousel');
      expect(carrusel).toBeTruthy();
    });

    test('Debe existir un elemento con id "catalogo"', () => {
      const catalogo = document.querySelector('#catalogo');
      expect(catalogo).toBeTruthy();
    });

    test('Debe tener un modal de Bootstrap para detalles', () => {
      const modal = document.querySelector('.modal');
      expect(modal).toBeTruthy();
    });

    test('El modal debe tener la estructura correcta de Bootstrap', () => {
      const modal = document.querySelector('.modal');
      const modalDialog = modal?.querySelector('.modal-dialog');
      const modalContent = modal?.querySelector('.modal-content');
      expect(modalDialog).toBeTruthy();
      expect(modalContent).toBeTruthy();
    });

    test('Debe tener un navbar o header', () => {
      const navbar = document.querySelector('.navbar, nav, header');
      expect(navbar).toBeTruthy();
    });
  });

  describe('Funciones JavaScript - Definiciones', () => {
    test('Debe definir la función obtenerProductos', () => {
      const hasFunction = /function\s+obtenerProductos|const\s+obtenerProductos\s*=|let\s+obtenerProductos\s*=/i.test(jsContent);
      expect(hasFunction).toBeTruthy();
    });

    test('Debe definir la función mostrarCatalogo', () => {
      const hasFunction = /function\s+mostrarCatalogo|const\s+mostrarCatalogo\s*=|let\s+mostrarCatalogo\s*=/i.test(jsContent);
      expect(hasFunction).toBeTruthy();
    });

    test('Debe definir la función mostrarOfertas', () => {
      const hasFunction = /function\s+mostrarOfertas|const\s+mostrarOfertas\s*=|let\s+mostrarOfertas\s*=/i.test(jsContent);
      expect(hasFunction).toBeTruthy();
    });

    test('Debe definir la función mostrarCarrusel', () => {
      const hasFunction = /function\s+mostrarCarrusel|const\s+mostrarCarrusel\s*=|let\s+mostrarCarrusel\s*=/i.test(jsContent);
      expect(hasFunction).toBeTruthy();
    });

    test('Debe definir la función mostrarDetalles', () => {
      const hasFunction = /function\s+mostrarDetalles|const\s+mostrarDetalles\s*=|let\s+mostrarDetalles\s*=/i.test(jsContent);
      expect(hasFunction).toBeTruthy();
    });
  });

  describe('Uso de Fetch API', () => {
    test('Debe usar fetch para obtener productos', () => {
      expect(jsContent).toMatch(/fetch\s*\(/);
    });

    test('La URL de fetch debe apuntar a fakestoreapi.com/products', () => {
      const hasFakeStoreAPI = /fetch\s*\(\s*['"`]https?:\/\/fakestoreapi\.com\/products|fetch\s*\(\s*API_URL|fetch\s*\(\s*`\$\{API_URL\}/i.test(jsContent);
      expect(hasFakeStoreAPI).toBeTruthy();
    });

    test('Debe convertir la respuesta a JSON', () => {
      const hasJsonConversion = /\.json\s*\(/.test(jsContent);
      expect(hasJsonConversion).toBeTruthy();
    });

    test('Debe manejar promesas con then/catch o async/await', () => {
      const hasPromiseHandling = /\.then\s*\(|\.catch\s*\(|async|await/.test(jsContent);
      expect(hasPromiseHandling).toBeTruthy();
    });
  });

  describe('Función obtenerProductos', () => {
    test('Debe contener un fetch a la API', () => {
      const obtenerProductosMatch = jsContent.match(
        /(?:function\s+obtenerProductos|const\s+obtenerProductos\s*=\s*(?:async\s+)?(?:function|\([^)]*\)\s*=>))\s*[^}]*\{[\s\S]*?fetch[\s\S]*?\}/i
      );
      expect(obtenerProductosMatch).toBeTruthy();
    });

    test('Debe retornar una promesa o usar async', () => {
      const hasAsyncOrReturn = /(?:async\s+function\s+obtenerProductos|const\s+obtenerProductos\s*=\s*async)|return\s+fetch/i.test(jsContent);
      expect(hasAsyncOrReturn).toBeTruthy();
    });
  });

  describe('Función mostrarCatalogo', () => {
    test('Debe aceptar un parámetro (productos)', () => {
      const funcionMatch = /(?:function\s+mostrarCatalogo|const\s+mostrarCatalogo\s*=)\s*\([^)]*\w+[^)]*\)/;
      expect(jsContent).toMatch(funcionMatch);
    });

    test('Debe manipular el DOM para mostrar productos', () => {
      const mostrarCatalogoContent = jsContent.match(
        /(?:function\s+mostrarCatalogo|const\s+mostrarCatalogo\s*=\s*(?:async\s+)?(?:function|\([^)]*\)\s*=>))[\s\S]*?\{[\s\S]*?\}/i
      );
      if (mostrarCatalogoContent) {
        const hasDOM = /getElementById|querySelector|innerHTML|createElement|appendChild/i.test(mostrarCatalogoContent[0]);
        expect(hasDOM).toBeTruthy();
      }
    });

    test('Debe referenciar el elemento "catalogo"', () => {
      const hasCatalogoRef = /getElementById\s*\(\s*['"`]catalogo['"`]\s*\)|querySelector\s*\(\s*['"`]#catalogo['"`]\s*\)/i.test(jsContent);
      expect(hasCatalogoRef).toBeTruthy();
    });
  });

  describe('Función mostrarOfertas', () => {
    test('Debe aceptar un parámetro (productos)', () => {
      const funcionMatch = /(?:function\s+mostrarOfertas|const\s+mostrarOfertas\s*=)\s*\([^)]*\w+[^)]*\)/;
      expect(jsContent).toMatch(funcionMatch);
    });

    test('Debe referenciar el elemento "ofertas"', () => {
      const hasOfertasRef = /getElementById\s*\(\s*['"`]ofertas['"`]\s*\)|querySelector\s*\(\s*['"`]#ofertas['"`]\s*\)/i.test(jsContent);
      expect(hasOfertasRef).toBeTruthy();
    });

    test('Debe seleccionar productos específicos (índices 0, 3, 6)', () => {
      const mostrarOfertasContent = jsContent.match(
        /(?:function\s+mostrarOfertas|const\s+mostrarOfertas\s*=\s*(?:async\s+)?(?:function|\([^)]*\)\s*=>))[\s\S]*?\{[\s\S]*?\}/i
      );
      if (mostrarOfertasContent) {
        const hasIndexAccess = /\[\s*0\s*\].*\[\s*3\s*\].*\[\s*6\s*\]|\[\s*0\s*\]|\[\s*3\s*\]|\[\s*6\s*\]|filter|slice/i.test(mostrarOfertasContent[0]);
        expect(hasIndexAccess).toBeTruthy();
      }
    });
  });

  describe('Función mostrarCarrusel', () => {
    test('Debe aceptar un parámetro (productos)', () => {
      const funcionMatch = /(?:function\s+mostrarCarrusel|const\s+mostrarCarrusel\s*=)\s*\([^)]*\w+[^)]*\)/;
      expect(jsContent).toMatch(funcionMatch);
    });

    test('Debe referenciar el elemento "carrusel" o "carousel"', () => {
      const hasCarruselRef = /getElementById\s*\(\s*['"`]carr[uo]sel['"`]\s*\)|querySelector\s*\(\s*['"`]#carr[uo]sel['"`]\s*\)/i.test(jsContent);
      expect(hasCarruselRef).toBeTruthy();
    });

    test('Debe implementar selección aleatoria de productos', () => {
      const mostrarCarruselContent = jsContent.match(
        /(?:function\s+mostrarCarrusel|const\s+mostrarCarrusel\s*=\s*(?:async\s+)?(?:function|\([^)]*\)\s*=>))[\s\S]*?\{[\s\S]*?\}/i
      );
      if (mostrarCarruselContent) {
        const hasRandom = /Math\.random|Math\.floor.*random|sort.*random|shuffle/i.test(mostrarCarruselContent[0]);
        expect(hasRandom).toBeTruthy();
      }
    });
  });

  describe('Función mostrarDetalles', () => {
    test('Debe aceptar un parámetro (id del producto)', () => {
      const funcionMatch = /(?:function\s+mostrarDetalles|const\s+mostrarDetalles\s*=)\s*\([^)]*\w+[^)]*\)/;
      expect(jsContent).toMatch(funcionMatch);
    });

    test('Debe realizar fetch a un producto específico', () => {
      const mostrarDetallesContent = jsContent.match(
        /(?:function\s+mostrarDetalles|const\s+mostrarDetalles\s*=\s*(?:async\s+)?(?:function|\([^)]*\)\s*=>))[\s\S]*?\{[\s\S]*?\}/i
      );
      if (mostrarDetallesContent) {
        const hasFetchWithId = /fetch.*fakestoreapi\.com\/products\/|fetch.*\$\{.*\}|fetch.*\+/i.test(mostrarDetallesContent[0]);
        expect(hasFetchWithId).toBeTruthy();
      }
    });

    test('Debe manipular el modal de Bootstrap', () => {
      const hasModalManipulation = /modal|Modal|data-bs-toggle|data-bs-target|show\(\)|hide\(\)/i.test(jsContent);
      expect(hasModalManipulation).toBeTruthy();
    });
  });

  describe('Inicialización y Event Listeners', () => {
    test('Debe ejecutar código cuando el DOM esté cargado', () => {
      const hasDOMReady = /DOMContentLoaded|window\.onload|document\.ready/i.test(jsContent);
      expect(hasDOMReady).toBeTruthy();
    });

    test('Debe llamar a obtenerProductos en la inicialización', () => {
      const callsObtenerProductos = /obtenerProductos\s*\(/i.test(jsContent);
      expect(callsObtenerProductos).toBeTruthy();
    });

    test('Debe tener event listeners para mostrar detalles', () => {
      const hasEventListeners = /addEventListener|onclick|\.on\(/i.test(jsContent);
      expect(hasEventListeners).toBeTruthy();
    });
  });

  describe('Uso de Bootstrap', () => {
    test('El HTML debe usar clases de Bootstrap para cards', () => {
      // Buscar en HTML estático o en el código JavaScript (se genera dinámicamente)
      const hasCardClassesInHTML = /class\s*=\s*['"][^'"]*\bcard\b[^'"]*['"]/i.test(htmlContent);
      const hasCardClassesInJS = /class\s*=\s*['"][^'"]*\bcard\b[^'"]*['"]|className\s*=\s*['"][^'"]*\bcard\b[^'"]*['"]/i.test(jsContent);
      expect(hasCardClassesInHTML || hasCardClassesInJS).toBeTruthy();
    });

    test('El HTML debe usar el componente carousel de Bootstrap', () => {
      const hasCarousel = /class\s*=\s*['"][^'"]*\bcarousel\b[^'"]*['"]|carousel-inner|carousel-item/i.test(htmlContent);
      expect(hasCarousel).toBeTruthy();
    });

    test('El HTML debe usar el componente modal de Bootstrap', () => {
      const hasModal = /class\s*=\s*['"][^'"]*\bmodal\b[^'"]*['"]|modal-dialog|modal-content/i.test(htmlContent);
      expect(hasModal).toBeTruthy();
    });

    test('Debe usar el sistema de grid de Bootstrap (row/col)', () => {
      const hasGrid = /class\s*=\s*['"][^'"]*\b(?:row|col-|container)\b[^'"]*['"]/i.test(htmlContent);
      expect(hasGrid).toBeTruthy();
    });
  });

  describe('Buenas Prácticas', () => {
    test('Debe incluir manejo de errores (try-catch o .catch)', () => {
      const hasErrorHandling = /try\s*\{|catch\s*\(|\.catch\s*\(/i.test(jsContent);
      expect(hasErrorHandling).toBeTruthy();
    });

    test('Debe usar const o let en lugar de var', () => {
      const usesModernDeclarations = /\b(?:const|let)\b/.test(jsContent);
      expect(usesModernDeclarations).toBeTruthy();
    });

    test('No debe usar var para declaraciones de variables', () => {
      const usesVar = /\bvar\s+\w+\s*=/.test(jsContent);
      expect(usesVar).toBeFalsy();
    });
  });

  describe('Contenido Dinámico', () => {
    test('Debe generar contenido HTML dinámicamente', () => {
      const hasDynamicHTML = /innerHTML|insertAdjacentHTML|createElement|textContent/.test(jsContent);
      expect(hasDynamicHTML).toBeTruthy();
    });

    test('Debe iterar sobre arrays de productos', () => {
      const hasIteration = /forEach|map|for\s*\(|for\s+of/.test(jsContent);
      expect(hasIteration).toBeTruthy();
    });
  });
});
