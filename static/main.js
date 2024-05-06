async function getPokeData(query){
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    console.log(response)
    return await response.json()
}

async function fetchData(event){
    event.preventDefault();
    const search = event.target.elements.pokemon.value; 
    const result = await getPokeData(search)
    console.log(result)
    displayPokemon(result)    
}

async function displayPokemon(pokemon) {
    const html = `
        <div class="card">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <div>
                <h1>${pokemon.name}</h1>
                <p>Stats: </p>
                <p>${pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</p>
                <p>Types: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
                <p>Forms: ${pokemon.forms.map(forms => forms.name).join(', ')}</p>
            </div>
        </div>
    `;
    const div = document.getElementsByClassName('search-pokemon')[0];
    div.insertAdjacentHTML('beforeend', html);
}

document.getElementById('search-form').addEventListener('submit', fetchData);

