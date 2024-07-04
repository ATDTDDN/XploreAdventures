import React from 'react'
import Navbar from '@/components/Layout/Navbar'
import LoginRegisterForm from '@/components/Layout/LoginRegisterForm'
import useAuth from '@/components/Hooks/useAuth';

const index = () => {
  const { auth } = useAuth();

  const onSubmitRegister = async (data) => {
    const res = await auth("register", data);
    return res;
  }

  const onSubmitLogin = async (data) => {
    const res = await auth("login", data);
    return res;
  }

  return (
    <div>
      <Navbar />
      <LoginRegisterForm onSubmitRegister={onSubmitRegister} onSubmitLogin={onSubmitLogin} />
    </div>
  )
}

export default index