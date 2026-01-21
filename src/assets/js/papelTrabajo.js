(function(e){

}())

let buscar = document.getElementById('buscar');
let añoActual;
let carga;
let antiguedad = '';

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
const getAñoActual = () =>{
    let año = new Date();
    let a = año.getFullYear();
    añoActual = `${a}-01-01`
    return `${a}-01-01`
    // console.log(inicioAño)
}

const getAntiguedad = () => {
    // let baja = new Date('2025/12/16')
    // let ingreso = new Date("2016/08/15")
    // console.log(seteaFecha(carga[0].fecha_ingreso))
    let baja = new Date(seteaFecha(document.getElementById('fechaAntiguedad').value))
    let ingreso = new Date(seteaFecha(carga[0].fecha_ingreso))

    const diferencia = (baja - ingreso) / (1000 * 60 * 60 * 24);
    const resultado = (diferencia +1) / 365;
    antiguedad = resultado.toFixed(2);

     if(isNaN(resultado)) {return}
    document.getElementById('tdAntiguedad').innerText = antiguedad;
    // console.log(antiguedad)

    calculaDiasAguinaldo();
    CalculadiasPrimaVacacional();
}

fechaInicioAñoActual = () =>{
    calculaDiasAguinaldo();
}

const seteaFecha = (fecha) => {
    // console.log(fecha)
    const [year, month, day] = fecha.split('-');
    return `${year}/${month}/${day}`
}
 
const calculaDiasAguinaldo = () =>{
// const calculaDiasAguinaldo = (ingreso, baja ) =>{
    // T = carga[0].fecha_ingreso
    // let ingreso = new Date(T.replace(/-/g, '\/'))

    let ingreso = new Date(seteaFecha(carga[0].fecha_ingreso))
    let baja = new Date(seteaFecha(document.getElementById('fechaAntiguedad').value))
    let añoActual = new Date(seteaFecha(getAñoActual()))
    const msPorDia = 24 * 60 * 60 * 1000;

  // Condición ? Valor_Si_Verdadero : Valor_Si_Falso
    const diferencia = (ingreso > añoActual) ? (baja - ingreso) : (baja - añoActual);
    let resultado = (diferencia / msPorDia) + 1;
    // console.log(resultado)
    if(isNaN(resultado)) {return}
    // console.log('pase')
    document.getElementById('dias_aguinaldo').innerText = resultado

}

const CalculadiasPrimaVacacional = () => {
    let ingreso = new Date(seteaFecha(carga[0].fecha_ingreso)) // morado
    let baja = new Date(seteaFecha(document.getElementById('fechaAntiguedad').value)) // celeste
    let ultimoAniversario = new Date(seteaFecha(document.getElementById('fechaultimoAniversario').value)) // naranja
    const msPorDia = 24 * 60 * 60 * 1000;

    if(baja == 'Invalid Date'){return}

    const diferencia = (baja > ultimoAniversario) ? (baja - ultimoAniversario) : (ultimoAniversario - ingreso);
    let resultado = (diferencia / msPorDia) + 1;

    if( isNaN(resultado) ) {return}

     document.getElementById('diasPrimaVacacional').innerText = resultado
}

const iniciaSelects = () => {
document.getElementsByName('indemnizacion_90_dias')[0].value = carga[0].indemnizacion_90_dias;
document.getElementsByName('indemnizacion_20_dias')[0].value = carga[0].indemnizacion_20_dias;
document.getElementsByName('prima_antiguedad')[0].value = carga[0].prima_antiguedad;
}


