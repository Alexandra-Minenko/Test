import React from 'react';
import img from '../../assets/success-image.svg';

import './UserRegistered.scss'

export const UserRegistered = () => {
  return (
    <div className='success-block'>
      <h2>User successfully registered</h2>
      <img className='success-image' src={img} alt='success-img' />
    </div>
  )
};