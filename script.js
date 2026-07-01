// ==========================
// VARIABLES
// ==========================

const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");
const meta = document.getElementById("meta");
const carta = document.getElementById("carta");

const btnInicio = document.getElementById("btnInicio");
const btnCarta = document.getElementById("btnCarta");

const puzzle = document.getElementById("puzzle");

let piezas = [];
let seleccionada = null;

// ==========================
// CAMBIAR PANTALLAS
// ==========================

function mostrarPantalla(pantalla){

    document.querySelectorAll(".pantalla").forEach(seccion=>{

        seccion.classList.remove("activa");

    });

    pantalla.classList.add("activa");

}

// ==========================
// BOTÓN COMENZAR
// ==========================

btnInicio.addEventListener("click",()=>{

    mostrarPantalla(juego);

    crearPuzzle();

});

// ==========================
// BOTÓN CARTA
// ==========================

btnCarta.addEventListener("click",()=>{

    mostrarPantalla(carta);

    document.querySelector(".papel").classList.add("abrir");

});

// ==========================
// CREAR PUZZLE
// ==========================

function crearPuzzle(){

    puzzle.innerHTML="";
    piezas=[];

    for(let i=0;i<9;i++){

        piezas.push(i);

    }

    mezclar();

    dibujar();

}

// ==========================
// MEZCLAR
// ==========================

function mezclar(){

    for(let i=piezas.length-1;i>0;i--){

        let j=Math.floor(Math.random()*(i+1));

        let temp=piezas[i];

        piezas[i]=piezas[j];

        piezas[j]=temp;

    }

}

// ==========================
// DIBUJAR PIEZAS
// ==========================

function dibujar(){

    puzzle.innerHTML="";

    piezas.forEach((valor,index)=>{

        const pieza=document.createElement("div");

        pieza.classList.add("pieza");

        pieza.dataset.valor=valor;

        pieza.dataset.indice=index;

        let fila=Math.floor(valor/3);
        let columna=valor%3;

        const tamaño = 360 / 3;

        pieza.style.backgroundPosition =
        `${-columna * tamaño}px ${-fila * tamaño}px`;

        pieza.addEventListener("click",seleccionar);

        puzzle.appendChild(pieza);

    });

}

// ==========================
// SELECCIONAR PIEZA
// ==========================

function seleccionar(){

    // Primera pieza seleccionada
    if(seleccionada==null){

        seleccionada=this;

        this.style.border="3px solid red";

        return;

    }

    // Si vuelve a tocar la misma pieza
    if(seleccionada===this){

        this.style.border="1px solid #222";

        seleccionada=null;

        return;

    }

    // Intercambiar posiciones
    let i1=Number(seleccionada.dataset.indice);
    let i2=Number(this.dataset.indice);

    let temp=piezas[i1];

    piezas[i1]=piezas[i2];

    piezas[i2]=temp;

    seleccionada=null;

    dibujar();

    comprobar();

}

// ==========================
// COMPROBAR SI GANÓ
// ==========================

function comprobar(){

    for(let i=0;i<piezas.length;i++){

        if(piezas[i]!=i){

            return;

        }

    }

    // Si llegó aquí, ganó
     confeti();

     setTimeout(()=>{

         mostrarPantalla(meta);

     },1500);

}

// ==========================
// EFECTO CONFETI
// ==========================

function confeti(){

    for(let i=0;i<80;i++){

        let papel=document.createElement("div");

        papel.className="confeti";

        papel.style.left=Math.random()*100+"vw";

        papel.style.animationDelay=Math.random()+"s";

        papel.style.animationDuration=(2+Math.random()*3)+"s";

        document.body.appendChild(papel);

        setTimeout(()=>{

            papel.remove();

        },5000);

    }

}