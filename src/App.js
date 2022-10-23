import React, { useState } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {AuthContext} from './context';
import Header from "./components/Header/Header";
import HeroBlock from "./components/HeroBlock/HeroBlock";
import Users from "./components/Users/Users";
import Form from "./components/Form/Form";
import { UserRegistered } from "./components/UserRegistered/UserRegistered";

import './App.scss';

function App() {
  const [users, setUsers] = useState([]);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [totalCountPages, setTotalCountPages] = useState(0);
  const [count, setCount] = useState(1);
  const [newUser, setNewUser] = useState({})
  
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

  return (
    <div className="App">
      <AuthContext.Provider value={{
        users,
        setUsers,
        isUsersLoading,
        setIsUsersLoading,
        totalCountPages,
        setTotalCountPages,
        count,
        setCount,
        newUser, 
        setNewUser
      }}>
        <BrowserRouter>
          <div className="wrap">
              <Header/>
              <HeroBlock/>
              <Users />
              <Routes>
                <Route path='/' element={<Form getUserFunction={getUsers}/>}/>
                <Route path='/userRegistered' element={<UserRegistered />}/>              
              </Routes>          
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
