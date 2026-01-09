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

let enviar = document.getElementById('enviar');
let formulario = document.querySelector('#formulario')

formulario.addEventListener( 'submit', function(e){
    console.log('enviando')
    e.preventDefault();
    const datos = new FormData( formulario );
    const datosObj = Object.fromEntries( datos.entries() );
    enviarFormulario( datosObj);
    
} )

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
