import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PokemonsList from '../components/PokemonsList'
import { paginationLogic } from '../helpers/paginationLogic'
import './styles/Pokedex.css'

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([])
  const [pokemonsFilter, setPokemonsFilter] = useState([])
  const [types, setTypes] = useState([])
  const [namePokemon, setNamePokemon] = useState('')
  const [pokemonType, setPokemonType] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const trainerName = useSelector(state => state.trainerName)

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = e.target.namePokemon.value
    setNamePokemon(name)
  }

  const handleChangeInput = (e) => {
    setPokemonType(e.target.type)
  }

  const {lastPage, pagesInBlock, pokemonsInPage} = paginationLogic(currentPage, pokemonsFilter)

  const handleClickPage = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleNextPage = () => {
    const newPage = currentPage +1
    if(newPage > lastPage){
      setCurrentPage(1)
    }else{
      setCurrentPage(newPage)
    }
  }

  const handlePreviousPage = () => {
    const newPage = currentPage - 1
    if(newPage < 1){
      setCurrentPage(lastPage)
    }else{
      setCurrentPage(newPage)
    }
  }

  const handleFirstPage = () => {
    setCurrentPage(1)
  }

  const handleLastPage = () => {
    setCurrentPage(lastPage)
  }

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/${pokemonType ? `type/${pokemonType}/` : "pokemon/?limit=1154"}`
    console.log(URL)
    axios.get(URL)
      .then(res => {
        if(pokemonType){
          const newPokemons = res.data.pokemon.map(pokemon => ({
            name: pokemon.pokemon.name,
            url: pokemon.pokemon.url
          }))
          setPokemons(newPokemons)
        }else{
          setPokemons(res.data.results)
        }
      })
      .catch(err => console.log(err))
  }, [pokemonType])

  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/type/'
    axios.get(URL)
      .then(res => setTypes(res.data.results))
      .catch(err => console.log(err))
  }, [])
  
  useEffect(() => {
    const newPokemons = pokemons.filter(pokemon => pokemon.name.includes(namePokemon))
    setPokemonsFilter(newPokemons)
  }, [namePokemon, pokemons])
  
  
  return (
    <main>
      <header className='pokedex__header'>
        <h1>Pokedex</h1>
        <p>Welcome <span>{trainerName}</span>, here you can find your favorite Pokemon</p>
        <form onSubmit={handleSubmit} className='pokedex__form'>
          <div className='pokedex__search'>
            <input className='pokedex__input' type="text" id='namePokemon' />
            <button className='pokedex__btn' type='submit'>Search</button>
          </div>
          <select onChange={handleChangeInput} className='pokedex__select'>
            <option value=''>All Pokemons</option>
            {
              types.map(type => <option value={type.name} key={type.url}>{type.name}</option>)
            }
          </select>
        </form>
      </header>
      <PokemonsList pokemons={pokemonsInPage} />
      <ul className='pokedex__listPages'>
        <li onClick={handlePreviousPage}>{'<'}</li>
        <li onClick={handleFirstPage}>...</li>
        {
          pagesInBlock.map(pageInBlock => <li className={currentPage === pageInBlock ? 'actualPage' : ''} onClick={() => handleClickPage(pageInBlock)} key={pageInBlock}>{}</li>)
        }
      </ul>
      <li onClick={handleLastPage}>...</li>
      <li onClick={handleNextPage}>{'>'}</li>
    </main>
  )
}

export default Pokedex