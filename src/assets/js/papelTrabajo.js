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
    let ingreso = new Date(seteaFecha(document.getElementById('fechaIngreso').value))
    // let ingreso = new Date(seteaFecha(carga[0].fecha_ingreso))

    const diferencia = (baja - ingreso) / (1000 * 60 * 60 * 24);
    const resultado = (diferencia +1) / 365;
    antiguedad = resultado.toFixed(2);

     if(isNaN(resultado)) {return}
    document.getElementById('tdAntiguedad').innerText = antiguedad;
    document.getElementById('antiguedadVeinteDias').innerText = Math.trunc(antiguedad);

    // console.log(antiguedad)

    calculaDiasAguinaldo();
    CalculadiasPrimaVacacional();
}

const fechaInicioAñoActual = () =>{
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

    // let ingreso = new Date(seteaFecha(carga[0].fecha_ingreso))
    let ingreso = new Date(seteaFecha(document.getElementById('fechaIngreso').value))
    let baja = new Date(seteaFecha(document.getElementById('fechaAntiguedad').value))
    // let añoActual = new Date(seteaFecha(getAñoActual()))
    let añoActual = new Date(seteaFecha(document.getElementById('añoActual').value))
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
    // let ingreso = new Date(seteaFecha(carga[0].fecha_ingreso)) // morado
    let ingreso = new Date(seteaFecha(document.getElementById('fechaIngreso').value)) // morado
    let baja = new Date(seteaFecha(document.getElementById('fechaAntiguedad').value)) // celeste
    let ultimoAniversario = new Date(seteaFecha(document.getElementById('fechaultimoAniversario').value)) // naranja
    const msPorDia = 24 * 60 * 60 * 1000;

    if(baja == 'Invalid Date'){return}

    const diferencia = (baja > ultimoAniversario) ? (baja - ultimoAniversario) : (ultimoAniversario - ingreso);
    let resultado = (diferencia / msPorDia) + 1;

    const diasVacacionesdiferencia = (baja > ultimoAniversario) ? (baja - ultimoAniversario) : (baja - ingreso);
    let resDiaVacaciones = (diasVacacionesdiferencia / msPorDia) + 1;

    if( isNaN(resultado) ) {return}
     document.getElementById('diasPrimaVacacional').innerText = resultado;

    if ( isNaN( resDiaVacaciones ) ){return}
    document.getElementById('diasVacaciones').innerText = resDiaVacaciones;

}

const FechaIngresosAntiguedad = () =>{
getAntiguedad();
}

const diasPagar = () =>{
    document.getElementById('diasImss').innerText = document.getElementById('dias_a_pagar').value
}

const guardaCambiosPropiedades = (id) =>{
// document.getElementById(id).value
console.log(document.getElementById(id).value+' - '+id)
}

const soloDigito = (id) => {
    let entrada = document.getElementById(id).value;
    let ultimoDigito = entrada.slice(-1);
    let resultado;

        if( isNaN(ultimoDigito) && ultimoDigito != '.'  ){
            resultado = entrada.slice(0,-1);
            document.getElementById(id).value = resultado 
            return
            
        }
        document.getElementById(id).value = entrada  
  }

