import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ClientFromPhone(){

 const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://dannynavi-github-io.onrender.com/api/clients/getClientFromPhone/${phone}`);
      if (!res.ok) throw new Error('Client not found');
      const data = await res.json();
      navigate(`/viewclient/${data.clientId}`);
      console.log(data)
    } catch (err) {
      setError('Client not found.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter phone number"
      />
      <button type="submit">Find Client</button>
      {error && <p>{error}</p>}
    </form>
  );
}
export default ClientFromPhone