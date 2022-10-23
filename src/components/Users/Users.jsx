import React, { useContext } from 'react';
import User from './User/User';
import Button from '../../common/Button/Button';
import Loader from '../../common/Loader/Loader';

import './Users.scss';
import { AuthContext } from '../../context';

const Users = () => {
  const {users, 
        isUsersLoading,
        totalCountPages,
        count, setCount} = useContext(AuthContext);
  
  const showMore = () => {
    setCount(count + 1)
  }

  return (       
    <div className='users'>
      <h2>Working with GET request</h2>
      <div className='userList'>
        {
          isUsersLoading 
          ? <Loader/>
          :
          users.map(user =>
            <User isUsersLoading = {isUsersLoading} user = {user} key={user.id}/>
          )
        }
      </div>
      {
        count === totalCountPages 
        ? <span></span>
        : <Button onClick={showMore}>Show more</Button>
      }
    </div>
  );
};

export default Users;