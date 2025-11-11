/* Productos (mantener datos que proporcionaste) */
const productos = [
  { nombre: "Adaptadores", precio: 1.80, imagen: "images/adaptadores_1.JPG", categoria: "Electricidad" },
  { nombre: "Badilejo", precio: 6.90, imagen: "images/badilejo_1.JPG", categoria: "Construcción" },
  { nombre: "Bisagras Capuchinas", precio: 22.00, imagen: "images/bisagras_capuchinas.JPG", categoria: "Ferretería" },
  { nombre: "Bisagras Fijas", precio: 36.00, imagen: "images/bisagras_fijas.JPG", categoria: "Ferretería" },
  { nombre: "Brocha N° 1", precio: 1.00, imagen: "images/brochas_1.JPG", categoria: "Pintura" },
  { nombre: "Cable Indeco N° 14", precio: 80.00, imagen: "images/cable_indeco_1.JPG", categoria: "Electricidad" },
  { nombre: "Candados Porte", precio: 6.90, imagen: "images/candados_porte.JPG", categoria: "Ferretería" },
  { nombre: "Candados Tigón N°40", precio: 5.50, imagen: "images/candados_tigon.JPG", categoria: "Ferretería" },
  { nombre: "Caño Doble Lavadero", precio: 20.00, imagen: "images/cano_doble_lavadero.JPG", categoria: "Grifería" },
  { nombre: "Cera Con Guía", precio: 4.50, imagen: "images/cera_con_guia.JPG", categoria: "Ferretería" },
  { nombre: "Chapa Perilla", precio: 25.00, imagen: "images/chapa_perilla.JPG", categoria: "Ferretería" },
  { nombre: "Chapas New 2 Golpes", precio: 20.00, imagen: "images/chapas_new.JPG", categoria: "Ferretería" },
  { nombre: "Check Cimval de Bronce 1/2", precio: 30.00, imagen: "images/check_cimval_bronce_2.JPG", categoria: "Ferretería" },
  { nombre: "Codos de Bronce Pesado", precio: 5.50, imagen: "images/codos_bronce.JPG", categoria: "Ferretería" },
];

/* Mostrar productos */
function mostrarProductos(lista) {
  const cont = document.getElementById('productos');
  cont.innerHTML = '';
  if (!lista || lista.length === 0) {
    cont.innerHTML = '<p style="text-align:center;padding:30px;color:#666">No se encontraron productos.</p>';
    return;
  }

  lista.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <div class="cat">${p.categoria}</div>
      <div class="price">S/ ${p.precio.toFixed(2)}</div>
    `;
    cont.appendChild(card);
  });
}

/* Filtrar por categoría (sidebar) */
function filtrarCategoria(cat) {
  const items = document.querySelectorAll('.cat-list li');
  items.forEach(li => li.classList.remove('active'));
  const clicked = Array.from(items).find(li => li.dataset.cat === cat);
  if (clicked) clicked.classList.add('active');

  if (cat === 'todas') {
    return mostrarProductos(productos);
  }
  const filtrados = productos.filter(p => p.categoria === cat);
  mostrarProductos(filtrados);
}

/* Búsqueda desde header */
function filtrarDesdeHeader() {
  const q = document.getElementById('buscarHeader').value.trim().toLowerCase();
  const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q));
  mostrarProductos(filtrados);
}

/* Eventos: click en categorias (delegation) */
document.addEventListener('click', (e) => {
  const li = e.target.closest('.cat-list li');
  if (li) {
    const cat = li.dataset.cat || li.textContent.trim();
    filtrarCategoria(cat === '' ? 'todas' : cat);
  }
});

/* Buscador botón */
document.getElementById('btnSearch').addEventListener('click', filtrarDesdeHeader);
/* Enter para buscar */
document.getElementById('buscarHeader').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') filtrarDesdeHeader();
});

/* WhatsApp link */
(function initWhatsApp(){
  const wa = document.getElementById('whatsapp-bubble');
  const phone = '51946380617';
  const message = encodeURIComponent('Hola, Distribuidora Uzziel, quisiera más información sobre sus productos.');
  wa.href = `https://wa.me/${phone}?text=${message}`;
})();

/* Init: mostrar todos */
mostrarProductos(productos);
