import React, { useEffect, useState } from 'react';
import "../../styles/ClientServiceLog.css";
import { useNavigate } from 'react-router-dom';


function ClientServiceLog({ clientId }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]); // array of selected types
  
  const navigate = useNavigate
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

  const formatDate = (date) => new Date(date).toISOString().split("T")[0];

  const renderComments = (comments) => (
    comments ? (
      <>
        <strong>Comments:</strong> {comments} <br />
      </>
    ) : null
  );

  const deleteService = async (id) => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });

      navigate(`/viewclient/${clientId}`)
      if(!res.ok) throw new Error('Failed to delete service');
      } catch (err) {
      console.error(err );
      console.log(id)

    }

  };

  const renderServiceDetails = (service) => {
    const { type, permDetails, dyeDetails, waxDetails, hairServiceDetails, comments } = service;

    switch (type) {
      case 'perm':
        if (!permDetails) return null;
        return (
          <div className="PermServiceContainer">
            <strong>Hair Condition:</strong> {permDetails.hairCondition} <br />
            <strong>Scalp Condition:</strong> {permDetails.scalpCondition} <br />
            <strong>Porosity:</strong> {permDetails.porosity} <br />
            <strong>Perm Type:</strong> {permDetails.type} <br />
            {renderComments(comments)}
          </div>
        );

      case 'color':
        if (!dyeDetails) return null;
        return (
          <div className="DyeServiceContainer">
            <strong>Scalp Condition:</strong> {dyeDetails.scalpCondition} <br />
            <strong>Porosity:</strong> {dyeDetails.porosity} <br />
            <strong>Dye Type:</strong> {dyeDetails.type} <br />
            <strong>Color Treatment:</strong> {dyeDetails.colorTreatment} <br />
            {renderComments(comments)}
          </div>
        );

      case 'wax':
        if (!waxDetails) return null;
        return (
          <div className="WaxServiceContainer">
            <strong>Location:</strong> {waxDetails.location} <br />
            <strong>Skin Type:</strong> {waxDetails.skinType} <br />
            {renderComments(comments)}
          </div>
        );

      case 'hair service':
        if (!hairServiceDetails) return null;
        return (
          <div className="HairServiceContainer">
            <strong>Service:</strong> {hairServiceDetails.service} <br />
            {renderComments(comments)}
          </div>
        );

      default:
        return null;
    }
  };

  const handleCheckboxChange = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const allServiceTypes = ['perm', 'color', 'wax', 'hair service'];

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>Error: {error}</p>;
  if (services.length === 0) return <p>No services found for this client.</p>;

  return (
    <div>
      <h2>Services</h2>

      <div className="ServicesBoxContainer">
        {allServiceTypes.map(type => (
          <label key={type} style={{ display: 'block' }}>
            <input
              className="typesBox"
              type="checkbox"
              value={type}
              checked={selectedTypes.includes(type)}
              onChange={() => handleCheckboxChange(type)}
            />
            <span className="types">
            {type[0].toUpperCase() + type.slice(1)}
            </span>
          </label>
        ))}
      </div>

      <ul>
        {selectedTypes.length > 0 &&
          services
            .filter(service => selectedTypes.includes(service.type))
            .map(service => (
              <li key={service._id}>
                <div>
                  <button className="deleteButton" onClick={() => deleteService(service._id)}>×</button>
                  <div className='topLine'>
                    <strong>Type:</strong> {service.type} <br />
                    <strong>Date:</strong> {formatDate(service.date)} <br />
                  </div>
                </div>
                {renderServiceDetails(service)}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default ClientServiceLog;
