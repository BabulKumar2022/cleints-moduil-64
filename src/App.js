import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
   const [users, setUsers] = useState([]);
   useEffect(() =>{
     fetch('http://localhost:5000/users')
     .then(res => res.json())
     .then(data => setUsers(data));
   },[]) 
   const hadleAddUser =event =>{
     event.preventDefault();
     const name= event.target.name.value;
     const email =event.target.email.value;
     console.log(name, email);
     const user = {name, email}

     //post data  to server
     fetch('http://localhost:5000/user',{
       method: 'POST',
       headers:{
         'content-type':'application/json'
       },
       body: JSON.stringify(user)
     })
     .then(res =>res.json())
     .then(data =>{
       console.log(data)
     })
   }

  return (
    <div className="App">
      <h1>My Own Data {users.length}</h1>
      <form onSubmit={hadleAddUser}>
        <input type="text" name="name" placeholder='name' required />
        <input type="text" name="email" placeholder='email' required />
        <input type="submit" value="add user"  />
      </form>
      <ol>
        {
          users.map(user => <li key={user.id}> id: {user.id} Name: {user.name} email: {user.email}</li>)
        }
      </ol>
    </div>
  );
}

export default App;
