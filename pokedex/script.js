document.getElementById('fetch').addEventListener('click', fetchPokemon);

function fetchPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';
    fetch(url).then((res) => res.json()).then((data) => {
        console.log(data);
        const pokemons = data.results;
        pokemons.forEach((pokemon) => {
            fetchPokemonData(pokemon);
        });
    })
}

function fetchPokemonData(pokemon) {
    let url = pokemon.url;
    fetch(url).then((res) => res.json()).then((data) => {
        console.log(data);
        const pokemon = {
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', ')
        };
        displayPokemon(pokemon);
    })
}

function displayPokemon(pokemon) {
    const container = document.getElementById('list');

    const list = document.createElement('li');

    const card = document.createElement('div');
    card.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-lg', 'flex', 'flex-col', 'justify-center', 'items-center', 'text-center', 'm-4');
    const title = document.createElement('h2');

    title.classList.add('text-2xl', 'font-bold');
    title.innerText = pokemon.name;
    card.append(title);

    const image = document.createElement('img');
    image.src = pokemon.image;


    card.append(image);

    list.append(card);

    container.append(list);
}
