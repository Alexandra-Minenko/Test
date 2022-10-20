import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Button from '../../common/Button/Button';

import './Form.scss'

const Form = () => {
  let token = '';

  const { 
    register, 
    formState: { errors, isValid }, 
    handleSubmit,
    reset
  } = useForm({
    mode: 'onBlur',
    shouldFocusError: true
  });

  const onSubmit = (data) => {
    postData (data);
    reset()
}

const [positions, setPositions] = useState([])

  React.useEffect(() => {
    getPositions();
    getToken()
  }, [])

  function getToken() {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token') 
    .then(function(response) { return response.json(); }) 
    .then(function(data) { 
      token = data.token }) 
    .catch(function(error) { console.log(error) });
  }

  function getPositions() {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions') 
    .then(function(response) { return response.json(); }) 
    .then(function(data) {
      setPositions([...data.positions])   
      })
  }

  function postData (data) {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', 
          { method: 'POST', body: JSON.stringify(data), 
            headers: {'Token': JSON.stringify(token)}}) 
    .then(function(response) { return response.json(); }) 
    .then(function(data) { console.log(data); 
      if(data.success) {  
        console.log('User aded!')
      } else {
        console.log('something went wrong!')
       } }) 
  }
  
  let $ = require('jquery');
  window.$ = window.jQuery = $;

  $('.input-file input[type=file]').on('change', function(){
    let file = this.files[0];
    $(this).closest('.input-file').find('.input-file-text').html(file.name);
  });


  return (       
    <div className='form'>
      <h2>Working with POST request</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='listInputs'>
          <label>
            <span>Your name</span>
            <input type='text'
              {...register('name', 
                {
                  required: 'Required field',
                  pattern: {
                  value: /^[A-Za-z]+$/i,
                  message:'Incorrect format'
                }
                })} 
              placeholder='Your name'/>
              <div>
              {errors?.name && <p>{errors?.name.message || 'Error!'}</p>}
              </div>
          </label>         
          <label>
            <span>Email</span>
            <input type='email'
            {...register('email', 
              {
                required: 'Required field',
                pattern: {
                value: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i,
                message:'Incorrect format'
              }
              })}
            placeholder='Email'/>
            <div>
              {errors?.email && <p>{errors?.email.message || 'Error!'}</p>}
            </div>
          </label>
          <label>
            <span>Phone</span>
            <input type="tel" 
              {...register('phone', 
              {
                required: 'Required field',
                pattern: {
                value: /^[\+]{0,1}380([0-9]{9})$/i,
                message:'Incorrect format, you should use +38 (XXX) XXX-XX-XX'
              }
              })}
              placeholder='Phone'/>
            <div>
              {errors?.phone && <p>{errors?.phone.message || 'Error!'}</p>}
            </div>
          </label>
        </div>
        <div className='radioBtns'>
          <p>Select your position</p>
          <div className='radioBtnsList'>
            {
              positions.map(position => 
                <label className='custom-radio' key= {position.id}>
                  <input type='radio' className='radio' id={position.id}
                    {...register('position_id', {
                      required: true
                    })} value={position.id}
                  />
                  <span>{position.name}</span>
                </label>
              )
            }
          </div>  
        </div>
        <label className="input-file">      
          <div>
            <span className="input-file-btn">Upload</span>
            <input type="file" 
                  name="file" 
                  accept='image/png, image/jpeg'  
                  {...register('photo', 
                  {
                    required: 'Required field',
                  })} 
                  />
            <span className="input-file-text" type="text">Upload your photo</span>
          </div>
          <div className='error'>
            {errors?.photo && <p>{errors?.photo.message || 'Error!'}</p>}
          </div>              
        </label>
        <div className='btn'>
          <Button type='submit' disabled={!isValid}>Sign up</Button>
        </div>
      </form>
    </div>
  );
};

export default Form;