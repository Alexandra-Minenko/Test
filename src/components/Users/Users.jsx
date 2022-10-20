import React, { useState } from 'react';
import User from './User/User';
import Button from '../../common/Button/Button';
import Loader from '../../common/Loader/Loader';

import './Users.scss';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [totalCountPages, setTotalCountPages] = useState(0);
  const [count, setCount] = useState(1);

  React.useEffect(() => {
    getUsers(count)
  }, [count])

  function getUsers(page) {
    setIsUsersLoading(true);
    fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`) 
    .then(function(response) { return response.json(); }) 
    .then(function(data) {
      
      if(data.success) {
        setUsers([...users, ...data.users]);       
        setIsUsersLoading(false);
        setTotalCountPages(data.total_pages);
      } else {
        console.log('Something went wrong!')
      }     
      })
  }
  
  const showMore = () => {
    setCount(count + 1)
   console.log(count)
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