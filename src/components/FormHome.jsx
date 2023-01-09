import React from 'react'
import { useDispatch } from 'react-redux'
import { setTrainerNameGlobal } from '../store/slices/trainerName.slice'
import './styles/FormHome.css'

const FormHome = () => {

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const trainerName = e.target.trainerName.value.trim()
    dispatch(setTrainerNameGlobal(trainerName))
  }

  return (
    <form className='home__form' onSubmit={handleSubmit}>
        <input required className='home__input' type="text" id='trainerName' placeholder='Your name...' />
        <button className='home__btn'>Start</button>
    </form>
  )
}

export default FormHome