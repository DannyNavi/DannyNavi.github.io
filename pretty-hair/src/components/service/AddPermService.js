import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


function AddPermService(){
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [clients, setClients] = useState([]);

  // Fetch clients using fetch()
  useEffect(() => {
    fetch('/api/clients')
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error('Failed to fetch clients:', err));
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      type: 'perm',
      client: data.clientId,
      date: data.date,
      comments: data.comments,
      permDetails: {
        hairCondition: Number(data.hairCondition),
        scalpCondition: Number(data.scalpCondition),
        porosity: data.porosity,
        type: data.permType,
      },
    };

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
      console.error('Failed to submit service:', error);
    }
  };

  return (
    <div>
      <h2>Perm</h2>
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
          <label>Hair Condition (1-10):</label>
          <input
            type="number"
            min="1"
            max="10"
            {...register('hairCondition', {
              required: 'Hair condition is required',
              min: 1,
              max: 10,
            })}
          />
          {errors.hairCondition && <p>{errors.hairCondition.message}</p>}
        </div>

        <div>
          <label>Scalp Condition (1-10):</label>
          <input
            type="number"
            min="1"
            max="10"
            {...register('scalpCondition', {
              required: 'Scalp condition is required',
              min: 1,
              max: 10,
            })}
          />
          {errors.scalpCondition && <p>{errors.scalpCondition.message}</p>}
        </div>

        <div>
          <label>Porosity:</label>
          <select {...register('porosity', { required: 'Porosity is required' })}>
            <option value="">Select porosity</option>
            <option value="extra porous">Extra Porous</option>
            <option value="porous">Porous</option>
            <option value="normal">Normal</option>
          </select>
          {errors.porosity && <p>{errors.porosity.message}</p>}
        </div>

        <div>
          <label>Perm Type:</label>
          <select {...register('permType', { required: 'Perm type is required' })}>
            <option value="">Select type</option>
            <option value="exothermic">Exothermic</option>
            <option value="acid">Acid</option>
            <option value="alkaline">Alkaline</option>
          </select>
          {errors.permType && <p>{errors.permType.message}</p>}
        </div>

      <div>
          <label>Comments:</label>
          <textarea {...register('comments')} />
        </div>


        <button type="submit">Submit Perm Service</button>
      </form>
    </div>
  );
}

export default AddPermService