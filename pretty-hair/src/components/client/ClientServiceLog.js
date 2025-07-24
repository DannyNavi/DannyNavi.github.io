import React, { useEffect, useState } from 'react';
import "../../styles/ClientServiceLog.css"


function ClientServiceLog(props){
  const clientId = props.clientId

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!clientId) return;

    async function fetchServices() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://dannynavi-github-io.onrender.com/api/services?client=${clientId}`);
        if (!response.ok) throw new Error('Failed to fetch services');
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, [clientId]);

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>Error: {error}</p>;

  if (services.length === 0) return <p>No services found for this client.</p>;

  return (
    <div>
      <h2>Services</h2>
      <ul>
        {services.map(service => (
          <li key={service._id}>
            <strong>Type:</strong> {service.type} <br />
            <strong>Date:</strong> {new Date(service.date).toLocaleDateString()} <br />
                  {service.type === 'perm' && service.permDetails && (
        <div className='PermServiceContainer'>
          <strong>Hair Condition:</strong> {service.permDetails.hairCondition} <br />
          <strong>Scalp Condition:</strong> {service.permDetails.scalpCondition} <br />
          <strong>Porosity:</strong> {service.permDetails.porosity} <br />
          <strong>Perm Type:</strong> {service.permDetails.type} <br />
        </div>
      )}

      {service.type === 'dye' && service.dyeDetails && (
        <div className='DyeServiceContainer'>
          <strong>Scalp Condition:</strong> {service.dyeDetails.scalpCondition} <br />
          <strong>Porosity:</strong> {service.dyeDetails.porosity} <br />
          <strong>Dye Type:</strong> {service.dyeDetails.type} <br />
          <strong>Color Treatment:</strong> {service.dyeDetails.colorTreatment} <br />
        </div>
      )}

      {service.comments && (
        <>
          <strong>Comments:</strong> {service.comments} <br />
        </>
      )}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default ClientServiceLog