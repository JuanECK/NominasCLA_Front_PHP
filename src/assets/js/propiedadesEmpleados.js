
let enviar = document.getElementById('enviar');
let formulario = document.querySelector('#formulario');
let buscaEmp = document.getElementById('buscar');
let empleado_id = document.getElementById('empleado_id');
let alta = document.getElementById('alta');
let edita = document.getElementById('edita');
let buscar = document.getElementById('buscar');
let btnEdita = document.getElementById('btnEdita');
let btnBusqueda = document.getElementById('btnBusqueda');
let enviarEdicion = document.getElementById('enviarEdicion');
let cancelar = document.getElementById('cancelar');
let respBusqueda;

formulario.addEventListener( 'submit', function(e){
    console.log('enviando')
    e.preventDefault();
    // noEditable();
    const datos = new FormData( formulario );
    const datosObj = Object.fromEntries( datos.entries() );
    enviarFormulario( datosObj);
    
} )

const volverHome =()=>{
    window.location.href = 'http://127.0.0.1:5500/index.html';
}

const Edita =() =>{
    if(buscar.value != ''){
        buscar.value = '';
    }

    // console.log(buscarEmpleado.classList.contains('oculto') )
    if ( btnEdita.classList.contains('oculto') ){
        inputsDisabledAgain();
        title.innerText = 'Edicion de Propiedades'
    }else{
        title.innerText = 'Propiedades del Empleado'
        inputsDisabledAgain();
    }
    enviar.classList.toggle('oculto')
    enviarEdicion.classList.toggle('oculto')
    alta.classList.toggle('oculto')
    edita.classList.toggle('oculto')
    btnBusqueda.classList.toggle('oculto')
    btnEdita.classList.toggle('oculto')
    // buscarEmpleado.classList.toggle('oculto')
}

const hayDatosBusqueda = () => {
    if(buscaEmp.value == '' && respBusqueda != ''){
        console.log('borra')
        buscaEmp.value = '';
        respBusqueda = '';
        inputsDisabledAgain();
        return
    }
    console.log('no borrar')
}
// noEditable = () => {
//     let noEditable = document.querySelectorAll(".noEditable")
//     noEditable.forEach( item => {
//         item.disabled = false
//         item.required = false
//     } )
// }

const desactiva = () => {
    enviar.disabled = false; // dev
    cancelar.disabled = false; // dev
    let itemDisabled = document.querySelectorAll(".itemDisabled")
    itemDisabled.forEach( item => {
        item.disabled = false
        item.value = '';
        // item.required = false//dev
    } )
    // let formInput = document.querySelectorAll('#formulario input')
    // formInput.forEach( input => {
    //     input.disabled = false
    //     input.required = false // dev
    // } )
}

ver = ()=>{
    // buscaEmp.value = '555';
    // console.log(buscaEmp.value)
}

const inputsDisabledAgain = () => {
    enviar.disabled = true; // dev
    enviarEdicion.disabled = true; // dev
    cancelar.disabled = true; // dev
    buscar.value = '';
    let itemDisabled = document.querySelectorAll(".itemDisabled")
    itemDisabled.forEach( item => {
        item.disabled = true;
        // item.required = true;//dev
        item.value = '';
    } )

    // let noEditable = document.querySelectorAll(".noEditable")
    // noEditable.forEach( item => {
    //     item.disabled = true
    //     item.required = true
    // } )

}

const llenaInputsData = ( array ) => {
    // console.log(Object.entries(array))
    Object.entries(array[0]).forEach(([key, valor]) => {
        // console.log(key+' - '+valor)
    const input = document.getElementsByName(key)[0]; 
    if (input) {
        // if(valor == '0000-00-00') return
        input.value = valor; 
    }
  });

  buscar.value = '';
}

