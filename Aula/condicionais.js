console.log('trabalhando com condicionais');

const listaDeDestinos = new Array(
    `Salvador`,
    `São Paulo`,
    `Rio de Janeiro`
);

const idadeComprador = 15;
const estarAcompanhado = true;
const temPassagemComprada = false;

console.log('Destinos disponíveis');
console.log(listaDeDestinos);

// Se o comprador >= 18 ou < 18 e acompanhado --> Retornar boa viagem
// Se não --> Não é possível viajar

if(idadeComprador >= 18 || (idadeComprador < 18 && estarAcompanhado)) {
    console.log('Boa viagem!')
} else {
    console.log('Não é possível viajar')
}

// Se a pessoa for > 18 e tem passagem comprada --> Retornar boa viagem
// Caso não --> Não pode embarcar

if(idadeComprador >= 18 && temPassagemComprada == true || (idadeComprador < 18 && estarAcompanhado && temPassagemComprada)) {
    console.log('Boa viagem!')
} else {
    console.log('Não é possível viajar')
}