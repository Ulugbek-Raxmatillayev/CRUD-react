import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function BuyerPanel() {
  const navigate = useNavigate()
  const isLogged = useCallback(() => {
    let token = localStorage.getItem('token')
    if(!token) {
      navigate("/login")
    }
  },[])

  useEffect(() => {
    isLogged()
  },[])
  return (
    <div>BuyerPanel</div>
  )
}

export default BuyerPanel