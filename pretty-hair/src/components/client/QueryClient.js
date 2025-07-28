import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function QueryClient() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/clients/${id}`)
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
    <div>
      <h2>{client.name}</h2>
      <p>Phone: {client.cell}</p>
      <p>Email: {client.email}</p>
    </div>
  );
}