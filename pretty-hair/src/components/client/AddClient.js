import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../../styles/AddClient.css';

const ClientForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/clients/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit form');

        const result = await response.json();
        navigate('/clientbook');



    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <form className="clientform" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          autoComplete="off"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          autoComplete="off"
          {...register('email', {
            required: 'Email is required',
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
        <input
          type="text"
          autoComplete="off"
          {...register('address', { required: 'Address is required' })}
        />
        {errors.address && <p>{errors.address.message}</p>}
      </div>

      <div>
        <label>City:</label>
        <input
          type="text"
          {...register('city', { required: 'City is required' })}
        />
        {errors.city && <p>{errors.city.message}</p>}
      </div>

      <div>
        <label>State:</label>
        <input
          type="text"
          {...register('state', { required: 'State is required' })}
        />
        {errors.state && <p>{errors.state.message}</p>}
      </div>

      <div>
        <label>ZIP:</label>
        <input
          type="text"
          autoComplete="off"
          {...register('zip', {
            required: 'ZIP code is required',
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
          autoComplete="off"
          {...register('cell', {
            required: 'Cell number is required',
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

      <div>
        <label>Birthday (MM-DD):</label>
        <input
          type="text"
          autoComplete="off"
          placeholder="MM-DD"
          {...register('birthday', {
            required: 'Birthday is required',
            pattern: {
              value: /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
              message: 'Format must be MM-DD',
            },
          })}
        />
        {errors.birthday && <p>{errors.birthday.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ClientForm;
