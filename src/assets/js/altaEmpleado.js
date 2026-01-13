let enviar = document.getElementById('enviar');
let formulario = document.querySelector('#formulario');
let sueldoDia = document.getElementById('salario_dia');
let sueldoMes = document.getElementById('sueldo_mensual');
let fechaNacimiento = document.getElementById('fecha_nacimiento');
let decimal = document.getElementById('decimal');
let edadC = document.getElementById('edad');

formulario.addEventListener( 'submit', function(e){
    console.log('enviando')
    e.preventDefault();
    const datos = new FormData( formulario );
    const datosObj = Object.fromEntries( datos.entries() );
    enviarFormulario( datosObj);
    
} )

document.getElementById('salario_dia').addEventListener('blur', ()=>{
    if(sueldoDia.value){
        let res = sueldoDia.value * 30
        console.log(res.toFixed(2))
        sueldoMes.value = res.toFixed(2)
    }
})

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
}
