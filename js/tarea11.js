let arraySource = [];
let $imgArray = [];
let contador = 0;
let numeroDeAciertos = 0;
const $tablero = document.querySelector('#cont-padre');


function mezclarBanderas() {

let banderaUruguay = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/270px-Flag_of_Uruguay.svg.png';
let banderaArgentina = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png';
let banderaPeru = 'https://i.pinimg.com/474x/73/ed/68/73ed68f4b56bfad49d143dbc23b04083.jpg';
let banderaChile = 'https://www.banderas-mundo.es/data/flags/w580/cl.png';
let banderaBrasil = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/300px-Flag_of_Brazil.svg.png';
let banderaParaguay = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Flag_of_Paraguay_%281988%E2%80%931990%29.svg/300px-Flag_of_Paraguay_%281988%E2%80%931990%29.svg.png';
let banderaColombia = 'https://i.pinimg.com/564x/55/cf/08/55cf080c74c4ed02aaaba10fab30297b.jpg';
let banderaBolivia = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Bolivia.svg/264px-Flag_of_Bolivia.svg.png';
let arrayBanderas = [banderaArgentina, banderaPeru, banderaChile, banderaUruguay, banderaBrasil, banderaParaguay, banderaColombia, banderaBolivia, banderaArgentina, banderaPeru, banderaChile, banderaUruguay, banderaBrasil, banderaParaguay, banderaColombia, banderaBolivia];
let arrayIndice = [];

for(let i = 0; i < 16; i++) {
    let indice = Math.floor(Math.random() * 16); 
    
    if(arrayIndice.includes(indice) === false) { 
        arrayIndice.push(indice);
        arrayBanderas.splice(indice, 1, arrayBanderas[indice]);
        let $div = document.querySelector(`#cuadro-${indice + 1}`);
        let $img = document.createElement("img");
        $img.src = arrayBanderas[i];
        $div.appendChild($img); 
        document.querySelector(`#cuadro-${i + 1}`).className = `col ${i}`;
        } else {
            i = i - 1;
        }                                     
    }

    clickCuadros()
}
mezclarBanderas()



function clickCuadros() {

    $tablero.onclick = function(e) {
    const $elemento = e.target;
    if ($elemento.classList.contains('col')) {
        manejarCuadros();
    }

        function manejarCuadros() {
        contador ++;
        document.querySelector('#contador-intentos').innerText = `Intentos: ${contador}/30`;
        
        let cuadroPulsado = $elemento.firstElementChild;
        arraySource.push(cuadroPulsado.src);
        $imgArray.push(cuadroPulsado);

        cuadroPulsado.style.display = 'inherit'; 
        cuadroPulsado.style.transition = '500ms';

        if(arraySource[0] === arraySource[1]) {                       
                cuadroPulsado.style.display = 'inherit'    
                cuadroPulsado.style.opacity = 0.7;
                $imgArray[0].style.opacity = 0.7;
                numeroDeAciertos++;    
                arraySource.splice(0, 2);
                $imgArray.splice(0, 2);       
        } 
        
        if(arraySource.length === 2){
            setTimeout(function(){
                cuadroPulsado.style.display = 'none';
                $imgArray[0].style.display = 'none';
                arraySource.splice(0, 2);
                $imgArray.splice(0, 2);
            }, 500);
        } 

        if(numeroDeAciertos === 8) {
            cartelVictoria();
        }

        if(contador === 31) { 
            document.querySelector('.card').style.display = 'initial';
            bloquearInputUsuario()
        } 
    }
  }
}

function cartelVictoria() {
    document.querySelector('.card').style.display = 'initial';
    document.querySelector('#title-alert').innerText = 'Ganaste';
    document.querySelector('#icon').className = 'fas fa-thumbs-up';
    document.querySelector('i').style.color = '#15AABF';
}

function bloquearInputUsuario() {
    $tablero.onclick = function() {
    };
}

let min = 0;
let sec = -1;

function timer() {
    let timerId = setTimeout(function maquina() {
    document.querySelector('#minutos').innerText = '0' + min
    sec++
    document.querySelector('#segundos').innerText = ': ' + sec;
        
        if(sec <= 9) {
            document.querySelector('#segundos').innerText = ':0' + sec;
        }
        
        if(sec === 59) { 
            setTimeout(function(){ 
                min ++;      
                sec = -1;
            }, 1000);
        }
        
        timerId = setTimeout(maquina, 1000); 
        
        if(contador === 31 || numeroDeAciertos === 8) { 
            clearTimeout(timerId);
        } 
        
    }, 1000);

}
timer()

document.querySelector('#btn-reset').onclick = function(e) {
    location.reload();
}


 