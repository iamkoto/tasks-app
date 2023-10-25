console.log('trabalhando com condicionais');

const listaDeDestinos = new Array(
    `Salvador`,
    `São Paulo`,
    `Rio de Janeiro`
);

const idadeComprador = 15;
const estarAcompanhado = false;
const temPassagemComprada = false;
const destino = 'São Paulo';

console.log('Destinos disponíveis');
console.log(listaDeDestinos);

const podeComprar = idadeComprador >= 18 || estarAcompanhado == true;
let contador = 0;
let destinoExiste = false;

// loop ultilizando "while"

while(contador < 3) {
    if(listaDeDestinos[contador] == destino) {
        destinoExiste = true;
        break;
    }
    contador += 1;
} 

console.log('Destino existe: ', destinoExiste);

// Uma condicional que verifica se ela pode comprar e se o destino existe 
// Se não --> !alert('erro')

if(podeComprar && destinoExiste == true) {
    console.log('Agradecemos a compra');
} else {
    console.log('Desculpe tivemos um erro');
}

// loop ultilizando "for"

for(let i = 0; i < 3 ; i++) {
    if(listaDeDestinos[i] == destino) {
        destinoExiste = true;
    } 
}

for (let i = 0; i < 5; i++) {
    (function (i) {
        setTimeout(function () {
            console.log(i)
        }, 1000);
    })(i);
}