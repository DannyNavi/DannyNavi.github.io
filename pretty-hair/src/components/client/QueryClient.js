import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ClientCard from './ClientCard';
import "../../styles/clientbookstyles.css"

export default function QueryClient() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://dannynavi-github-io.onrender.com/api/clients/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch client');
        return res.json();
      })
      .then((data) => setClient(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!client) return <p>Loading...</p>;

  return (
        <div className='ClientBookContainer'>
            <ClientCard client={client} key={client._id}/>
        </div>
    )
}