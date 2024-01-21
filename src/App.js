import React from 'react';
import {useForm} from 'react-hook-form'
import './App.css';
import { axiosInstance } from './API';

function App() {

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm({mode:'onChange'})

  const jsonString = JSON.stringify(axiosInstance);

  localStorage.setItem('myData', jsonString);

    const onSubmit = async(data) => {
      try {
        const response = await axiosInstance.post('/login/',data)
        console.log(response.data);
        reset()
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='sign'>Sign in</h1>
        <span>Sign in and start managing your candidates!</span>
        <input 
          {...register('username',{
            required: 'вы не ввели имя',
            minLength: {
              value: 4,
              message: 'минимум 4 символа'
            },
            maxLength: {
              value:10,
              message:'максимум 10 символов'
            }
          })}
          type="text" 
          placeholder='Login'
          className='input'
        /> 
        {errors?.username && 
          (<div>{errors.username.message}</div>)}
        <input
          {...register('password',{
            required: 'вы не ввели пароль!',
            minLength: {
              value: 4,
              message: 'минимум 4 символа'
              
            }
          })}
          type="password"
          placeholder='Password'
          className='input'
        /> 
        {errors?.password && 
          (<div>{errors.password.message}</div>)}
        <button onClick={null} className='btn'>войти</button> 

      </form>
    </div>
  );
}

export default App;
