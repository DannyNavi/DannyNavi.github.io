import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../../styles/AddClient.css'

function EditClient(){
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        fetch(`/api/clients/${id}`)
        .then(res => res.json())
        .then(data => {
            // Populate only editable fields
            ['email','cell','allergies','services']
            .forEach(field => setValue(field, data[field] || ''));
        })
        .catch(err => console.error(err));
    }, [id, setValue]);

    const onSubmit = data => {
        fetch(`/api/clients/${id}`, {
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