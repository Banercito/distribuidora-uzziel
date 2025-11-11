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

function mostrarProductos(lista) {
  const contenedor = document.getElementById('productos');
  contenedor.innerHTML = '';

  if (lista.length === 0) {
    contenedor.innerHTML = '<p style="grid-column:1/-1;text-align:center;">No se encontraron productos.</p>';
    return;
  }

  lista.forEach(p => {
    contenedor.innerHTML += `
      <div class="card">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>Categoría: <strong>${p.categoria}</strong></p>
        <p>Precio: <span>S/ ${p.precio.toFixed(2)}</span></p>
      </div>
    `;
  });
}

function filtrarProductos() {
  const texto = document.getElementById('buscar').value.toLowerCase();
  const categoria = document.getElementById('categoria').value;

  let filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
  if (categoria !== 'todas') {
    filtrados = filtrados.filter(p => p.categoria === categoria);
  }

  mostrarProductos(filtrados);
}

// Mostrar todos al inicio
mostrarProductos(productos);

// ---------- Burbuja WhatsApp ----------
(function(){
  const waBubble = document.getElementById('whatsapp-bubble');
  const phone = '51946380617'; 
  const message = 'Hola%2C%20Distribuidora%20Uzziel%2C%20quisiera%20más%20información%20sobre%20sus%20productos.';
  waBubble.href = `https://wa.me/${phone}?text=${message}`;
})();
