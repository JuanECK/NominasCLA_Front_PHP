
let enviar = document.getElementById('enviar');
let formulario = document.querySelector('#formulario');
let buscaEmp = document.getElementById('buscar');
let empleado_id = document.getElementById('empleado_id');


formulario.addEventListener( 'submit', function(e){
    console.log('enviando')
    e.preventDefault();
    // noEditable();
    const datos = new FormData( formulario );
    const datosObj = Object.fromEntries( datos.entries() );
    enviarFormulario( datosObj);
    
} )

volverHome =()=>{
    window.location.href = 'http://127.0.0.1:5500/index.html';
}

// noEditable = () => {
//     let noEditable = document.querySelectorAll(".noEditable")
//     noEditable.forEach( item => {
//         item.disabled = false
//         item.required = false
//     } )
// }

desactiva = () => {
    enviar.disabled = false; // dev
    let itemDisabled = document.querySelectorAll(".itemDisabled")
    itemDisabled.forEach( item => {
        item.disabled = false
        item.required = false//dev
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

inputsDisabledAgain = () => {
    enviar.disabled = true; // dev
    let itemDisabled = document.querySelectorAll(".itemDisabled")
    itemDisabled.forEach( item => {
        item.disabled = true;
        item.required = true;//dev
        item.value = '';
    } )

    // let noEditable = document.querySelectorAll(".noEditable")
    // noEditable.forEach( item => {
    //     item.disabled = true
    //     item.required = true
    // } )

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
        // buscaEmp.value = '';
        // inputsDisabledAgain();
}

buscarEmpleado = async () => {
    // console.log(buscaEmp.value)
    if(buscaEmp.value == '') {
        alert('ingresa un codigo de empleado')
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
    if( data[0].id == "Sin datos" ){
        alert('el usuario no existe')
        return 
    }
    enviar.disabled = false;
    empleado_id.value = data[0].id
    desactiva();
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