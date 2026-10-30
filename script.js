// Datos iniciales
const estudiantes = [
  { nombre: "Maria", apellidos: "Mora Perez", nota: 90 },
  { nombre: "Pedro", apellidos: "Sibaja Lopez", nota: 60 },
  { nombre: "Marco", apellidos: "Rojas Castro", nota: 78 }
];

// Referencias al DOM
const form = document.getElementById("form-estudiante");
const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputNota = document.getElementById("nota");
const mensaje = document.getElementById("mensaje");
const cuerpoTabla = document.getElementById("cuerpo-tabla");
const resMayor = document.getElementById("resumen-mayor");
const resPromedio = document.getElementById("resumen-promedio");
const resMenor = document.getElementById("resumen-menor");

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "mensaje " + tipo;
}

function limpiarMensaje() {
  mensaje.textContent = "";
  mensaje.className = "mensaje";
  [inputNombre, inputApellidos, inputNota].forEach(i => i.classList.remove("invalido"));
}

function claseNota(nota) {
  if (nota >= 80) return "nota-alta";
  if (nota < 65) return "nota-baja";
  return "";
}

function renderTabla() {
  cuerpoTabla.innerHTML = "";
  estudiantes.forEach(est => {
    const fila = document.createElement("tr");

    const tdNombre = document.createElement("td");
    tdNombre.textContent = est.nombre;

    const tdApellidos = document.createElement("td");
    tdApellidos.textContent = est.apellidos;

    const tdNota = document.createElement("td");
    tdNota.textContent = est.nota;
    tdNota.classList.add("nota");
    const clase = claseNota(est.nota);
    if (clase) tdNota.classList.add(clase);

    fila.append(tdNombre, tdApellidos, tdNota);
    cuerpoTabla.appendChild(fila);
  });
}

function renderResumen() {
  if (estudiantes.length === 0) {
    resMayor.textContent = resPromedio.textContent = resMenor.textContent = "—";
    return;
  }
  const mayor = estudiantes.reduce((a, b) => (b.nota > a.nota ? b : a));
  const menor = estudiantes.reduce((a, b) => (b.nota < a.nota ? b : a));
  const promedio = estudiantes.reduce((sum, e) => sum + e.nota, 0) / estudiantes.length;

  resMayor.textContent = `${mayor.nombre} ${mayor.apellidos} (${mayor.nota})`;
  resPromedio.textContent = promedio.toFixed(2);
  resMenor.textContent = `${menor.nombre} ${menor.apellidos} (${menor.nota})`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  limpiarMensaje();

  const nombre = inputNombre.value.trim();
  const apellidos = inputApellidos.value.trim();
  const notaTexto = inputNota.value.trim();

  // Validación: campos vacíos
  if (!nombre || !apellidos || notaTexto === "") {
    if (!nombre) inputNombre.classList.add("invalido");
    if (!apellidos) inputApellidos.classList.add("invalido");
    if (notaTexto === "") inputNota.classList.add("invalido");
    mostrarMensaje("Todos los campos son obligatorios.", "error");
    return;
  }

  // Validación: rango de la nota
  const nota = Number(notaTexto);
  if (Number.isNaN(nota) || nota < 0 || nota > 100) {
    inputNota.classList.add("invalido");
    mostrarMensaje("La nota debe ser un número entre 0 y 100.", "error");
    return;
  }

  estudiantes.push({ nombre, apellidos, nota });
  renderTabla();
  renderResumen();
  form.reset();
  inputNombre.focus();
  mostrarMensaje("Estudiante agregado correctamente.", "exito");
});

// Render inicial
renderTabla();
renderResumen();
