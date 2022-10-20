import React from 'react';
import Button from '../../common/Button/Button';
import { Logo } from './Logo/Logo';

import './Header.scss';


const Header = () => {
  return (       
    <div className='header'>
      <Logo/>
      <div className='btns-section'>
        <Button id='btn'>Users</Button>
        <Button>Sing up</Button>
      </div>
    </div>
  );
};

export default Header;