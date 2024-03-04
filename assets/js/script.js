
function Gastar(gasto, cantidad) {
    this.gasto = gasto;
    this.cantidad = cantidad
}

//capturo los elementos del DOM con  el id correspondiente
let btnCalcular = document.querySelector('#btnCalcular');
let totalPresupuesto = document.querySelector('#ingreso');
let gastoTotal = document.querySelector('#totalGastos');
let saldoTotal = document.querySelector('#saldoTotal');
let descripcionGasto = document.querySelector('#txtDescripcionGasto');
let gastoPorUnidad = document.querySelector('#txtCantidadGasto');
let btnGastar = document.querySelector('#btnAddGasto');

//  se crea un arreglo vacio para ir llenando con los  gastos 
let gastos = [];

//funcion para ingresar el presupuesto inicial al HTML
function ingresarPresupuesto() {
   let inputIngreso = document.querySelector('#txtPresupuesto').value;
    totalPresupuesto.textContent = "$" + inputIngreso;
    saldoTotal.textContent = "$" + inputIngreso;
}
btnCalcular.addEventListener('click', ingresarPresupuesto);

//funcion para ir añadiendo gastos
function ingresarGasto() {
    let inputNombreGasto = descripcionGasto.value;
    let inputCantidadGasto = gastoPorUnidad.value;

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
    let nuevoGasto = new Gastar(inputNombreGasto, inputCantidadGasto);
    gastos.push(nuevoGasto);

    //Crear la fila y celdas para los datos que se insertarán en la tabla HTML  id="tablaDos"
    let fila = document.createElement('tr');
    let celdaDescripcion = document.createElement('td');
    celdaDescripcion.textContent = nuevoGasto.gasto;
    let celdaCantidad = document.createElement('td');
    celdaCantidad.textContent = "$" + nuevoGasto.cantidad;
    celdaCantidad.setAttribute('id', 'gastoUnitario');
    let celdaEliminar = document.createElement('td');
    let botonEliminar = document.createElement('button');
    botonEliminar.setAttribute('class', 'btn btn-light center');
    let iconTrash = document.createElement('i');
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
    let sumaGastos = 0;
    gastos.forEach(function (gasto) {
        sumaGastos += parseInt(gasto.cantidad);
    });
    gastoTotal.textContent = "$" + sumaGastos.toLocaleString(); // Mostrar en HTML la suma con formato de moneda

    let total = parseInt(totalPresupuesto.textContent.slice(1)); // Convertir el valor de totalPresupuesto a número
    let saldo = total - sumaGastos;
    saldoTotal.textContent = "$" + saldo.toLocaleString(); // Mostrar resta entre presupuesto y sumaGastos con formato de moneda.
    if(saldo <= 0 ){
        saldoTotal.setAttribute('class', 'table-danger');
        // Desactivar ingreso de saldo negativo
        saldoTotal.setAttribute('readonly', true);
        // Mostrar mensaje de saldo insuficiente
        alert("Saldo insuficiente. Tus gastos superan a tus ingresos");
    }
    else {
        saldoTotal.removeAttribute('class');
        saldoTotal.removeAttribute('readonly');
    }
}




