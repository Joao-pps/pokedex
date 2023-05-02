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

        const newHtmlStatus = pokemons.map((status) => `
            <ul class="statusPokemon ${status.name}">
                <span class="number">${status.number}</span>
                <span class="name">${status.name}</span>
                <li class="lista-box">
                    <img class="article__imagem" src="${status.photo}" alt="${status.name}">
                    <ol class="lista-status">
                        ${status.status.map((stat) => `<li>${stat.stat.name}: <span>${stat.base_stat}</span></li>`).join('')}
                    </ol>
                </li>
            </ul>
        `).join('')
        const newHtml = pokemons.map((pokemon) => `
            <article class="pokemon ${pokemon.type} ${pokemon.name}">
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
        statusPokemons.innerHTML = newHtmlStatus;
        const htmlStatus = document.querySelectorAll(".pokemon");
        const statusCard = document.querySelectorAll(".statusPokemon");

        for (let i = 0; i < htmlStatus.length; i++) {
            const card = htmlStatus[i];
            const cardClass = card.classList[2];
            card.addEventListener("click", (e) => {
                for (let j = 0; j < statusCard.length; j++) {
                    const status = statusCard[j];
                    const statusClass = status.classList[1];
                    if (cardClass === statusClass) {
                        // o "card" clicado corresponde ao "status" atual
                        statusPokemons.innerHTML = status.outerHTML;
                        statusPokemons.classList.toggle("display");
                        break; // sai do loop de "status" após encontrar uma correspondência
                    }
                }
            });
        }

        // pokemonList.addEventListener('click', () => {
        //     preeStatus()
        // } ) 
        // function preeStatus(elemento) {
        //     statusPokemons.innerHTML = newHtmlStatus
        //     statusPokemons.classList.toggle("display");
        // }
    })

}


loadPokemonsItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNexPage = offset + limit;
    if (qtdRecordNexPage >= maxRecord) {
        const newLimit = maxRecord - offset;
        loadPokemonsItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonsItens(offset, limit)
    }
})







