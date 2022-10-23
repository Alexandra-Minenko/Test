import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { AuthContext } from '../../context';

import './Form.scss'

const Form = (props) => {
  const {count, setCount, 
         newUser, setNewUser,
         setUsers} = useContext(AuthContext);
  const [positions, setPositions] = useState([])
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const { 
    register, 
    formState: { errors, isValid }, 
    handleSubmit,
    reset
  } = useForm({
    mode: 'all',
    shouldFocusError: true
  });

  React.useEffect(() => {
    getToken();
    getPositions();
  }, [])

  function getToken() {
    fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/token`) 
    .then(function(response) {
      return response.json()}) 
    .then(function(data) { 
      setToken(data.token)

     }) 
    .catch(function(error) { console.log(error) });
  }

  function getPositions() {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions') 
    .then(function(response) { return response.json(); }) 
    .then(function(data) {
      setPositions([...data.positions])   
      })
  }

  
  function postData(userData) {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', 
          { method: 'POST', 
            body: userData,
            headers: {'Token': JSON.stringify(token)} 
          }) 
    .then(function(response) { 
      return response.json(); }) 
    .then(function(data) {
      console.log(data);
      if(data.success) {  
        console.log('User aded!');
        setUsers([]);
        setCount(1);
        props.getUsers(1);
      } else {
        console.log('something went wrong!')
       }  
      }) 
  }

  function onSubmit(data) {

    let formData = new FormData();
    let fileField = document.querySelector('input[type="file"]');

    formData.append('position_id', data.position_id);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('photo', fileField.files[0]);

    postData (formData);
    reset();
    setNewUser({...newUser, ...data});
    navigate(`/userRegistered`)
  }
  
  let $ = require('jquery');
  window.$ = window.jQuery = $;

  $('.input-file input[type=file]').on('change', function(){

    let file = this.files[0];
    let size = this.files[0].size;

    $(this).closest('.input-file').find('.input-file-text').html(file.name);

    if(5000000 < size){
      console.log('File size should be no more than 50mb')
    }
  });

  return (       
    <div className='form'>
      <h2>Working with POST request</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='listInputs'>
          <label>
            <span className='label-item'>Your name</span>
            <input type='text' 
              {...register('name', 
                {
                  required: 'Required field',
                  minLength: {
                    value: 2,
                    message: 'Minimum 2 characters'
                  },
                  maxLength: {
                    value: 60,
                    message: 'Maximum 60 characters'
                  },
                  pattern: {
                  value: /^[A-Za-z]+$/,
                  message:'Incorrect format'
                }
                })}
              style={{ border: errors?.name && '2px solid #cb3d40'}} 
              placeholder='Your name'
              />
            <div>
            {errors?.name && <p>{errors?.name.message || 'Error!'}</p>}
            </div>
          </label>         
          <label>
            <span className='label-item'>Email</span>
            <input type='email'
            {...register('email', 
              {
                required: 'Required field',
                pattern: {
                value: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                message:'Incorrect format'
              }
              })}
              style={{ border: errors?.email && '2px solid #cb3d40'}}
            placeholder='Email'/>
            <div>
              {errors?.email && <p>{errors?.email.message || 'Error!'}</p>}
            </div>
          </label>
          <label className='label-item'>
            <span>Phone</span>
            <input type='tel' 
              {...register('phone', 
              {
                required: 'Required field',
                pattern: {
                value: /^[\+]{0,1}380([0-9]{9})$/i,
                message:'Incorrect format, you should use +38XXXXXXXXXX'
              }
              })}
              style={{ border: errors?.phone && '2px solid #cb3d40'}}
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
        <label className='input-file'>      
          <div>
            <span className='input-file-btn' 
                  style={{ border: errors?.photo && '2px solid #cb3d40'}}>
                  Upload</span>
            <input type='file' 
                  name='photo' 
                  accept='image/jpg, image/jpeg'  
                  {...register('photo', 
                  {
                    required: 'Required field',
                  })}
                  
                  />
            <span className='input-file-text' 
                  type='text' 
                  style={{ border: errors?.photo && '2px solid #cb3d40'}}>
                  Upload your photo</span>
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