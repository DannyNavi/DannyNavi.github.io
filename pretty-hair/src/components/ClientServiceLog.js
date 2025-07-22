import React, { useEffect, useState } from 'react';


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
        const response = await fetch(`/api/services?client=${clientId}`);
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
      <h3>Services for Client {clientId}</h3>
      <ul>
        {services.map(service => (
          <li key={service._id}>
            <strong>Type:</strong> {service.type} <br />
            <strong>Date:</strong> {new Date(service.date).toLocaleDateString()} <br />
            {service.comments && (
              <>
                <strong>Comments:</strong> {service.comments} <br />
              </>
            )}
            {/* You can add permDetails or dyeDetails display here as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default ClientServiceLog