const actualizaEmpleados = async () =>{
    let datos = new FormData( formulario );
    datos.append( 'carga', JSON.stringify([Object.fromEntries( datos.entries() )]) );

// console.log( 'desde el HTML ', datos.get('carga') );

const resp = await fetch( 'http://localhost/BackNominas/public/actualizaPropiedades',{
            method:'POST',
            body: datos,
            redirect: "follow",
        } )
        console.log('termino')
        const respData = await resp.json();
        console.log('desde el PHP', respData);
        if(respData[0].resp == 1){
            buscaEmp.value = '';
            enviarEdicion.disabled = true;
            cancelar.disabled = true;
            inputsDisabledAgain();
            alert('Datos actualizados con exito')
            return
        }
        alert( 'Ocurrio algo, y no se pudo actualizar los datos' )
}

const enviarFormulario  = async ( formulario ) =>{
    let datos = new FormData();
    datos.append( 'carga', JSON.stringify([formulario]) )
    // datos.append('empleado_id')

console.log( 'desde el HTML ',formulario );

const resp = await fetch( 'http://localhost/BackNominas/public/inserta_propiedades',{
            method:'POST',
            body: datos,
            redirect: "follow",
        } )
        console.log('termino')
        const respData = await resp.json();
        console.log('desde el PHP', respData);
        if(respData.status == 200){
            buscaEmp.value = '';
            inputsDisabledAgain();
            alert('Datos ingresados con exito')
            return
        }
        alert( 'Ocurrio algo, y no se pudo guardar la informacion' )
}

const buscarEmpleado = async () => {
    // console.log(buscaEmp.value)
    if(buscaEmp.value == '') {
        alert('Ingresa un codigo de empleado')
        return
    }
    const resp = await fetch( 'http://localhost/BackNominas/public/buscaEmpPropidades', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'empleado': buscaEmp.value})
    })
    const data = await resp.json();
    console.log('desde el PHP ',data)
    if ( data[0].resp ){
        inputsDisabledAgain();
        if( data[0].resp == 1 ){
            alert('El usuario ya cuenta con un registro de propiedades');
            return 
        }else if( data[0].resp == 0 ){
            alert('El usuario no existe');
            return
        }
    }
    enviar.disabled = false;
    cancelar.disabled = false;
    empleado_id.value = data[0].id;
    respBusqueda = data[0].id;
    desactiva();
}

const buscarEmpleadoEdicion = async () => {
    // console.log(buscaEmp.value)
    if(buscaEmp.value == '') {
        alert('Ingresa un codigo de empleado')
        return
    }
    const resp = await fetch( 'http://localhost/BackNominas/public/buscaPropiedadesEmpleado', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'empleado': buscaEmp.value})
    })
    const data = await resp.json();
    console.log('desde el PHP ',data)
    if ( data[0].resp ){
        inputsDisabledAgain();
        if( data[0].resp == 1 ){
            alert('El usuario no cuenta con propiedades para editar');
            return 
        }else if( data[0].resp == 0 ){
            alert('El usuario no existe');
            return
        }
    }

    desactiva();
    llenaInputsData(data)
    enviarEdicion.disabled = false;
    cancelar.disabled = false;
}


