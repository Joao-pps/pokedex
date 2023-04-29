const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types; //fazendo um destructin, basicamente a variavel vai ficar com a primeira ocorrencia
    const pokemonImage = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokemonImage;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)  //Retorna uma requisição HTPP
    .then((response) => response.json())  //O argumento response tem o retorno da minha requisição apos isso estou convertendo para arquivo json()
    .then((jasonBody) => jasonBody.results) //O argumento contem o arquivo json() apos isso vou querer a parte expecifica results, onde esta localizado minha lista dos 10 pokemons.
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))  //Com a lista eu vou querer executar uma função em cada item da minha lista, que essa função vai criar uma nova lista onde so tem as URL em formato json() onde esta as informaçoes
    .then((detailRequest) => Promise.all(detailRequest))  //Tornando os elementos da minha lista em um Promise.
    .then((pokemonDetail) => pokemonDetail)
}
