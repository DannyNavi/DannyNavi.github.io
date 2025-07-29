import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams} from 'react-router-dom';

export default function SpecificDyeService() {
  const navigate = useNavigate();
  
  const { id } = useParams();

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
      type: 'color',
      client: id,
      date: data.date,
      comments: data.comments,
      dyeDetails: {
        scalpCondition: Number(data.scalpCondition),
        porosity: data.porosity,
        colorTreatment: data.colorTreatment, // semi, toned, highlights, etc.
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
      console.error('Failed to submit dye service:', error);
    }
  };

  return (
    <div>
      <h2>Coloring</h2>
      <form className="clientform" onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label>Date:</label>
          <input
            type="date"
            {...register('date', { required: 'Date is required' })}
          />
          {errors.date && <p>{errors.date.message}</p>}
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
          <label>Color Treatment:</label>
          <select
            {...register('colorTreatment', {
              required: 'Color treatment is required',
            })}
          >
            <option value="">Select treatment</option>
            <option value="semi permanent">Semi-Permanent</option>
            <option value="toned">Toned</option>
            <option value="highlights">Highlights</option>
            <option value="lowlights">Lowlights</option>
            <option value="bleached">Bleached</option>
            <option value="henna">Henna</option>
            <option value="base">Base</option>
            <option value="other">Other</option>
          </select>
          {errors.colorTreatment && <p>{errors.colorTreatment.message}</p>}
        </div>

        <div>
          <label>Comments:</label>
          <textarea {...register('comments')} />
        </div>

        <button type="submit">Submit Color Service</button>
      </form>
    </div>
  );
}
