import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/ClientFromPhone.css"


function ClientFromPhone(){

 const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/clients/getClientFromPhone/${phone}`);
      if (!res.ok) throw new Error('Client not found');
      const data = await res.json();
      navigate(`/viewclient/${data.clientId}`);
      console.log(data)
    } catch (err) {
      setError('Client not found.');
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className='PhoneInputContainer'>
                <label>Phone: </label>
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                />
            </div>
            <button type="submit">Find Client</button>
            {error && <p>{error}</p>}
        </form>
    </div>
  );
}
export default ClientFromPhone