const iniciaSelects = () => {
    document.getElementsByName('indemnizacion_90_dias')[0].value = carga[0].indemnizacion_90_dias;
    document.getElementsByName('indemnizacion_20_dias')[0].value = carga[0].indemnizacion_20_dias;
    document.getElementsByName('prima_antiguedad')[0].value = carga[0].prima_antiguedad;
    document.getElementsByName('septimo_dia')[0].value = carga[0].septimo_dia;
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
            <td><input type="date" name="" value="${array[0].fecha_ingreso}" id="fechaIngreso" onblur="FechaIngresosAntiguedad()"></td>
            <td>SALARIO DIARIO:</td>
            <td><input type="text" value="${array[0].salario_diario}" oninput="soloDigito('salario_diario')" onblur="guardaCambiosPropiedades('salario_diario')" id="salario_diario"></td>
            <td>INFONAVIT %:</td>
            <td><input type="text" value="${array[0].infonavit_porcent}" oninput="soloDigito('infonavit_porcent')" onblur="guardaCambiosPropiedades('infonavit_porcent')" id="infonavit_porcent"></td>
            <td>VACACIONES PENDIENTES:</td>
            <td></td>
        </tr>
        <tr>
            <td>FECHA DE BAJA:</td>
            <td><input type="date" name="" id="fechaAntiguedad" onblur="getAntiguedad()"></td>
            <td>SALARIO DIARIO INTEGRADO:</td>
            <td><input type="text" value="${array[0].salario_diario_integrado}" oninput="soloDigito('salario_diario_integrado')" onblur="guardaCambiosPropiedades('salario_diario_integrado')" id="salario_diario_integrado"></td>
            <td>INFONAVIT F.D.:</td>
            <td><input type="text" value="${array[0].infonavit_FD}" oninput="soloDigito('infonavit_FD')" onblur="guardaCambiosPropiedades('infonavit_FD')" id="infonavit_FD"></td>
            <td>ACUM AUSENTISMOS:</td>
            <td></td>
        </tr>
        <tr>
            <td>FECHA ULTIMO ANIVERSARIO:</td>
            <td><input type="date" name="" id="fechaultimoAniversario" onblur="CalculadiasPrimaVacacional()"></td>
            <td>SALARIO P/INDEMNIZACIONES:</td>
            <td>!!!RESOLVER!!!</td>
            <td>INFONAVIT C.F.:</td>
            <td><input type="text" value="${array[0].infonavit_CF}" oninput="soloDigito('infonavit_CF')" onblur="guardaCambiosPropiedades('infonavit_CF')" id="infonavit_CF"></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>FECHA INICIO DEL AÑO ACTUAL:</td>
            <td><input type="date" name="" value="${getAñoActual()}" onblur="fechaInicioAñoActual()" id="añoActual"></td>
            <td>SALARIO TOPE PRIMA ANTIGÜEDAD:</td>
            <td id="salarioTopePrimaAntiguedad">${array[0].salario_minimo_general * 2}</td>
            <td>DIAS IMSS:</td>
            <td id="diasImss" >${array[0].dias_a_pagar}</td>
            <td>ACUM INCAPACIDADES:</td>
            <td></td>
        </tr>
        <tr>
            <td>ANTIGÜEDAD:</td>
            <td id="tdAntiguedad"></td>
            <td>UMA:</td>
            <td><input type="text" value="${array[0].uma}" oninput="soloDigito('uma')" onblur="guardaCambiosPropiedades('uma')" id="uma"></td>
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
            <td><input type="text" value="${array[0].salario_minimo_general}" oninput="soloDigito('salario_minimo_general')" onblur="guardaCambiosPropiedades('salario_minimo_general')" id="salario_minimo_general"></td>
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
            <td><input type="text" value="${array[0].dias_a_pagar}" onchange="diasPagar()" oninput="soloDigito('dias_a_pagar')" onblur="guardaCambiosPropiedades('dias_a_pagar')" id="dias_a_pagar"></td>
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
            <td><input type="text" value="${array[0].horas_turno}" oninput="soloDigito('horas_turno')" onblur="guardaCambiosPropiedades('horas_turno')" id="horas_turno"></td>
            <td>VALES DESPENSA SEM:</td>
            <td></td>
            <td>ACUM EXENTO PRIMA VAC:</td>
            <td></td>
        </tr>
        <tr>
            <td>DIAS AGUINALDO:</td>
            <td id="dias_aguinaldo"></td>
            <td>FALTAS DEL PERIODO:</td>
            <td><input type="text" value="${array[0].faltas_periodo}" oninput="soloDigito('faltas_periodo')" onblur="guardaCambiosPropiedades('faltas_periodo')" id="faltas_periodo"></td>
            <td>FONDO AHORRO QNA:</td>
            <td></td>
            <td>ACUM EXENTO AGUINALDO:</td>
            <td></td>
        </tr>
        <tr>
            <td>DIAS PRIMA VACACIONAL:</td>
            <td id="diasPrimaVacacional"></td>
            <td>INCAPACIDADES:</td>
            <td><input type="text" value="${array[0].incapacidades}" oninput="soloDigito('incapacidades')" onblur="guardaCambiosPropiedades('incapacidades')" id="incapacidades"></td>
            <td>FONDO AHORRO SEM:</td>
            <td></td>
            <td>BASE GRAVABLE PENDIENTE:</td>
            <td></td>
        </tr>
        <tr>
            <td>DIAS VACACIONES:</td>
            <td id="diasVacaciones"></td>
            <td>DIAS PARA VALES DESPENSA EFECTIVO:</td>
            <td><input type="text" value="${array[0].dias_vales_despensa_efectivo}" oninput="soloDigito('dias_vales_despensa_efectivo')" onblur="guardaCambiosPropiedades('dias_vales_despensa_efectivo')" id="dias_vales_despensa_efectivo"></td>
            <td>CUOTA SINDICAL:</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>PRESTACION VACACIONES:</td>
            <td><input type="text" value="${array[0].prestacion_vacaciones}" oninput="soloDigito('prestacion_vacaciones')" onblur="guardaCambiosPropiedades('prestacion_vacaciones')" id="prestacion_vacaciones"></td>
            <td>DIAS PARA VALES DESPENSA ESPECIE:</td>
            <td><input type="text" value="${array[0].dias_vales_despensa_especie}" oninput="soloDigito('dias_vales_despensa_especie')" onblur="guardaCambiosPropiedades('dias_vales_despensa_especie')" id="dias_vales_despensa_especie"></td>
            <td>PENSION ALIMENTICIA:</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>PRESTACION PV:</td>
            <td><input type="text" value="${array[0].prestacion_pv}" oninput="soloDigito('prestacion_pv')" onblur="guardaCambiosPropiedades('prestacion_pv')" id="prestacion_pv"></td>
            <td>ANTIGÜEDAD PARA 20 DIAS:</td>
            <td id="antiguedadVeinteDias"></td>
            <td>BONO DE PUNTUALIDAD:</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>PRESTACION AGUINALDO:</td>
            <td><input type="text" value="${array[0].prestacion_aguinaldo}" oninput="soloDigito('prestacion_aguinaldo')" onblur="guardaCambiosPropiedades('prestacion_aguinaldo')" id="prestacion_aguinaldo"></td>
            <td>UMI:</td>
            <td><input type="text" value="${array[0].umi}" oninput="soloDigito('umi')" onblur="guardaCambiosPropiedades('umi')" id="umi"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>DIAS DEL AÑO:</td>
            <td><input type="text" value="${array[0].dias_año}" oninput="soloDigito('dias_año')" onblur="guardaCambiosPropiedades('dias_año')" id="dias_año"></td>
            <td>SEPTIMO DIA:</td>
            <td>
            <select class="" name="septimo_dia" id="">
                <option value="SI">SI</option>
                <option value="NO">NO</option>
            </select>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
`
document.getElementById('table_Propiedades').innerHTML = tabla;
}