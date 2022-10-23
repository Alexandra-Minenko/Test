import React from 'react';
import Button from '../../common/Button/Button';

import './Hero_block.scss'

const HeroBlock = () => {
  return (       
    <div className='img_block'>
      <div className='text'>
        <h1>Test assignment for front-end developer</h1>
        <p>What defines a good front-end developer is one 
        that has skilled knowledge of HTML, CSS, JS with 
        a vast understanding of User design thinking as 
        they'll be building web interfaces with 
        accessibility in mind. They should also be 
        excited to learn, as the world of Front-End 
        Development keeps evolving.</p>
        <Button>Sing up</Button>
      </div>
    </div>
  );
};
export default HeroBlock;