const inicializaFunciones = () =>{
    // calculaDiasAguinaldo();
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
        carga = data;
        creaTablaEmpleado( data );
        creaTablaPropiedades( data );
        iniciaSelects();
        inicializaFunciones();
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
            <td></td>
            <td></td>
        </tr>
    </tbody>
    
    `
    document.getElementById('table_Datos_empleado').innerHTML = tabla;
}

const creaTablaPropiedades = ( array ) => {
    let tabla = 
    `
        <tbody>
        <tr>
            <td>FECHA DE INGRESO Y/O ANTIGÜEDAD:</td>
            <td><input type="date" name="" value="${array[0].fecha_ingreso}" id=""></td>
            <td>SALARIO DIARIO:</td>
            <td></td>
            <td>INFONAVIT %:</td>
            <td></td>
            <td>VACACIONES PENDIENTES:</td>
            <td></td>
        </tr>
        <tr>
            <td>FECHA DE BAJA:</td>
            <td><input type="date" name="" id="fechaAntiguedad" onblur="getAntiguedad()"></td>
            <td>SALARIO DIARIO INTEGRADO:</td>
            <td></td>
            <td>INFONAVIT F.D.:</td>
            <td></td>
            <td>ACUM AUSENTISMOS:</td>
            <td></td>
        </tr>
        <tr>
            <td>FECHA ULTIMO ANIVERSARIO:</td>
            <td><input type="date" name="" id="fechaultimoAniversario" onblur="CalculadiasPrimaVacacional()"></td>
            <td>SALARIO P/INDEMNIZACIONES:</td>
            <td></td>
            <td>INFONAVIT C.F.:</td>
            <td></td>
            <td>11:</td>
            <td></td>
        </tr>
        <tr>
            <td>FECHA INICIO DEL AÑO ACTUAL:</td>
            <td><input type="date" name="" value="${getAñoActual()}" onblur="fechaInicioAñoActual()" id=""></td>
            <td>SALARIO TOPE PRIMA ANTIGÜEDAD:</td>
            <td></td>
            <td>DIAS IMSS:</td>
            <td></td>
            <td>ACUM INCAPACIDADES:</td>
            <td></td>
        </tr>
        <tr>
            <td>ANTIGÜEDAD:</td>
            <td id="tdAntiguedad"></td>
            <td>UMA:</td>
            <td></td>
            <td>DIAS BIMESTRE:</td>
            <td></td>
            <td>ACUM INFONAVIT:</td>
            <td></td>
        </tr>
        <tr>
            <td>INDEMNIZACION 90 DIAS:</td>
            <td>
            <select class="" name="indemnizacion_90_dias" id="" >
                <option value="SI">SI</option>
                <option value="NO">NO</option>
            </select>
            </td>
            <td>1SALARIO MINIMO GENERAL:</td>
            <td></td>
            <td>DIAS INFONAVIT:</td>
            <td></td>
            <td>ACUM SEGURO DAÑOS INFO:</td>
            <td></td>
        </tr>
        <tr>
            <td>INDEMNIZACION 20 DIAS:</td>
            <td>
            <select class="" name="indemnizacion_20_dias" id="">
                <option value="SI">SI</option>
                <option value="NO">NO</option>
            </select>
            </td>
            <td>DIAS A PAGAR:</td>
            <td></td>
            <td>VALES DESPENSA QNA:</td>
            <td></td>
            <td>ACUM FONDO AHORRO:</td>
            <td></td>
        </tr>
        <tr>
            <td>PRIMA DE ANTIGÜEDAD:</td>
            <td>
            <select class="" name="prima_antiguedad" id="">
                <option value="SI">SI</option>
                <option value="NO">NO</option>
            </select>
            </td>
            <td>HORAS DEL TURNO:</td>
            <td></td>
            <td>VALES DESPENSA SEM:</td>
            <td></td>
            <td>ACUM EXENTO PRIMA VAC:</td>
            <td></td>
        </tr>
        <tr>
            <td>DIAS AGUINALDO:</td>
            <td id="dias_aguinaldo"></td>
            <td>FALTAS DEL PERIODO:</td>
            <td></td>
            <td>FONDO AHORRO QNA:</td>
            <td></td>
            <td>ACUM EXENTO AGUINALDO:</td>
            <td></td>
        </tr>
        <tr>
            <td>DIAS PRIMA VACACIONAL:</td>
            <td id="diasPrimaVacacional"></td>
            <td>INCAPACIDADES:</td>
            <td></td>
            <td>FONDO AHORRO SEM:</td>
            <td></td>
            <td>BASE GRAVABLE PENDIENTE:</td>
            <td></td>
        </tr>
        <tr>
            <td>DIAS VACACIONES:</td>
            <td></td>
            <td>DIAS PARA VALES DESPENSA EFECTIVO:</td>
            <td></td>
            <td>CUOTA SINDICAL:</td>
            <td></td>
            <td>11:</td>
            <td></td>
        </tr>
        <tr>
            <td>PRESTACION VACACIONES:</td>
            <td></td>
            <td>DIAS PARA VALES DESPENSA ESPECIE:</td>
            <td></td>
            <td>PENSION ALIMENTICIA:</td>
            <td></td>
            <td>11:</td>
            <td></td>
        </tr>
        <tr>
            <td>PRESTACION PV:</td>
            <td></td>
            <td>ANTIGÜEDAD PARA 20 DIAS:</td>
            <td></td>
            <td>BONO DE PUNTUALIDAD:</td>
            <td></td>
            <td>11:</td>
            <td></td>
        </tr>
        <tr>
            <td>PRESTACION AGUINALDO:</td>
            <td></td>
            <td>UMI:</td>
            <td></td>
            <td>11:</td>
            <td></td>
            <td>11:</td>
            <td></td>
        </tr>
        <tr>
            <td>DIAS DEL AÑO:</td>
            <td></td>
            <td>SEPTIMO DIA:</td>
            <td></td>
            <td>11:</td>
            <td></td>
            <td>11:</td>
            <td></td>
        </tr>
    </tbody>
`
document.getElementById('table_Propiedades').innerHTML = tabla;
}