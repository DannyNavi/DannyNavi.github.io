import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function AddWaxService(){
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
        type: 'wax',
        client: data.clientId,
        date: data.date,
        comments: data.comments,
        treatmentTypes: "wax",
        waxDetails: {
            location: data.location,
            skinType: data.skinType
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



    return(
        <div>
            <h2>Wax</h2>
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
                <label>Location:</label>
                    <select {...register('location', { required: 'Location is required' })}>
                        <option value="">Select location</option>
                        <option value="eyebrows">Eyebrows</option>
                        <option value="lip">Lip</option>
                        <option value="chin">Chin</option>
                        <option value="body">Body</option>
                    </select>
                    {errors.location && <p>{errors.location.message}</p>}
                </div>

                <div>
                    <label>Skin Type:</label>
                        <select {...register('skinType', { required: 'Skin Type is required' })}>
                            <option value="">Select Skin Type</option>
                            <option value="normal">Normal</option>
                            <option value="sensitive">sensitive</option>
                        </select>
                        {errors.skinType && <p>{errors.skinType.message}</p>}
                </div>

                <button type="submit">Submit Wax Service</button>

                </form>
        </div>
    )
}

export default AddWaxService