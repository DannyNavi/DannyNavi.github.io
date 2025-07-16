import React, { useEffect, useState } from 'react';
import ClientCard from './ClientCard';

function ClientBook() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('https://dannynavi-github-io.onrender.com/api/clients') // ✅ Make sure this is the correct route
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setClients(data);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  return (
    <div className="ClientBookContainer">
      {clients.map((client) => (
        <ClientCard client={client} key={client._id}/>
      ))}
    </div>
  );
}

export default ClientBook;
