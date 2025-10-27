# Ejercicio 8: Publicación en Netlify

## Objetivo
Aprender a desplegar y publicar tu proyecto web en Netlify para que esté disponible públicamente en internet.

## Descripción del Proyecto
Vamos a tomar tu proyecto del **Ejercicio 7 (Tienda Online con API)** y publicarlo en Netlify para que cualquier persona pueda acceder a él desde un navegador.

---

## 📚 ¿Qué es Netlify?

**Netlify** es una plataforma moderna de hosting gratuita que te permite desplegar sitios web estáticos de forma rápida y sencilla. Es perfecta para:

- 🌐 Portfolios personales
- 📱 Proyectos web
- 📄 Aplicaciones web estáticas
- 🎨 Demostraciones de código

**Características:**
- ✅ Gratuito para proyectos personales
- ✅ HTTPS automático con certificado SSL
- ✅ Fácil de configurar (drag & drop)
- ✅ Despliegue instantáneo
- ✅ URLs personalizables
- ✅ CDN global para velocidad óptima

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de:

1. ✅ Haber completado el **Ejercicio 7**
2. ✅ Tener todos los archivos en la carpeta `docs/`
3. ✅ Que tu proyecto funcione correctamente localmente
4. ✅ Tener una cuenta en Netlify (es gratis y no requiere tarjeta de crédito)

---

## 🚀 Paso a Paso: Publicación en Netlify

### Paso 1: Crear una Cuenta en Netlify