// 54
// create table empleados_data (
// 	emp_data_id int AUTO_INCREMENT PRIMARY KEY,
//     empleado_id int,
//     FOREIGN KEY ( empleado_id ) REFERENCES empleados(id),
//     `empleado_id,` int,
//     `indemnizacion_90_dias1,` varchar(5) ,
//     `indemnizacion_20_dias1,` varchar(5) ,
//     `prima_antiguedad1,` varchar(5) ,
//     `dias_aguinaldo1,` int, 
//     `dias_prima_vacacional1,` int, 
//     `dias_vacaciones1,` int, 
//     `prestacion_vacaciones1,` int, 
//     `prestacion_pv1,` int, 
//     `prestacion_aguinaldo1,` int, 
//     `dias_año1,` int, 
//     `salario_diario1,` decimal(10,2), 
//     `salario_diario_integrado1,` decimal(10,2), 
//     `salario_P_indemnizaciones1,` decimal(10,2), 
//     `salario_tope_prima_antiguedad1,` decimal(10,2), 
//     `uma1,` decimal(10,2), 
//     `salario_minimo_general1,` decimal(10,2), 
//     `dias_a_pagar1,` int, 
//     `horas_turno1,` int, 
//     `faltas_periodo1,` int, 
//     `incapacidades1,` int, 
//     `dias_vales_despensa_efectivo1,` int, 
//     `dias_vales_despensa_especie1,` int, 
//     `antiguedad_20_dias1,` int, 
//     `umi1,` decimal(10,2), 
//     `septimo_dia1,` varchar(5) ,
//     `infonavit_porcent1,` int, 
//     `infonavit_FD1,` decimal(10, 4) ,
//     `infonavit_CF1,` decimal(10, 2) ,
//     `dias_imss1,` int, 
//     `dias_bimestre1,` int, 
//     `dias_infonavit1,` int, 
//     `vales_despensa_QNA1,` int, 
//     `vales_despensa_SEM1,` int, 
//     `fondo_ahorro_QNA1,` int, 
//     `fondo_ahorro_SEM1,` int, 
//     `cuota_sindical1,` int, 
//     `pension_alimanticia1,` int, 
//     `bono_puntualidad1,` int, 
//     `vacaciones_pendientes1,` int, 
//     `acum_ausentismos1,` int, 
//     `acum_incapacidades1,` int, 
//     `acum_infonavit1,` decimal(10,2), 
//     `acum_seguro_daños_info1,` decimal(10,2), 
//     `acum_fondo_ahorro1,` decimal(10,2), 
//     `acum_exento_prima_vac1,` decimal(10,2), 
//     `acum_exento_aguinaldo1,` decimal(10, 2) ,
//     `base_gravable_pendiente1,` decimal(10,2), 
//     `aguinaldo_SDI1,` decimal(10,2), 
//     `prima_vacacional_SDI1,` decimal(10,2), 
//     `variable_SDI1,` decimal(10,2), 
//     `fondo_ahorro_SDI1,` decimal(10,2), 
//     `despensa_SDI1,` decimal(10,2), 
//     `gratificación1,` decimal(10,2),
// // );

// `empleado_id`,
// `indemnizacion_90_dias`,
// `indemnizacion_20_dias`,
// `prima_antiguedad`,
// `dias_aguinaldo`,
// `dias_prima_vacacional`,
// `dias_vacaciones`,
// `prestacion_vacaciones`,
// `prestacion_pv`,
// `prestacion_aguinaldo`,
// `dias_año`,
// `salario_diario`,
// `salario_diario_integrado`,
// `salario_P_indemnizaciones`,
// `salario_tope_prima_antiguedad`,
// `uma`,
// `salario_minimo_general`,
// `dias_a_pagar`,
// `horas_turno`,
// `faltas_periodo`,
// `incapacidades`,
// `dias_vales_despensa_efectivo`,
// `dias_vales_despensa_especie`,
// `antiguedad_20_dias`,
// `umi`,
// `septimo_dia`,
// `infonavit_porcent`,
// `infonavit_FD`,
// `infonavit_CF`,
// `dias_imss`,
// `dias_bimestre`,
// `dias_infonavit`,
// `vales_despensa_QNA`,
// `vales_despensa_SEM`,
// `fondo_ahorro_QNA`,
// `fondo_ahorro_SEM`,
// `cuota_sindical`,
// `pension_alimanticia`,
// `bono_puntualidad`,
// `vacaciones_pendientes`,
// `acum_ausentismos`,
// `acum_incapacidades`,
// `acum_infonavit`,
// `acum_seguro_daños_info`,
// `acum_fondo_ahorro`,
// `acum_exento_prima_vac`,
// `acum_exento_aguinaldo`,
// `base_gravable_pendiente`,
// `aguinaldo_SDI`,
// `prima_vacacional_SDI`,
// `variable_SDI`,
// `fondo_ahorro_SDI`,
// `despensa_SDI`,
// `gratificación`

