import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import SpecificDyeService from "./SpecificDyeService"
import SpecificWaxService from "./SpecificWaxService"
import SpecificHairService from "./SpecificHair"
import SpecificPermService from "./SpecificPermService"

export default function AddSpecificServic(props){
    const [serviceType, setServiceType] = useState("")
    const [client, setClient] = useState(null);
    const [error, setError] = useState('');


    const { id } = useParams();
    
  useEffect(() => {
    fetch(`/api/clients/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch client');
        return res.json();
      })
      .then((data) => setClient(data))
      .catch((err) => setError(err.message));
  }, [id]);

  
    if (error) return <p>{error}</p>;
    if (!client) return <p>Loading client info...</p>;

    return (
        <div className="AddServiceContainer">
            <h2>Service for {client.name}</h2>
            <select onChange={(e) => setServiceType(e.target.value)} value={serviceType}>
                <option value="">Select service type</option>
                <option value="perm">Perm</option>
                <option value="color">Color</option>
                <option value="wax">Wax</option>
                <option value="hair">Hair</option>
            </select>

            {serviceType === "perm" && (
                <SpecificPermService/>
            )}
            {serviceType === "color" && (
                <SpecificDyeService/>
            )}
            {serviceType === "wax" && (
                <SpecificWaxService/>
            )}
            {serviceType === "hair" && (
                <SpecificHairService/>
            )}


        </div>
    )
}