1. Ve a [https://www.netlify.com/](https://www.netlify.com/)
2. Haz clic en **"Sign up"** (Registrarse)
3. Puedes registrarte con:
   - GitHub (recomendado)
   - GitLab
   - Bitbucket
   - Email

**Recomendación:** Usa tu cuenta de GitHub para facilitar futuros despliegues automáticos.

### Paso 2: Preparar la Carpeta para Publicar

Tu carpeta `docs/` debe tener la siguiente estructura:

```
docs/
├── index.html          ✅ Archivo principal
├── js/
│   └── api-store.js   ✅ Tu código JavaScript
└── css/
    └── api-store.css  ✅ Tus estilos
```

**⚠️ Importante:** 
- El archivo principal DEBE llamarse `index.html`
- Todos los archivos necesarios deben estar dentro de `docs/`
- Las rutas en tu HTML deben ser relativas

### Paso 3: Descargar la Carpeta `docs/`

Necesitas tener la carpeta `docs/` en tu computadora local:

**Opción A: Si clonaste el repositorio con Git**
```bash
# Ya tienes la carpeta docs/ en tu directorio local
cd /ruta/a/tu/proyecto
ls docs/  # Verifica que contenga los archivos
```

**Opción B: Si usas GitHub Codespaces o un entorno remoto**

1. **Desde VS Code:**
   - Clic derecho en la carpeta `docs/` en el explorador de archivos
   - Selecciona **"Download..."** (Descargar)
   - Guarda el archivo ZIP en tu computadora
   - Descomprime el archivo ZIP

2. **Desde la terminal:**
   ```bash
   # Crear un ZIP de la carpeta docs
   zip -r docs.zip docs/
   # Luego descarga el archivo docs.zip a tu computadora
   ```

3. **Desde GitHub.com:**
   - Ve a tu repositorio en GitHub
   - Navega a la carpeta `docs/`
   - Descarga cada archivo manualmente (no es la opción más eficiente)

### Paso 4: Publicar en Netlify (Manual Drag & Drop)

1. **Inicia sesión en Netlify:**
   - Ve a [https://app.netlify.com/](https://app.netlify.com/)
   - Inicia sesión con tu cuenta

2. **Método de Despliegue Manual:**
   - En el dashboard de Netlify, busca la sección **"Want to deploy a new site without connecting to Git?"**
   - Verás un área que dice **"Drag and drop your site output folder here"**
   
3. **Arrastra y suelta:**
   - Abre la carpeta `docs/` en tu explorador de archivos
   - Arrastra toda la carpeta `docs/` al área de Netlify
   - **Importante:** Arrastra la carpeta completa, no solo los archivos dentro de ella

4. **Espera el despliegue:**
   - Netlify subirá y procesará tu sitio (toma 10-30 segundos)
   - Verás una barra de progreso
   - Una vez completado, verás tu sitio publicado

### Paso 5: Obtener la URL de tu Sitio

1. Después del despliegue, Netlify te asignará una URL aleatoria como:
   ```
   https://random-name-123456.netlify.app/
   ```

2. **Personalizar la URL (Opcional pero recomendado):**
   - En el dashboard de tu sitio, ve a **"Site settings"**
   - Clic en **"Change site name"**
   - Elige un nombre único (ejemplo: `juan-perez-tienda-api`)
   - Tu nueva URL será: `https://juan-perez-tienda-api.netlify.app/`

### Paso 6: Verificar que tu Sitio Funcione

1. Abre la URL de tu sitio en un navegador
2. Verifica que:
   - ✅ La página carga correctamente
   - ✅ Se ven los productos de la API
   - ✅ El carrusel funciona
   - ✅ Las ofertas se muestran
   - ✅ El modal de detalles funciona
   - ✅ Bootstrap se carga correctamente
   - ✅ No hay errores en la consola (F12 → Console)

### Paso 7: Registrar tus Datos en `my-page.js`

Una vez que tu sitio esté funcionando, debes completar el archivo `my-page.js` en la raíz del repositorio:

```javascript
data = {
    name: "Tu Nombre Completo",
    matricula: "TuMatriculaSinGuiones",
    url: "https://tu-sitio.netlify.app/"
}
```

**Ejemplo:**
```javascript
data = {
    name: "Juan Pérez García",
    matricula: "2023001234",
    url: "https://juan-perez-tienda-api.netlify.app/"
}
```

**⚠️ Importante:**
- El nombre debe ser tu nombre completo
- La matrícula debe ser sin guiones ni espacios
- La URL debe ser la URL completa de tu sitio en Netlify
- La URL debe terminar con `/`
- Usa comillas dobles `"` para los valores

### Paso 8: Guardar los Cambios

```bash
# Agregar el archivo modificado
git add my-page.js

# Hacer commit
git commit -m "Registrar datos personales y URL de Netlify"

# Subir cambios a GitHub
git push origin main
```

---

## 📊 Criterios de Evaluación (1.0 punto)

El sistema de autograding verificará:

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| **Archivo my-page.js completo** | 0.15 pts | Contiene name, matricula y url válidos |
| **Nombre válido** | 0.10 pts | Campo name tiene un nombre completo |
| **Matrícula válida** | 0.10 pts | Campo matricula es numérico y válido |
| **URL válida** | 0.15 pts | URL tiene formato correcto de Netlify |
| **Sitio accesible** | 0.20 pts | URL retorna código 200 |
| **Contenido HTML** | 0.15 pts | Tiene título, Bootstrap, IDs correctos |
| **JavaScript cargado** | 0.10 pts | Archivo JS está presente y funcional |
| **Estructura correcta** | 0.05 pts | Modal, navbar, elementos presentes |

**Total Ejercicio 8:** 1.0 punto  
**Total Ejercicios 7 + 8:** 2.0 puntos

**Nota:** La calificación es parcial, obtendrás puntos por cada criterio que cumplas.

---

## 🔧 Solución de Problemas Comunes

### Problema 1: "404 - File not found"

**Causa:** El archivo no se llama `index.html` o la estructura de carpetas es incorrecta.

**Solución:**
1. Verifica que el archivo sea `index.html` (no `api-store.html`)
2. Asegúrate de que esté en `docs/index.html`
3. Vuelve a desplegar arrastrando la carpeta `docs/` nuevamente a Netlify

### Problema 2: CSS o JS no se cargan

**Causa:** Rutas incorrectas en tu HTML.

**Solución:**
1. Verifica las rutas en tu HTML sean relativas:
   ```html
   <link rel="stylesheet" href="css/api-store.css">
   <script src="js/api-store.js"></script>
   ```
2. NO uses rutas absolutas como `/css/...` o `C:/...`
3. Vuelve a desplegar en Netlify

### Problema 3: "Los cambios no se reflejan"

**Causa:** Netlify muestra la versión anterior.

**Solución:**
1. Ve a tu sitio en el dashboard de Netlify
2. Clic en **"Deploys"** (Despliegues)
3. Clic en **"Trigger deploy"** > **"Clear cache and deploy site"**
4. O simplemente arrastra de nuevo la carpeta `docs/` actualizada

### Problema 4: "La API no funciona"

**Causa:** Restricciones de CORS o uso de HTTP en lugar de HTTPS.

**Solución:**
1. Verifica que uses `https://fakestoreapi.com/products` (con HTTPS)
2. Abre la consola del navegador (F12) para ver errores
3. Netlify usa HTTPS automáticamente, lo que es correcto

### Problema 5: "No puedo encontrar mi carpeta docs/"

**Causa:** Trabajas en un entorno remoto (Codespaces, servidor).

**Solución:**
1. En VS Code, clic derecho en la carpeta `docs/` > **"Download..."**
2. O crea un ZIP desde la terminal: `zip -r docs.zip docs/`
3. Descarga el archivo a tu computadora local

### Problema 6: "El nombre del sitio ya está tomado"

**Causa:** Alguien más ya usó ese nombre en Netlify.

**Solución:**
1. Elige un nombre diferente y más único
2. Agrega tu matrícula o año: `juan-perez-2024-tienda`
3. O usa el nombre aleatorio que Netlify te asigna automáticamente

---

## 📊 Criterios de Evaluación (1.0 punto)

El sistema de autograding verificará:

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| **Archivo URL existe** | 0.15 pts | Existe `github-pages-url.txt` |
| **URL válida** | 0.15 pts | URL tiene formato correcto |
| **Sitio accesible** | 0.20 pts | URL retorna código 200 |
| **Archivo .nojekyll** | 0.10 pts | Existe `.nojekyll` en raíz |
| **Contenido HTML** | 0.15 pts | Tiene título, Bootstrap, IDs |
| **JavaScript cargado** | 0.10 pts | Archivo JS está presente |
| **Estructura correcta** | 0.15 pts | Modal, navbar, elementos |

**Total Ejercicio 8:** 1.0 punto  
**Total Ejercicios 7 + 8:** 2.0 puntos

---

## ✅ Checklist de Verificación

Antes de hacer push final, verifica:

- [ ] Archivo `index.html` en `docs/`
- [ ] Archivos JS en `docs/js/`
- [ ] Archivos CSS en `docs/css/`
- [ ] Archivo `.nojekyll` en raíz del repositorio
- [ ] Archivo `github-pages-url.txt` en raíz con URL correcta
- [ ] GitHub Pages habilitado en Settings > Pages
- [ ] Source configurado: rama `main`, carpeta `/docs`
- [ ] Hecho push de todos los cambios
- [ ] Esperado 2-3 minutos después del push
- [ ] URL abre correctamente en el navegador
- [ ] Sitio funciona: productos, carrusel, modal

---

## ✅ Checklist de Verificación

Antes de considerar el ejercicio completo, verifica:

- [ ] Carpeta `docs/` tiene `index.html` en la raíz
- [ ] Archivos JS están en `docs/js/`
- [ ] Archivos CSS están en `docs/css/`
- [ ] Has descargado la carpeta `docs/` a tu computadora local
- [ ] Has creado una cuenta en Netlify
- [ ] Has desplegado la carpeta `docs/` en Netlify (drag & drop)
- [ ] Has personalizado el nombre del sitio (opcional)
- [ ] La URL de Netlify abre correctamente en el navegador
- [ ] El sitio funciona: productos, carrusel, modal
- [ ] Has completado el archivo `my-page.js` con tus datos
- [ ] El campo `name` tiene tu nombre completo
- [ ] El campo `matricula` tiene tu matrícula sin guiones
- [ ] El campo `url` tiene la URL completa de tu sitio en Netlify
- [ ] Has hecho commit y push del archivo `my-page.js`

---

## 🎯 Comandos Resumen

```bash
# 1. Si estás en un entorno remoto, descarga la carpeta docs/
# En VS Code: Clic derecho en docs/ > Download
# O desde terminal:
zip -r docs.zip docs/

# 2. Una vez descargada, descomprime si es necesario
# y arrastra la carpeta docs/ a Netlify

# 3. Después de desplegar, edita my-page.js con tus datos
# Abre el archivo y completa:
# - name: "Tu Nombre Completo"
# - matricula: "TuMatriculaSinGuiones"
# - url: "https://tu-sitio.netlify.app/"

# 4. Guardar cambios en Git
git add my-page.js
git commit -m "Registrar datos personales y URL de Netlify"
git push origin main
```

---

## 🔗 Recursos Útiles

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Drop](https://app.netlify.com/drop) - Despliegue rápido drag & drop
- [Netlify Community](https://answers.netlify.com/) - Soporte y comunidad
- [Custom Domains in Netlify](https://docs.netlify.com/domains-https/custom-domains/)

---

## 💡 Tips Profesionales

1. **Actualiza tu sitio:** Para actualizar tu sitio, simplemente arrastra la carpeta `docs/` actualizada a Netlify nuevamente (en la pestaña "Deploys" de tu sitio).

2. **Revisa los despliegues:** En el dashboard de Netlify, ve a **"Deploys"** para ver el historial y estado de tus despliegues.

3. **Comparte tu trabajo:** Una vez publicado, puedes compartir la URL en tu CV, LinkedIn o portfolio.

4. **Dominio personalizado:** Si tienes un dominio propio, puedes conectarlo en la configuración de tu sitio en Netlify.

5. **README con enlace:** Agrega un enlace a tu sitio en el README del repositorio:
   ```markdown
   🌐 [Ver sitio en vivo](https://tu-sitio.netlify.app/)
   ```

6. **Despliegue continuo:** Aunque este ejercicio es manual, Netlify también permite conectar tu repositorio de GitHub para despliegue automático con cada push.

---

## 🎓 ¿Qué Aprendiste?

Al completar este ejercicio, ahora sabes:

- ✅ Qué es Netlify y para qué sirve
- ✅ Cómo descargar archivos de un entorno de desarrollo
- ✅ Cómo desplegar un sitio web estático manualmente
- ✅ Cómo personalizar la URL de tu sitio
- ✅ Solucionar problemas comunes de despliegue
- ✅ Actualizar un sitio publicado
- ✅ Compartir tu trabajo con el mundo
- ✅ Registrar información de manera estructurada en archivos de configuración

---

## 🚀 ¡Felicidades!

Una vez que tu sitio esté en línea y hayas registrado tus datos, habrás logrado:

1. ✅ Crear una aplicación web funcional con API
2. ✅ Publicarla en internet para que todos la vean
3. ✅ Tener un proyecto real en tu portfolio
4. ✅ Aprender a usar una plataforma profesional de hosting

**¡Comparte tu logro!** 🎉

---

## ⚠️ Notas Importantes

- Netlify es **gratuito** para proyectos personales con límites generosos
- Los cambios se reflejan **inmediatamente** al redesplegar
- Netlify solo soporta sitios **estáticos** (HTML, CSS, JS) en el plan gratuito
- Puedes tener **hasta 100 sitios** en el plan gratuito
- El HTTPS está **incluido automáticamente** con certificado SSL
- No es necesario un dominio personalizado (la URL de Netlify funciona perfectamente)

---

¡Éxito con tu publicación! 🌟
