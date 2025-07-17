import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../styles/AddClient.css'

function EditClient(){
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        fetch(`https://dannynavi-github-io.onrender.com/api/clients/${id}`)
        .then(res => res.json())
        .then(data => {
            // Populate only editable fields
            ['email','address','city','state','zip','cell','allergies','services']
            .forEach(field => setValue(field, data[field] || ''));
        })
        .catch(err => console.error(err));
    }, [id, setValue]);

    const onSubmit = data => {
        fetch(`https://dannynavi-github-io.onrender.com/api/clients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        })
        .then(res => {
            if (!res.ok) throw new Error('Update failed');
            navigate('/clientbook');
        })
        .catch(err => alert(err.message));
    };
    return(
<form className="clientform" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
    <div>
        <label>Email:</label>
        <input
        type="email"
        {...register('email', {
            pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email address',
            },
        })}
        />
        {errors.email && <p>{errors.email.message}</p>}
    </div>

    <div>
        <label>Address:</label>
        <input type="text" {...register('address')} />
        {errors.address && <p>{errors.address.message}</p>}
    </div>

    <div>
        <label>City:</label>
        <input type="text" {...register('city')} />
        {errors.city && <p>{errors.city.message}</p>}
    </div>

    <div>
        <label>State:</label>
        <input type="text" {...register('state')} />
        {errors.state && <p>{errors.state.message}</p>}
    </div>

    <div>
        <label>ZIP:</label>
        <input
        type="text"
        {...register('zip', {
            pattern: {
            value: /^\d{5}$/,
            message: 'ZIP must be 5 digits',
            },
        })}
        />
        {errors.zip && <p>{errors.zip.message}</p>}
    </div>

    <div>
        <label>Cell:</label>
        <input
        type="tel"
        {...register('cell', {
            pattern: {
            value: /^[0-9\-+\s()]{7,15}$/,
            message: 'Invalid phone number',
            },
        })}
        />
        {errors.cell && <p>{errors.cell.message}</p>}
    </div>

    <div>
        <label>Allergies:</label>
        <input type="text" {...register('allergies')} />
        {errors.allergies && <p>{errors.allergies.message}</p>}
    </div>

    <button type="submit">Save Changes</button>
    </form>
    );
}

export default EditClient