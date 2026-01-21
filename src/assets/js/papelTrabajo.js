let buscar = document.getElementById('buscar');


const volverHome =()=>{
    window.location.href = 'http://127.0.0.1:5500/index.html';
}

const llenaInputsData = ( array ) => {
    Object.entries(array[0]).forEach(([key, valor]) => {
    const input = document.getElementsByName(key)[0]; 
    if (input) {
        input.value = valor; 
    }
  });

}
const buscarEmpleado = async () => {
    if(buscar.value == '') {
        alert('Ingresa un codigo de empleado')
        return
    }
    const resp = await fetch( 'http://localhost/BackNominas/public/buscaEmpleado_PT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'empleado': buscar.value})
    })
    const data = await resp.json();
    console.log('desde el PHP ',data)
        if( data[0].resp == 0 ){
            alert('El usuario no existe');
            return
        }
        buscar.value = '';
        creaTablaEmpleado( data )

}

const creaTablaEmpleado = (array) => {
    let tabla = 
    `
        <tbody>
        <tr>
            <td>NO. NOMINA:</td>
            <td>${array[0].codigo_empleado}</td>
            <td>NSS:</td>
            <td>${array[0].NSS}</td>
        </tr>
        <tr>
            <td>NOMBRE:</td>
            <td>${array[0].empleado}</td>
            <td>RFC:</td>
            <td>${array[0].RFC}</td>
        </tr>
        <tr>
            <td>PUESTO:</td>
            <td>${array[0].puesto}</td>
            <td>CURP:</td>
            <td>${array[0].CURP}</td>
        </tr>
        <tr>
            <td>TIPO DE NOMINA:</td>
            <td>${array[0].tipo_nomina}</td>
        </tr>
    </tbody>
    
    `
    document.getElementById('table_Datos_empleado').innerHTML = tabla;
}