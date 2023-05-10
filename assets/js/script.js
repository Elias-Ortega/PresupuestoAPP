
function Gastar(gasto, cantidad) {
    this.gasto = gasto;
    this.cantidad = cantidad
}

//capturo los elementos del DOM con  el id correspondiente
var btnCalcular = document.querySelector('#btnCalcular');
var totalPresupuesto = document.querySelector('#ingreso');
var gastoTotal = document.querySelector('#totalGastos');
var saldoTotal = document.querySelector('#saldoTotal');
var descripcionGasto = document.querySelector('#txtDescripcionGasto');
var gastoPorUnidad = document.querySelector('#txtCantidadGasto');
var btnGastar = document.querySelector('#btnAddGasto');

//  se crea un arreglo vacio para ir llenando con los  gastos 
var gastos = [];

//funcion para ingresar el presupuesto inicial al HTML
function ingresarPresupuesto() {
    var inputIngreso = document.querySelector('#txtPresupuesto').value;
    totalPresupuesto.textContent = "$" + inputIngreso;
    saldoTotal.textContent = "$" + inputIngreso;
}
btnCalcular.addEventListener('click', ingresarPresupuesto);

//funcion para ir añadiendo gastos
function ingresarGasto() {
    var inputNombreGasto = descripcionGasto.value;
    var inputCantidadGasto = gastoPorUnidad.value;

    if (!inputNombreGasto || !inputCantidadGasto) { //validar que no ingrese campos vacios
        alert('Por favor, ingrese valores para ambos campos');
        return;
    }
    //validar que no ingresen numeros negativos      
    if (isNaN(inputCantidadGasto) || inputCantidadGasto <= 0) {
        alert('Por favor, ingrese una cantidad válida');
        return;
    }

    //se crea un objeto nuevoGasto . añadir al arreglo gastos 
    var nuevoGasto = new Gastar(inputNombreGasto, inputCantidadGasto);
    gastos.push(nuevoGasto);

    //Crear la fila y celdas para los datos que se insertarán en la tabla HTML  id="tablaDos"
    var fila = document.createElement('tr');
    var celdaDescripcion = document.createElement('td');
    celdaDescripcion.textContent = nuevoGasto.gasto;
    var celdaCantidad = document.createElement('td');
    celdaCantidad.textContent = "$" + nuevoGasto.cantidad;
    celdaCantidad.setAttribute('id', 'gastoUnitario');
    var celdaEliminar = document.createElement('td');
    var botonEliminar = document.createElement('button');
    botonEliminar.setAttribute('class', 'btn btn-light');
    var iconTrash = document.createElement('i');
    iconTrash.setAttribute('class', 'fa-solid fa-trash-can fa-xs');
    botonEliminar.addEventListener('click', function () {//evento para eliminar fila al hacer clic en boton
        fila.parentNode.removeChild(fila); // Eliminar fila
        gastos.splice(gastos.indexOf(nuevoGasto), 1); // Eliminar 1 gasto del arreglo gastos
        actualizarTotales(); // llamado a funcion Actualizar totales cuando se elimina al presionar 
    });
    botonEliminar.appendChild(iconTrash);
    celdaEliminar.appendChild(botonEliminar);
    fila.append(celdaDescripcion, celdaCantidad, celdaEliminar);
    document.querySelector('#tablaDos tbody').appendChild(fila)//agregar a la tablaDos

    actualizarTotales();//llamada a funcion actualizar totales cuando se agrega el gasto
}
btnGastar.addEventListener('click', ingresarGasto);



function actualizarTotales() {
    var sumaGastos = 0;
    gastos.forEach(function (gasto) {
        sumaGastos += parseInt(gasto.cantidad);
    });
    gastoTotal.textContent = "$" + sumaGastos.toLocaleString(); // Mostrar en HTML la suma con formato de moneda

    var total = parseInt(totalPresupuesto.textContent.slice(1)); // Convertir el valor de totalPresupuesto a número
    saldoTotal.textContent = "$" + (total - sumaGastos).toLocaleString(); // Mostrar resta entre presupuesto y sumaGastos con formato de moneda.
}


