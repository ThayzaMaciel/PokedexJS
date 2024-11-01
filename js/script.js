const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    try {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(!APIResponse.ok) {
        throw new Error ('Erro na resposta da API')
    }

    if(APIResponse.status === 200) {

    const data = await APIResponse.json()
    return data
    
    }

}

    catch (error) {
        console.error('Error no servidor', error.message)
        return null
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'carregando...'
    pokemonNumber.innerHTML = ''


    const data = await fetchPokemon(pokemon)
    pokemonNumber.innerHTML = ''

    if(data) {
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    pokemonImage.style.display = 'block'
    searchPokemon = data.id
    }
    else{
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Não encontrado'
        pokemonNumber.innerHTML = ''
    }
}



form.addEventListener('submit', (event) => {

    event.preventDefault()

    renderPokemon(input.value.toLowerCase())
    input.value = ''

})

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

buttonNext.addEventListener('click', () => {

    searchPokemon += 1
    renderPokemon(searchPokemon)

})

renderPokemon(searchPokemon)