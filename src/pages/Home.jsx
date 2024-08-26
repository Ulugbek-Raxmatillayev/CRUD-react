import React, { useEffect } from 'react'
import Table from '../components/Table'
import { useNavigate } from 'react-router-dom'
import Login from './Login'
import Header from '../components/Header'
import { link } from '../components/link'
import axios from 'axios'

function Home() {

  let navigater = useNavigate()

  const getProduct = () => {
    let obg = {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcyNDM1MjM5MywiZXhwIjoxNzI0NDM4NzkzfQ.g2urJpP0ipdaTUmCte8XpcKGDQ7dDrcPFharPPTn6h5IAjXraKRPB6883Qf79lDJ8Rop1NxfM_SjkRSLN5dkbw'
      }
    }
    axios.get(link + 'product/list',obg)
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    })
  }

  useEffect(() => {
    getProduct()
  },[])


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