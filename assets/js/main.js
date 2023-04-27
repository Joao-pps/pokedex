/* 
    Abaixo vai ter uma função que vai ter um processamento assincrono siginificando que vai ser um processo que não vai ter uma sequencia de execução
    o seu retorno vai ser uma (promise) de uma (response), responso representa uma resposta a uma solicitação HTTP, que representara o header do meu HTTP.
*/
function pokemonConvertToHtlm(pokemon) {
    return `
        <article class="pokemon pokemon__bulbasour ${pokemon.type}">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detalhes">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type type--${pokemon.type}">${type}</li>`).join('')}
                </ol>
                <img class="article__imagem" src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </article>`
}

const pokemonList = document.getElementById("pokemonList");

pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(pokemonConvertToHtlm).join('');  //simplificando tudo.
    console.log(pokemons)
})

