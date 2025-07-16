import React, { useEffect, useState } from 'react';

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
        <div key={client._id} className="client-card" style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
          <h2>{client.name}</h2>
          <p><strong>Email:</strong> {client.email}</p>
          <p><strong>Address:</strong> {client.address}</p>
          <p><strong>City:</strong> {client.city}</p>
          <p><strong>State:</strong> {client.state}</p>
          <p><strong>ZIP:</strong> {client.zip}</p>
          <p><strong>Cell:</strong> {client.cell}</p>
          <p><strong>Allergies:</strong> {client.allergies || 'None'}</p>
          <p><strong>Birthday:</strong> {client.birthday}</p>
        </div>
      ))}
    </div>
  );
}

export default ClientBook;
