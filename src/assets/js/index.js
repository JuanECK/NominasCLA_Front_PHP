// (function(e){

//     const data = async function() {
//         console.log('inicio')
//         const resp = await fetch( 'http://localhost/BackNominas/public/inserta_empleado',{
//             method:'POST',
//         } )
//         console.log('termino')
//         const respData = await resp.json();
//         console.log(respData)
//     }

//     data()

// }())


irAltaEmpleado = () => {
    window.location.href = 'http://127.0.0.1:5500/altaEmpleado.html';
}
irPropiedadesEmpleado = () => {
    window.location.href = 'http://127.0.0.1:5500/opcionEmpleado.html';
}
