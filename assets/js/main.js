const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 10;  
let offset = 0;
let maxRecord = 151;  //quantidades de pokemons da primeira geração

function loadPokemonsItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <article class="pokemon pokemon__bulbasour ${pokemon.type}">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detalhes">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img class="article__imagem" src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </article>`
        ).join('');  //simplificando tudo.
        pokemonList.innerHTML += newHtml
        console.log(pokemons)
    })

}

loadPokemonsItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    debugger
    const qtdRecordNexPage = offset + limit;
    if (qtdRecordNexPage >= maxRecord) {
        const newLimit = maxRecord - offset;
        loadPokemonsItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonsItens(offset, limit)
    }
}) 






