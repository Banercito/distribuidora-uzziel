/* === PRODUCTOS PRINCIPALES === */
const productos = [
  { nombre: "Adaptadores", precio: 1.80, imagen: "images/adaptadores_1.jpg", categoria: "Electricidad", marca: "Genérico" },
  { nombre: "Badilejo", precio: 6.90, imagen: "images/badilejo_1.jpg", categoria: "Construcción", marca: "Genérico" },
  { nombre: "Bisagras Capuchinas", precio: 22.00, imagen: "images/bisagras_capuchinas.jpg", categoria: "Ferretería", marca: "Forte" },
  { nombre: "Bisagras Fijas", precio: 36.00, imagen: "images/bisagras_fijas.jpg", categoria: "Ferretería", marca: "Forte" },
  { nombre: "Brocha N° 1", precio: 1.00, imagen: "images/brochas_1.jpg", categoria: "Pintura", marca: "Genérico" },
  { nombre: "Cable Indeco N° 14", precio: 80.00, imagen: "images/cable_indeco_n14.jpg", categoria: "Electricidad", marca: "Indeco" },
  { nombre: "Candados Porte", precio: 6.90, imagen: "images/candados_porte.jpg", categoria: "Ferretería", marca: "Porte" },
  { nombre: "Candados Tigón N°40", precio: 5.50, imagen: "images/candados_tigon_n40.jpg", categoria: "Ferretería", marca: "Tigón" },
  { nombre: "Caño Doble Lavadero", precio: 20.00, imagen: "images/cano_doble_lavadero.jpg", categoria: "Grifería", marca: "Genérico" },
  { nombre: "Cera Con Guía", precio: 4.50, imagen: "images/cera_con_guia.jpg", categoria: "Ferretería", marca: "Genérico" },
  { nombre: "Chapa Perilla", precio: 25.00, imagen: "images/chapa-forte.jpg", categoria: "Ferretería", marca: "Forte" },
  { nombre: "Chapas New 2 Golpes", precio: 20.00, imagen: "images/chapas_new.jpg", categoria: "Ferretería", marca: "New" },
  { nombre: "Check Cimval de Bronce 1/2", precio: 30.00, imagen: "images/check_cimval_bronce_2.jpg", categoria: "Ferretería", marca: "Cimval" },
  { nombre: "Codos de Bronce Pesado", precio: 5.50, imagen: "images/codos_bronce.jpg", categoria: "Ferretería", marca: "Genérico" }
];

/* === ELEMENTOS DEL DOM === */
const cont = document.getElementById('productos');
const buscar = document.getElementById('buscarHeader');
const tags = document.querySelectorAll('.tag');

/* === ESTILOS DEL DROPDOWN === */
const styleTag = document.createElement('style');
styleTag.textContent = `
  #search-dropdown {
    position: fixed;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    z-index: 99999;
    max-height: 340px;
    overflow-y: auto;
    display: none;
  }
  .dropdown-item {
    display: flex;
    flex-direction: column;
    padding: 10px 16px;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.15s;
  }
  .dropdown-item:last-child { border-bottom: none; }
  .dropdown-item:hover { background: #f8f0ff; }
  .dropdown-nombre {
    font-size: 14px;
    color: #222;
  }
  .dropdown-nombre strong {
    color: #6a1b9a;
    font-weight: 700;
  }
  .dropdown-cat {
    font-size: 12px;
    color: #888;
    margin-top: 3px;
  }
  .dropdown-cat-link {
    color: #6a1b9a;
    font-weight: 600;
  }
  .dropdown-empty {
    padding: 12px 16px;
    color: #999;
    font-size: 13px;
  }
`;
document.head.appendChild(styleTag);

/* === CREAR DROPDOWN EN BODY (evita overflow:hidden del header) === */
const dropdown = document.createElement('div');
dropdown.id = 'search-dropdown';
document.body.appendChild(dropdown);

