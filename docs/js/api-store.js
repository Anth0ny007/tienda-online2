const API_URL = 'https://fakestoreapi.com/products';

//obtenerProductos
async function obtenerProductos() {
  try{
    const res = await fetch(API_URL);
    if (!res.ok){
        console.log('Error en la conexión: ' + res.status);
    }

    const productos = await res.json();
    return productos;
  } catch(error){
    console.error('obtenerProductos ', error);
    
    return []; 
  }
}

//mostrarCatalogo
function mostrarCatalogo(productos) {
  const catalogo = document.getElementById('catalogo');
  catalogo.innerHTML = '';
  productos.forEach(producto => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
    
    //Las tarjetas de productos
    const card = document.createElement('div');
    card.className = 'card h-100';

    //imagen
    const img = document.createElement('img');
    img.src = producto.image;
    img.alt = producto.title;
    img.className = 'card-img-top img-catalogo';

    //body
    const body = document.createElement('div');
    body.className = 'card-body d-flex flex-column cd-catg';
    
    const title = document.createElement('h6');
    title.className = 'card-title';
    title.textContent = producto.title;
    
    const price = document.createElement('p');
    price.className = 'card-text fw-bold mt-auto';
    price.textContent = `$${producto.price}`;

    const footer = document.createElement('div');
    footer.className = 'card-footer bg-transparent border-0';
    
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary btn-sm w-100';
    btn.textContent = 'Ver Detalles';
    
    btn.addEventListener('click', () => {

      mostrarDetalles(producto.id);

    });

    //armar card
    body.appendChild(title);
    body.appendChild(price);
    
    footer.appendChild(btn);
    
    card.appendChild(img);
    card.appendChild(body);
    card.appendChild(footer);
    
    col.appendChild(card);
    catalogo.appendChild(col);
  });
}

//mostrarOfertas
function mostrarOfertas(productos) {
  const ofertasContainer = document.getElementById('ofertas');
  ofertasContainer.innerHTML = '';
  const indices = [productos[0], productos[3], productos[6]];

  indices.forEach(prodOfert => {
    if (prodOfert) {
      const producto = prodOfert;
      const col = document.createElement('div');
      col.className = 'col-12 col-md-4 cont-ofert';
      
      const card = document.createElement('div');
      card.className = 'card h-100 position-relative cd-ofert';
      
      const badge = document.createElement('span');
      badge.className = 'badge bg-danger badge-oferta';
      badge.textContent = 'Oferta';
      
      const img = document.createElement('img');
      img.src = producto.image;
      img.alt = producto.title;
      img.className = 'card-img-top img-ofert';
      
      const body = document.createElement('div');
      body.className = 'card-body';
      
      const title = document.createElement('h5');
      title.className = 'card-title';
      title.textContent = producto.title;
      
      const price = document.createElement('p');
      price.className = 'card-text fw-bold';
      price.textContent = `$${producto.price}`;

      const footer = document.createElement('div');
      footer.className = 'footer-ofert';
      
      const btn = document.createElement('button');
      btn.className = 'btn w-100';
      btn.textContent = 'Ver Oferta';
      
      btn.addEventListener('click', () => {

        mostrarDetalles(producto.id);

      });
      
      body.appendChild(title);
      body.appendChild(price);

      footer.appendChild(btn);
      
      card.appendChild(badge);
      card.appendChild(img);
      card.appendChild(body);
      card.appendChild(footer);
      col.appendChild(card);
      
      ofertasContainer.appendChild(col);
    }
  });
}

