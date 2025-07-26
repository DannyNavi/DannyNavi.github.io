import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function AddHairService(){
const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('/api/clients')
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error('Failed to fetch clients:', err));
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      type: 'hair service',
      client: data.clientId,
      date: data.date,
      comments: data.comments,
      hairServiceDetails: {
        service: data.service
      },
    };
    console.log(payload)

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Submission failed:', errorData);
      } else {
        const result = await res.json();
        navigate('/clientbook');
      }
    } catch (error) {
      console.error('Failed to submit hair service:', error);
    }
  };

  return(
    <div>
         <h2>Hair Service</h2>
            <form className="clientform" onSubmit={handleSubmit(onSubmit)}>
                <div>
                <label>Client:</label>
                <select {...register('clientId', { required: 'Client is required' })}>
                    <option value="">Select a client</option>
                    {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                        {client.name}
                    </option>
                    ))}
                </select>
                {errors.clientId && <p>{errors.clientId.message}</p>}
            </div>


            
            <div>
                <label>Date:</label>
                <input
                    type="date"
                    {...register('date', { required: 'Date is required' })}
                />
                {errors.date && <p>{errors.date.message}</p>}
            </div>

              <div>
                <label>Hair Service:</label>
                    <select {...register('service', { required: 'Service is required' })}>
                        <option value="haircut">Haircut</option>
                        <option value="haircut and style">Haircut and Style</option>
                        <option value="shampoo and haircut">Shampoo and Haircut</option>

                    </select>
                    {errors.location && <p>{errors.location.message}</p>}
                </div>

            <div>
                <label>Comments:</label>
                <textarea {...register('comments')} />
            </div>

            <button type="submit">Submit Hair Service</button>


            </form>

            
    </div>
  )
}

export default AddHairService