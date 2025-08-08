import { useEffect, useState } from 'react';
import ClientCard from './ClientCard';
import "../../styles/clientbookstyles.css" 

function ClientBook() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('/api/clients') // ✅ Make sure this is the correct route
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
