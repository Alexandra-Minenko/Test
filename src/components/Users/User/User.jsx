import React from 'react';

import './User.scss';

const User = ({user}) => {

  const cutStr = (str) => {
    if(str.length <= 25) {
      return str
    } else {
      str = str.slice(0, 25) + '...';
      return str
    }
  }
 
  return (       
    <div className='user'>
      <img className='photo' src={user.photo} alt='avatar'/>
      <div className='name'>{cutStr(user.name)}</div>
      <div className='user-data'>
        <div className='position'>{user.position}</div>
        <div className='email' data-title={user.email}>{cutStr(user.email)}</div>
        <div className='tel'>{user.phone}</div>
      </div>
    </div>
  );
};

export default User;