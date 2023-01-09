import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const HomeProtected = () => {
  const trainerName = useSelector(state => state.trainerName)

  if(trainerName){
    return <Navigate to='/pokedex' />
  }else{
    return <Outlet />
  }
}

export default HomeProtected