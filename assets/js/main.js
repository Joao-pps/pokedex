const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const statusPokemons = document.getElementById("status");


const limit = 10;
let offset = 0;
let maxRecord = 151;  //quantidades de pokemons da primeira geração

// function status(pokemon) {
//     return ` 
//     <span class="number">${pokemon.number}</span>
//     <span class="name">${pokemon.name}</span>
//         <li class="lista-box">
//             <img class="article__imagem" src="${pokemon.photo}" alt="${pokemon.name}">
//             <ol class="lista-status">
//                 ${pokemon.status.map((stats) => `<li>${stats.name} <span>${stats.base_stat}</span></li>`).join('')}
//             </ol>
//         </li>`
// }

function loadPokemonsItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

        const newHtmlStatus = pokemons.map((teste) => `
            <span class="number">${teste.number}</span>
            <span class="name">${teste.name}</span>
        <li class="lista-box">
            <img class="article__imagem" src="${teste.photo}" alt="${teste.name}">
            <ol class="lista-status">
                ${teste.status.map((stat) => `<li>${stat.stat.name}: <span>${stat.base_stat}</span></li>`).join('')}
            </ol>
        </li>
        `).join('')

        const newHtml = pokemons.map((pokemon) => `
            <article class="pokemon ${pokemon.type} pokemon__${pokemon.name}">
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
        pokemonList.onclick = function () {
            preeStatus()
        }
        // console.log(teste)
        console.log()
        function preeStatus() {
            statusPokemons.innerHTML = newHtmlStatus
            statusPokemons.classList.toggle("display");
        }
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







