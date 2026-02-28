/* === PRODUCTOS PRINCIPALES === */
const productos = [
  { nombre: "Adaptadores", precio: 1.80, imagen: "images/adaptadores_1.jpg", categoria: "Electricidad" },
  { nombre: "Badilejo", precio: 6.90, imagen: "images/badilejo_1.jpg", categoria: "Construcción" },
  { nombre: "Bisagras Capuchinas", precio: 22.00, imagen: "images/bisagras_capuchinas.jpg", categoria: "Ferretería" },
  { nombre: "Bisagras Fijas", precio: 36.00, imagen: "images/bisagras_fijas.jpg", categoria: "Ferretería" },
  { nombre: "Brocha N° 1", precio: 1.00, imagen: "images/brochas_1.jpg", categoria: "Pintura" },
  { nombre: "Cable Indeco N° 14", precio: 80.00, imagen: "images/cable_indeco_1.jpg", categoria: "Electricidad" },
  { nombre: "Candados Porte", precio: 6.90, imagen: "images/candados_porte.jpg", categoria: "Ferretería" },
  { nombre: "Candados Tigón N°40", precio: 5.50, imagen: "images/candados_tigon.jpg", categoria: "Ferretería" },
  { nombre: "Caño Doble Lavadero", precio: 20.00, imagen: "images/cano_doble_lavadero.jpg", categoria: "Grifería" },
  { nombre: "Cera Con Guía", precio: 4.50, imagen: "images/cera_con_guia.jpg", categoria: "Ferretería" },
  { nombre: "Chapa Perilla", precio: 25.00, imagen: "images/chapa_perilla.jpg", categoria: "Ferretería" },
  { nombre: "Chapas New 2 Golpes", precio: 20.00, imagen: "images/chapas_new.jpg", categoria: "Ferretería" },
  { nombre: "Check Cimval de Bronce 1/2", precio: 30.00, imagen: "images/check_cimval_bronce_2.jpg", categoria: "Ferretería" },
  { nombre: "Codos de Bronce Pesado", precio: 5.50, imagen: "images/codos_bronce.jpg", categoria: "Ferretería" }
];

/* === ELEMENTOS DEL DOM === */
const cont = document.getElementById('productos');
const buscar = document.getElementById('buscarHeader');
const tags = document.querySelectorAll('.tag');

/* === MOSTRAR PRODUCTOS === */
function mostrarProductos(list) {
  cont.innerHTML = '';
  if (!list || list.length === 0) {
    cont.innerHTML = '<p style="text-align:center;padding:30px;color:#666">No se encontraron productos.</p>';
    return;
  }
  list.forEach(p => {
    const el = document.createElement('div');
    el.className = 'card fade';
    el.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
      <div class="brand">Por Distribuidora Uzziel</div>
      <h3>${p.nombre}</h3>
      <div class="price">S/ ${p.precio.toFixed(2)}</div>
    `;
    cont.appendChild(el);
  });
}

/* === FILTRAR POR CATEGORÍA O TEXTO === */
function filtrar(category = 'todas') {
  const q = (buscar.value || '').trim().toLowerCase();
  const criterio = document.getElementById('orden')?.value || 'recomendados';

  // Filtra por texto y categoría
  let res = productos.filter(p =>
    p.nombre.toLowerCase().includes(q) ||
    p.categoria.toLowerCase().includes(q)
  );
  if (category && category !== 'todas') {
    res = res.filter(r => r.categoria === category);
  }

  // Ordena según el criterio seleccionado
  if (criterio === 'menor') {
    res.sort((a, b) => a.precio - b.precio);
  } else if (criterio === 'mayor') {
    res.sort((a, b) => b.precio - a.precio);
  }

  mostrarProductos(res);
}

/* === ORDENAR PRODUCTOS === */
function ordenarProductos() {
  const select = document.getElementById('orden');
  select.style.color = '#6a1b9a';
  select.style.fontWeight = 'bold';

  // Mantiene la categoría activa al ordenar
  const categoriaActiva = document.querySelector('.tag.active')?.dataset?.cat || 'todas';
  filtrar(categoriaActiva);
}

/* === EVENTOS DE FILTRO POR CATEGORÍA === */
tags.forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.tag').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const cat = t.dataset.cat || 'todas';
    filtrar(cat);
  });
});

/* === BUSCADOR EN TIEMPO REAL === */
buscar.addEventListener('input', () => filtrar(document.querySelector('.tag.active')?.dataset?.cat || 'todas'));

/* === INICIO === */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.tag[data-cat="todas"]')?.classList.add('active');
  mostrarProductos(productos);
});

/* === BURBUJA DE WHATSAPP === */
(function(){
  const wa = document.getElementById('whatsapp-bubble');
  const phone = '51946380617';
  const msg = encodeURIComponent('Hola, Distribuidora Uzziel, quisiera más información sobre sus productos.');
  wa.href = `https://wa.me/${phone}?text=${msg}`;
})();

/* === CARRUSEL DE PRODUCTOS POPULARES === */
const populares = [
  { nombre: "Bisagras Capuchinas", precio: 22.00, imagen: "images/bisagras_capuchinas.jpg" },
  { nombre: "Cable Indeco N° 14", precio: 80.00, imagen: "images/cable_indeco_1.jpg" },
  { nombre: "Candado Tigón N°40", precio: 5.50, imagen: "images/candados_tigon.jpg" },
  { nombre: "Codo Bronce Pesado", precio: 5.50, imagen: "images/codos_bronce.jpg" },
  { nombre: "Chapa Perilla", precio: 25.00, imagen: "images/chapa_perilla.jpg" },
  { nombre: "Caño Doble Lavadero", precio: 20.00, imagen: "images/cano_doble_lavadero.jpg" }
];

const carrusel = document.getElementById("carrusel");

// Mostrar slides del carrusel
populares.forEach(p => {
  carrusel.innerHTML += `
    <div class="slide">
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <span>S/ ${p.precio.toFixed(2)}</span>
      <a href="#">Ver producto</a>
    </div>
  `;
});

// Movimiento automático
let index = 0;
function moverCarrusel() {
  index++;
  if (index > populares.length - 4) index = 0;
  carrusel.style.transform = `translateX(-${index * 25}%)`;
}
setInterval(moverCarrusel, 3000);

// Botones manuales
document.querySelector(".prev").onclick = () => {
  index = index === 0 ? populares.length - 4 : index - 1;
  carrusel.style.transform = `translateX(-${index * 25}%)`;
};
document.querySelector(".next").onclick = () => {
  index = index >= populares.length - 4 ? 0 : index + 1;
  carrusel.style.transform = `translateX(-${index * 25}%)`;
};

// Obtener año actual para el footer
document.getElementById("year").innerHTML = new Date().getFullYear();