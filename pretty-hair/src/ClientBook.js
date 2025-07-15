import React, { useEffect, useState } from 'react'
import './clientbookstyles.css' 

function ClientBook(){
    const [clients, setClients] = useState([]);


    useEffect(() => {
    fetch('https://dannynavi-github-io.onrender.com/api/users') // Update this to your actual backend route
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // parse JSON from response
      })
      .then((data) => {
        setClients(data); // set state with client data
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, []);


    return(
        <div className="ClientBookContainer">
            {clients.map((client) => (
                <h2 key={client._id}>{client.name}</h2>
            ))}
        </div>
    )

}

export default ClientBook