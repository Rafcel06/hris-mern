import React from 'react'
import Logo from '../Assets/dashboard.png'
import '../App.css'
import { useForm } from 'react-hook-form';
import { faMagnifyingGlass}  from '@fortawesome/free-solid-svg-icons';
import { faEnvelope}  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";


function Forgot() {

  const form = useForm();
  const {handleSubmit,register,formState} = form
  const {errors} = formState
  const navigate = useNavigate()


  const goToLogin = () => {
    navigate('/')
    
  }

  const submit = (data) => {
     
  }

  return (
    <>
       <div className='formContainer'>
          <form className='form' onSubmit={handleSubmit(submit)}>
             <div className='form-header-container'>
                  <div className='image-container'>
                      <img className="image" src={Logo}/>
                  </div>
                  <h2 className='greet-headers'>Welcome to Human  Resource Management System</h2>
                  <p className='greet-paragraph'>Please enter your username or email address to validate your account. This access is for Credentialing Zone user only.</p>
             </div>

             <div className="inputGroup">
             <span className='icons-contain'><FontAwesomeIcon icon={faEnvelope} className='input-icons'/></span>
                <input type="text"  id='email' className='input-fields' {...register("email", 
                {
                 pattern : {
                  value : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message : "*Input a valid email"
                 },
                 required : {
                  value : true,
                  message : "*Email is required"
                 } 
                 
                })} /> 
                <label htmlFor="email" className='input-labels' >Email</label>
            </div>
            <p className='errors-message'>{errors.email?.message}</p>

            <div className='form-navigate'>
                 <p className='input-paragraph' onClick={goToLogin}>Return to Login</p>
            </div>

            <div className='form-navigate'>
                 <div></div>
                 <button id='login' type="submit">
                   <FontAwesomeIcon className="icons" icon={faMagnifyingGlass}/>
                   Search
                 </button>
            </div>

          </form>
       </div>
    </>
  )
}

export default Forgot