//mostrarCarrusel
function mostrarCarrusel(productos) {
  const carruselCont = document.getElementById('carrusel');
  carruselCont.innerHTML = '';
  if (!productos || productos.length === 0){
    return;
  }

  //seleccionar 3 indices aleatorios unicos
  const indices = [];
  while (indices.length < 3 && indices.length < productos.length) {
    const randomIndex = Math.floor(Math.random() * productos.length);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }


  //montar carousel
  const carouselId = 'carouselProductos';

  const carousel = document.createElement('div');
  carousel.id = carouselId;
  carousel.className = 'carousel slide';
  carousel.setAttribute('data-bs-ride', 'carousel');
  
  const inner = document.createElement('div');
  inner.className = 'carousel-inner';

  indices.forEach((idx, i) => {
    const p = productos[idx];
    const item = document.createElement('div');
    item.className = 'carousel-item' + (i === 0 ? ' active' : '');
    
    const row = document.createElement('div');
    row.className = 'd-flex py-4 ';
    
    const card = document.createElement('div');
    card.className = 'card cd-carrc';

    const content = document.createElement('div');
    content.className = 'row g-0 detCarr';
    
    const colImg = document.createElement('div');
    colImg.className = 'col-md-4 text-center p-3';
    
    const img = document.createElement('img');
    img.src = p.image;
    img.alt = p.title;
    img.className = 'img-fluid';
    
    colImg.appendChild(img);

    const colBody = document.createElement('div');
    colBody.className = 'col-md-5';
    
    const body = document.createElement('div');
    body.className = 'card-body';
    
    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = p.title;

    const priceCarr = document.createElement('p');
    priceCarr.textContent = "$" + p.price;
    priceCarr.className = "precioCarr";
    
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = 'Ver Más Detalles';
    
    btn.addEventListener('click', () => {

      mostrarDetalles(p.id);

    });

    body.appendChild(title);
    body.appendChild(priceCarr);
    body.appendChild(btn);

    colBody.appendChild(body);
    content.appendChild(colImg);
    content.appendChild(colBody);

    card.appendChild(content);
    row.appendChild(card);
    item.appendChild(row);
    inner.appendChild(item);
  });

  // controles
  const prev = document.createElement('button');
  prev.className = 'carousel-control-prev';
  prev.type = 'button';
  prev.setAttribute('data-bs-target', `#${carouselId}`);
  prev.setAttribute('data-bs-slide', 'prev');
  prev.innerHTML = `
    <span class="carousel-control-prev-icon btnslide" aria-hidden="true"></span>

    <span class="visually-hidden">Anterior</span>
  `;
  
  const next = document.createElement('button');
  next.className = 'carousel-control-next';
  next.type = 'button';
  next.setAttribute('data-bs-target', `#${carouselId}`);
  next.setAttribute('data-bs-slide', 'next');
  next.innerHTML = `
    <span class="carousel-control-next-icon btnslide" aria-hidden="true"></span>

    <span class="visually-hidden">Siguiente</span>
  `;
  
  carousel.appendChild(inner);
  carousel.appendChild(prev);
  carousel.appendChild(next);
  carruselCont.appendChild(carousel);
}

//mostrarDetalles
async function mostrarDetalles(idProducto) {
  try{
    const res = await fetch(API_URL + '/' + idProducto);
    if(!res.ok){
        throw new Error('Producto no encontrado');
    }

    const producto = await res.json();

    document.getElementById('detallesTitulo').textContent = producto.title;
    document.getElementById('detallesImagen').src = producto.image;
    document.getElementById('detallesImagen').alt = producto.title;
    document.getElementById('detallesDescripcion').textContent = producto.description;
    document.getElementById('detallesPrecio').textContent = `$${producto.price}`;
    document.getElementById('detallesCategoria').textContent = producto.category;

    const ratingText = producto.rating ? `${producto.rating.rate} / 5 (${producto.rating.count} reviews)` : 'No disponible';
    document.getElementById('detallesRating').textContent = ratingText;

    const modalEl = document.getElementById('detallesModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  } catch (error){
    console.error('mostrarDetalles ', error);
    alert('Error al obtener detalles del producto.');
  }
}

//inicialización
async function inicializar() {
  const productos = await obtenerProductos();
  mostrarCatalogo(productos);
  mostrarOfertas(productos);
  mostrarCarrusel(productos);
}

document.addEventListener('DOMContentLoaded', inicializar);