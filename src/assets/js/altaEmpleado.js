let enviar = document.getElementById('enviar');
let formulario = document.querySelector('#formulario');
let sueldoDia = document.getElementById('salario_dia');
let sueldoMes = document.getElementById('sueldo_mensual');
let fechaNacimiento = document.getElementById('fecha_nacimiento');
let decimal = document.getElementById('decimal');
let edadC = document.getElementById('edad');
let alta = document.getElementById('alta');
let edita = document.getElementById('edita');
let buscarEmpleado = document.getElementById('buscarEmpleado');
let buscar = document.getElementById('buscar');
let enviarEdicion = document.getElementById('enviarEdicion');

// ---------------------------------------------------
// AVISO continuar con la edicion del usuario
// 1 agregar su procedimiento de UPDATE 
// 2 agregar los candados necesarios en Propiedades del Empleado asi como en los procedimientos
// como en la respuesta de la base de datos
// ---------------------------------------------------

formulario.addEventListener( 'submit', function(e){
    console.log('enviando')
    e.preventDefault();
    const datos = new FormData( formulario );
    const datosObj = Object.fromEntries( datos.entries() );
    // console.log(datosObj)
    enviarFormulario( datosObj);
    
} )

document.getElementById('salario_dia').addEventListener('blur', ()=>{
    if(sueldoDia.value){
        let res = sueldoDia.value * 30
        console.log(res.toFixed(2))
        sueldoMes.value = res.toFixed(2)
    }
})

volverHome =()=>{
    window.location.href = 'http://127.0.0.1:5500/index.html';
}

Alta =() =>{
    if(buscar.value != ''){
        buscar.value = '';
    }
    alta.classList.toggle('oculto')
    edita.classList.toggle('oculto')
    buscarEmpleado.classList.toggle('oculto')
}
Edita =() =>{
    // if(buscar.value != ''){
    //     buscar.value = '';
    // }

    enviar.classList.toggle('oculto')
    enviarEdicion.classList.toggle('oculto')
    alta.classList.toggle('oculto')
    edita.classList.toggle('oculto')
    buscarEmpleado.classList.toggle('oculto')
}

document.getElementById('fecha_nacimiento').addEventListener('blur', ()=>{
// console.log(new Date(fechaNacimiento.value))
    let fechaActual = new Date()

    let fechaHoy = `${fechaActual.getFullYear()}-${fechaActual.getMonth() + 1}-${fechaActual.getDate()}`

    let hoy = new Date(fechaHoy);

    let cumpleAnos = new Date(fechaNacimiento.value)

    let edad = hoy.getFullYear() - cumpleAnos.getFullYear();

    const mesActual = hoy.getMonth();
    const mesCumple = cumpleAnos.getMonth();

    // Si el mes actual es menor que el mes de cumpleaños, o si es el mismo mes pero el día actual es menor
    if (mesActual < mesCumple || (mesActual === mesCumple && hoy.getDate() < cumpleAnos.getDate())) {
        edad--; // Resta un año si el cumpleaños aún no ha ocurrido
    }

    const resultado = (hoy - cumpleAnos) / (1000 * 60 * 60 * 24) / 365.25;

    decimal.value = resultado.toFixed(2);
    edadC.value = edad

})

resetInput = () => {
    let formInput = document.querySelectorAll('#formulario input')
    formInput.forEach( input => {
        input.value = '';
        // input.disabled = false
        // input.required = false // dev
    } )
}

llenaInputsData = ( array ) => {
    // console.log(Object.entries(array))
    Object.entries(array[0]).forEach(([key, valor]) => {
        // console.log(key+' - '+valor)
    const input = document.getElementsByName(key)[0]; 
    if (input) {
        if(valor == '0000-00-00') return
        input.value = valor; 
    }
  });

  buscar.value = '';
    // let formInput = document.querySelectorAll('#formulario input')
    // formInput.forEach( (input, index) => {
    //     if(array[index] !== undefined){
    //         input.value = array[index];
    //     }
    // } )
}

const enviarFormulario  = async ( formulario ) =>{
    let datos = new FormData();
    datos.append( 'carga', JSON.stringify([formulario]) )

console.log( 'desde el HTML ',formulario );

const resp = await fetch( 'http://localhost/BackNominas/public/inserta_empleado',{
            method:'POST',
            body: datos,
            redirect: "follow",
        } )
        console.log('termino')
        const respData = await resp.json();
        console.log('desde el PHP', respData);
        if(respData[0].resultado == 0){
            alert('Usuario almacenado con exito')
            resetInput();
        }else if(respData[0].resultado == 1){
            alert('Error: El usuario que intenta almacenar ya existe!!')
        }else if(respData[0].resultado == 2){
            alert('Error: El correo ya existe!!')
        }
}

buscarEmpleado_A = async () => {

    if(buscar.value == '') {
        alert('ingresa un codigo de empleado')
        return
    }
    const resp = await fetch( 'http://localhost/BackNominas/public/buscaEmpleadoEdicion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'empleado': buscar.value})
    })
    const data = await resp.json();
    console.log('desde el PHP ',data)
    if( data[0].id == "Sin datos" ){
        alert('el usuario no existe')
        return 
    }
    llenaInputsData(data)
    enviarEdicion.disabled = false;

}
