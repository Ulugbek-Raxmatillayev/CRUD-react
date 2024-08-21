import React, { useEffect } from 'react'
import Table from '../components/Table'
import { useNavigate } from 'react-router-dom'
import Login from './Login'
import Header from '../components/Header'

function Home() {

  let navigater = useNavigate()


  useEffect(() => {
    checkIsLogin()
  },[])

  const checkIsLogin = () => {
    const token = localStorage.getItem('token')
    console.log(token);
    if (!token) {
      navigater('/login')
    }
  }

  const navigate = useNavigate()
  if (Login == false) {
    navigate("/login")

  }
  return (
    <div>
      <Header />
      <Table />
    </div>
  )
}

export default Home