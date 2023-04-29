# Pokedex

Quem não conhece a famossima Pokedex, que era nada mais que uma ferramenta de identificação de pokemons do anime Pokemon. 
Por meio disso a plataforma DIO nos proporcionou um projeto que se asemelhe a uma pokedex, nesse projeto foi utlizado uma
**API** onde contem todos os dados dos pokemons tudo listado e bastante **JavaScript**.
## Documentação da API

#### Retorna todos os itens

```http
  GET pokeapi.co/api/v2/pokemon
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `pokeapi.co` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um item

```http
  GET pokeapi.co/api/v2/pokemon/{id or name}/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id` ou `name`      | `string` | **Obrigatório**. O ID ou Name do item que você quer |
## Demonstração

https://pokedex-sigma-blond.vercel.app/
