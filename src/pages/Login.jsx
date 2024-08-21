import axios from 'axios'
import React, { useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { link } from '../components/link'
import { useNavigate } from 'react-router-dom'

function Login() {
  const userName = useRef('')
  const [login, setLogin] = useState([])
  const password = useRef('')
  const navigate = useNavigate()

  const registerPage = () => {
    navigate('/register')
  }
  const userLogin = () => {
    const login = {
      "login": userName.current.value,
      "password": password.current.value
    }


    axios.post(link + 'auth/login', login)
      .then(res => {
        setLogin(res.config.data)
        toast.success("Success")
        localStorage.setItem('token', res.data.token)
        console.log(res);
        if (res.status == 200) {
          navigate("/")
        }
        console.log(res.status);
      }).catch(err => {
        toast.error("User Not Found")
        console.error(err);
      })
  }
  return (
    <div className='relative flex items-center justify-center top-24 container mx-auto'>
      <div className='w-[500px] h-[530px] border px-20'>
        <div className='flex justify-center items-center py-5'>
          <h1 className='text-3xl text-white'>Login</h1>
        </div>
        <div className='flex flex-col gap-3'>
          <div>
            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
            <input ref={userName} type="text" id="small-input" class="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div>
            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input ref={password} type="text" id="small-input" class="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <button type="reset" onClick={userLogin} className='btn w-[350px] rounded-3xl text-white bg-orange-400 py-3 border'>Sign in</button>
          <div className='flex justify-between '>
            <button onClick={registerPage} className='px-5 py-2 border rounded-full text-white'>Create account</button>
            <button className='underline text-blue-900 hover:text-blue-600'>Forgot password?</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login