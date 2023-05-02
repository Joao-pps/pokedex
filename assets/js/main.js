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
            <span class="number">${status.number}</span>
            <span class="name">${status.name}</span>
                <li class="lista-box">
                    <img class="article__imagem" src="${status.photo}" alt="${status.name}">
                     <ol class="lista-status">
                         ${status.status.map((stat) => `<li>${stat.stat.name}: <span>${stat.base_stat}</span></li>`).join('')}
                    </ol>
                </li>
        `)
        console.log(newHtmlStatus)
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
        const htmlStatus = document.querySelectorAll(".pokemon");
        for (let i = 0; i < htmlStatus.length; i++) {
            const lis = htmlStatus[i];
            for (let i = 0; i < newHtmlStatus.length; i++) {
                const ele = newHtmlStatus[i];
                console.log(ele)
            }
            lis.addEventListener("click" , (e) => {
                console.log(lis.classList[2]);
                if (lis.classList[2] === 'bulbasaur') {
                    console.log('entrou')
                    statusPokemons.innerHTML = newHtmlStatus[0];
                    statusPokemons.classList.toggle("display");
                } else {
                    console.log('erro')
                }
            })
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







