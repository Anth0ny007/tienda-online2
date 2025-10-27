# 🖥️ Cómo Ver Tu Proyecto en el Navegador

## Opción 1: Usar Live Server (Recomendado)

### Si tienes la extensión Live Server instalada:

1. Abre el archivo `docs/index.html` en VS Code
2. Clic derecho en el archivo
3. Selecciona "Open with Live Server"
4. Tu navegador se abrirá automáticamente mostrando la tienda

### Si no tienes Live Server:

Instálala desde el marketplace de VS Code:
- Busca "Live Server" de Ritwick Dey
- Clic en "Install"

## Opción 2: Abrir Directamente en el Navegador

### Desde VS Code:

1. Navega a `docs/`
2. Clic derecho en `index.html`
3. Selecciona "Reveal in File Explorer" (Windows) o "Reveal in Finder" (Mac)
4. Doble clic en `index.html`
5. Se abrirá en tu navegador predeterminado

### Desde la Terminal:

```bash
# En Linux/Mac
open docs/index.html

# En Windows (Git Bash)
start docs/index.html

# Usando el comando del devcontainer
"$BROWSER" docs/index.html
```

## Opción 3: Usar Python Simple Server

Si tienes Python instalado:

```bash
# Ir a la carpeta del proyecto
cd docs

# Python 3
python -m http.server 8000

# Luego abrir en el navegador:
# http://localhost:8000
```

## Opción 4: Usar Node.js http-server

```bash
# Instalar http-server globalmente (solo una vez)
npm install -g http-server

# Ir a la carpeta del proyecto
cd docs

# Iniciar el servidor
http-server -p 8080

# Abrir en el navegador:
# http://localhost:8080
```

## 🔍 Qué Deberías Ver

Cuando abras `index.html` en el navegador, deberías ver:

1. **Navbar** en la parte superior con el nombre de la tienda
2. **Carrusel** con 3 productos aleatorios (con controles prev/next)
3. **Sección de Ofertas** con 3 productos especiales (1º, 4º y 7º)
4. **Catálogo Completo** con todos los productos en tarjetas (cards)
5. Al hacer clic en "Ver Detalles" se abre un **Modal** con información completa

## 🐛 Solución de Problemas

### Problema: No se muestran los productos

**Causa:** La API podría estar bloqueada o hay errores en el código.

**Solución:**
1. Abre la consola del navegador (F12)
2. Mira la pestaña "Console" para ver errores
3. Verifica que la API responda: https://fakestoreapi.com/products
4. Revisa que tu función `obtenerProductos()` esté correcta

### Problema: Errores de CORS

**Causa:** Algunas restricciones del navegador con archivos locales.

**Solución:**
- Usa Live Server u otro servidor local
- NO abras el archivo directamente con file://

### Problema: CSS o JS no se cargan

**Causa:** Rutas incorrectas.

**Solución:**
1. Verifica que tengas la estructura correcta:
   ```
   docs/
   ├── index.html
   ├── js/api-store.js
   └── css/api-store.css
   ```

2. Verifica las rutas en `index.html`:
   ```html
   <link rel="stylesheet" href="css/api-store.css">
   <script src="js/api-store.js"></script>
   ```

### Problema: Bootstrap no se carga

**Causa:** No hay conexión a internet o CDN caído.

**Solución:**
- Verifica tu conexión a internet
- Los CDN de Bootstrap deben estar en el `<head>`:
  ```html
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  ```

## 🔍 Inspeccionar con DevTools

### Para debuggear tu código:

1. **Abre DevTools**: Presiona F12 o Ctrl+Shift+I
2. **Pestaña Console**: Ver console.log() y errores
3. **Pestaña Network**: Ver peticiones a la API
4. **Pestaña Elements**: Inspeccionar el HTML generado
5. **Pestaña Sources**: Poner breakpoints en tu JS

### Comandos útiles en la consola:

```javascript
// Ver si los productos se obtienen
obtenerProductos().then(console.log)

// Ver elementos del DOM
document.getElementById('catalogo')
document.getElementById('ofertas')
document.getElementById('carrusel')

// Probar una función
mostrarDetalles(1)
```

## ✅ Verificación Rápida

Tu tienda está funcionando correctamente si:

- ✅ Ves el navbar con el nombre de la tienda
- ✅ El carrusel muestra 3 productos y puedes navegar entre ellos
- ✅ La sección de ofertas muestra 3 productos con badge "OFERTA"
- ✅ El catálogo muestra todos los productos (aproximadamente 20)
- ✅ Al hacer clic en "Ver Detalles" se abre un modal
- ✅ El modal muestra imagen, descripción, precio, categoría y rating
- ✅ Todo se ve responsive (adapta a diferentes tamaños de pantalla)

## 📱 Probar en Diferentes Dispositivos

### Vista Responsive en DevTools:

1. Abre DevTools (F12)
2. Clic en el icono de dispositivo móvil (Ctrl+Shift+M)
3. Selecciona diferentes dispositivos del dropdown
4. Verifica que todo se vea bien en:
   - Mobile (320px - 480px)
   - Tablet (768px - 1024px)
   - Desktop (1200px+)

---

**💡 Consejo:** Mantén la consola del navegador abierta mientras desarrollas para ver errores en tiempo real.

**🚀 Próximo paso:** Una vez que tu tienda se vea bien, ejecuta `npm test` para verificar que pase todos los tests automáticos.
