import React, { useEffect, useState } from 'react'
import './clientbookstyles.css' 

function ClientBook(){
    const [users, setUsers] = useState([]);


    useEffect(() => {
    fetch('https://dannynavi-github-io.onrender.com/api/clients') // Update this to your actual backend route
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // parse JSON from response
      })
      .then((data) => {
        setUsers(data); // set state with user data
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);


    return(
        <div className="ClientBookContainer">
            {users.map((user) => (
                <h2 key={user._id}>{user.name}</h2>
            ))}
        </div>
    )

}

export default ClientBook