function posicionarDropdown() {
  const rect = buscar.getBoundingClientRect();
  dropdown.style.top = (rect.bottom + window.scrollY) + 'px';
  dropdown.style.left = rect.left + 'px';
  dropdown.style.width = rect.width + 'px';
}

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
    el.dataset.nombre = p.nombre;
    el.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
      <div class="brand">Por Distribuidora Uzziel</div>
      <h3>${p.nombre}</h3>
      <div class="marca-tag">${p.marca}</div>
      <div class="price">S/ ${p.precio.toFixed(2)}</div>
    `;
    cont.appendChild(el);
  });
}

/* === FUNCIÓN CENTRAL DE FILTRADO === */
function filtrar(category = 'todas') {
  const q = (buscar.value || '').trim().toLowerCase();
  const marcaQ = (document.getElementById('brandSearch')?.value || '').trim().toLowerCase();
  const criterio = document.getElementById('orden')?.value || 'recomendados';

  let res = q
    ? productos.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q) ||
        p.marca.toLowerCase().includes(q)
      )
    : [...productos];

  if (category && category !== 'todas') {
    res = res.filter(r => r.categoria === category);
  }

  if (marcaQ) {
    res = res.filter(r => r.marca.toLowerCase().includes(marcaQ));
  }

  if (criterio === 'menor') res.sort((a, b) => a.precio - b.precio);
  else if (criterio === 'mayor') res.sort((a, b) => b.precio - a.precio);

  mostrarProductos(res);
}

/* === IR A PRODUCTO ESPECÍFICO === */
function irAProducto(nombreProducto) {
  buscar.value = nombreProducto;
  cerrarSugerencias();
  filtrar(document.querySelector('.tag.active')?.dataset?.cat || 'todas');
  setTimeout(() => {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

/* === AUTOCOMPLETE === */
function resaltar(texto, query) {
  const idx = texto.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return texto;
  return texto.substring(0, idx)
    + '<strong>' + texto.substring(idx, idx + query.length) + '</strong>'
    + texto.substring(idx + query.length);
}

function mostrarSugerencias(q) {
  if (!q || q.length < 1) {
    cerrarSugerencias();
    return;
  }

  const ql = q.toLowerCase();
  const coincidencias = productos.filter(p =>
    p.nombre.toLowerCase().includes(ql) ||
    p.categoria.toLowerCase().includes(ql) ||
    p.marca.toLowerCase().includes(ql)
  );

  posicionarDropdown();

  if (coincidencias.length === 0) {
    dropdown.innerHTML = '<div class="dropdown-empty">No se encontraron resultados</div>';
    dropdown.style.display = 'block';
    return;
  }

  dropdown.innerHTML = coincidencias.map(p => `
    <div class="dropdown-item" data-nombre="${p.nombre}">
      <span class="dropdown-nombre">${resaltar(p.nombre, q)}</span>
      <span class="dropdown-cat">en <span class="dropdown-cat-link">${p.categoria}</span></span>
    </div>
  `).join('');

  dropdown.style.display = 'block';

  dropdown.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('mousedown', (e) => {
      e.preventDefault();
      irAProducto(item.dataset.nombre);
    });
  });
}

function cerrarSugerencias() {
  dropdown.style.display = 'none';
}

/* === EVENTOS DEL BUSCADOR === */
buscar.addEventListener('input', () => {
  // Limpiar buscador de marca para que no interfiera
  const brandInput = document.getElementById('brandSearch');
  if (brandInput) brandInput.value = '';
  mostrarSugerencias(buscar.value.trim());
  filtrar(document.querySelector('.tag.active')?.dataset?.cat || 'todas');
});

buscar.addEventListener('focus', () => {
  if (buscar.value.trim()) mostrarSugerencias(buscar.value.trim());
});

buscar.addEventListener('blur', () => {
  setTimeout(cerrarSugerencias, 150);
});

buscar.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarSugerencias();
  if (e.key === 'Enter') {
    cerrarSugerencias();
    filtrar(document.querySelector('.tag.active')?.dataset?.cat || 'todas');
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  }
});

// Botón lupa
document.getElementById('btnSearch')?.addEventListener('click', () => {
  cerrarSugerencias();
  filtrar(document.querySelector('.tag.active')?.dataset?.cat || 'todas');
  document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
});

// Reposicionar si cambia el tamaño de ventana
window.addEventListener('resize', () => {
  if (dropdown.style.display === 'block') posicionarDropdown();
});

/* === ORDENAR PRODUCTOS === */
function ordenarProductos() {
  const select = document.getElementById('orden');
  select.style.color = '#6a1b9a';
  select.style.fontWeight = 'bold';
  filtrar(document.querySelector('.tag.active')?.dataset?.cat || 'todas');
}

/* === EVENTOS TAGS CATEGORÍA === */
tags.forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.tag').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    filtrar(t.dataset.cat || 'todas');
  });
});

/* === INICIO === */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.tag[data-cat="todas"]')?.classList.add('active');
  mostrarProductos(productos);

  document.getElementById('brandSearch').addEventListener('input', () => {
    // Limpiar buscador principal para que no interfiera
    buscar.value = '';
    cerrarSugerencias();
    filtrar(document.querySelector('.tag.active')?.dataset?.cat || 'todas');
  });
});

/* === BURBUJA WHATSAPP === */
(function () {
  const wa = document.getElementById('whatsapp-bubble');
  const phone = '51946380617';
  const msg = encodeURIComponent('Hola, Distribuidora Uzziel, quisiera más información sobre sus productos.');
  wa.href = `https://wa.me/${phone}?text=${msg}`;
})();

/* === CARRUSEL === */
const populares = [
  { nombre: "Bisagras Capuchinas", precio: 22.00, imagen: "images/bisagras_capuchinas.jpg" },
  { nombre: "Cable Indeco N° 14", precio: 80.00, imagen: "images/cable_indeco_n14.jpg" },
  { nombre: "Candado Tigón N°40", precio: 5.50, imagen: "images/candados_tigon_n40.jpg" },
  { nombre: "Codo Bronce Pesado", precio: 5.50, imagen: "images/codos_bronce.jpg" },
  { nombre: "Chapa Perilla", precio: 25.00, imagen: "images/chapa-forte.jpg" },
  { nombre: "Caño Doble Lavadero", precio: 20.00, imagen: "images/cano_doble_lavadero.jpg" }
];

const carrusel = document.getElementById("carrusel");
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

let index = 0;
function moverCarrusel() {
  index++;
  if (index > populares.length - 4) index = 0;
  carrusel.style.transform = `translateX(-${index * 25}%)`;
}
setInterval(moverCarrusel, 3000);

document.querySelector(".prev").onclick = () => {
  index = index === 0 ? populares.length - 4 : index - 1;
  carrusel.style.transform = `translateX(-${index * 25}%)`;
};
document.querySelector(".next").onclick = () => {
  index = index >= populares.length - 4 ? 0 : index + 1;
  carrusel.style.transform = `translateX(-${index * 25}%)`;
};

document.getElementById("year").innerHTML = new Date().getFullYear();