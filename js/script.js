/* Productos proporcionados por el usuario (sin cambios) */
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

/* Referencias */
const contProductos = document.getElementById('productos');
const buscarHeader = document.getElementById('buscarHeader');
const categoryList = document.getElementById('categoryList');
const productsCount = document.getElementById('productsCount');

/* Mostrar productos en la grid */
function mostrarProductos(lista) {
  contProductos.innerHTML = '';
  productsCount.textContent = `${lista.length} producto(s)`;

  if (!lista || lista.length === 0) {
    contProductos.innerHTML = '<p style="text-align:center;padding:28px;color:#666">No se encontraron productos.</p>';
    return;
  }

  lista.forEach(p => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <div class="cat">${p.categoria}</div>
      <div class="price">S/ ${p.precio.toFixed(2)}</div>
    `;
    contProductos.appendChild(div);
  });
}

/* Filtrar por texto y categoría */
function filtrarProductos() {
  const texto = (buscarHeader.value || '').trim().toLowerCase();
  const categoriaSeleccionada = document.querySelector('.category-list .active')?.dataset?.cat || 'todas';

  let filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto) ||
    p.categoria.toLowerCase().includes(texto)
  );

  if (categoriaSeleccionada && categoriaSeleccionada !== 'todas') {
    filtrados = filtrados.filter(p => p.categoria === categoriaSeleccionada);
  }

  mostrarProductos(filtrados);
}

/* Manejo de categorías (delegation) */
categoryList.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  // toggle active
  document.querySelectorAll('.category-list .cat').forEach(n => n.classList.remove('active'));
  li.classList.add('active');
  filtrarProductos();
});

/* Búsqueda: tecla Enter y botón */
document.getElementById('btnSearch')?.addEventListener('click', filtrarProductos);
buscarHeader?.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') filtrarProductos();
  else filtrarProductos(); // busca en tiempo real
});

/* Inicializar */
mostrarProductos(productos);

/* WhatsApp bubble link */
(function(){
  const waBubble = document.getElementById('whatsapp-bubble');
  const phone = '51946380617';
  const message = encodeURIComponent('Hola, Distribuidora Uzziel, quisiera más información sobre sus productos.');
  waBubble.href = `https://wa.me/${phone}?text=${message}`;
})();
