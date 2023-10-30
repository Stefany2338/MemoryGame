//inicializador de variables
let tarjetasDestapadas=0;
let tarjeta1=null;
let tarjeta2=null;
let primerResultado=null;
let segundoResultado=null;
let movimientos=null;
let aciertos=0;
let temporizador=false;
let timer=60;
let timerInicial=timer;
let tiempoRegresivoId=null;

//apuntando a documentos html
let mostrarMovimientos=document.getElementById("movimientos");
let mostrarAciertos=document.getElementById("aciertos");
let mostrarTiempo=document.getElementById("t-restante");

let numeros =[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros=numeros.sort(()=>{return Math.random()-0.5})
console.log(numeros);

//funciones
function contarTiempo(){
    tiempoRegresivoId=setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML=`tiempo: ${timer} segundos` ;
        if(timer==0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        };

    },1000);
}

function bloquearTarjetas(){
    for (let i=0; i<=15; i++){
        let tarjetaBloqueada=document.getElementById(i);
        tarjetaBloqueada.innerHTML=numeros[i];
        tarjetaBloqueada.disabled=true;
    };
};

//funcion principal
function destapar(id){
    
    if (temporizador==false){
        contarTiempo();
        temporizador=true;
    };
    

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas==1){
        //mostrar el primer numero
        tarjeta1=document.getElementById(id);
        primerResultado=numeros[id];
        tarjeta1.innerHTML=numeros[id];

        //deshabilitar primer boton
        tarjeta1.disabled=true;

    }else if(tarjetasDestapadas==2){
        //mostrar segundo numero
        tarjeta2=document.getElementById(id);
        segundoResultado=numeros[id];
        tarjeta2.innerHTML=segundoResultado;
        //dehabilitar segundo boton
        tarjeta2.disabled=true;

        //incremetar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML= `movimientos: ${movimientos}`; 

        if(primerResultado==segundoResultado){
            //
            tarjetasDestapadas=0;
            //aumentar aciertos
            aciertos++
            mostrarAciertos.innerHTML= `aciertos: ${aciertos}` ;

            if(aciertos==8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML=`aciertos ${aciertos} !!!!!!`;
                mostrarTiempo.innerHTML=`yei, te demoraste:  ${timerInicial-timer} segundos`;
                mostrarMovimientos.innerHTML=`movimeintos ${movimientos} !!!!!!`;

            }
        }else{
            //mostrar valores y voltear denuevo
            setTimeout(()=>{
                tarjeta1.innerHTML=`` ;
                tarjeta2.innerHTML=`` ;
                tarjeta1.disabled=false;
                tarjeta2.disabled=false;
                tarjetasDestapadas=0;
            },600);
        }

    }


}
//  ``   