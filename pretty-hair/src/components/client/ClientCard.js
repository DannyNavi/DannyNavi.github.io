import {Link, Navigate} from "react-router-dom";
import ClientServiceLog from "./ClientServiceLog";
import { GoTrash } from "react-icons/go";
import { FaEdit } from "react-icons/fa";
import "../../styles/ClientCard.css"


function ClientCard(props){
    const client = props.client

    const deleteClient = async (id) => {
        try {
            const res = await fetch(`/api/clients/${id}`, {
                method: 'DELETE',
            });

            window.location.reload()

            if (!res.ok) throw new Error('Failed to delete client');
            } catch (err) {
            console.error(err);
            alert('An error occurred while deleting the client');
        }
    };

    return(
        <div key={client._id} className="client-card" style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
            <button className="deleteButton" onClick={() => deleteClient(client._id)}><GoTrash style={{paddingTop: "4px"}}/></button>
                <div className="editButtonContainer">
                    <Link to={`/editclient/${client._id}`}>
                        <button className="editButton" ><FaEdit /></button>
                    </Link>
                </div>
            <h2 >{client.name}

            </h2>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Cell:</strong> {client.cell}</p>
            <p><strong>Allergies:</strong> {client.allergies || 'None'}</p>
            <Link to={`/addspecificservice/${client._id}`}>
                <button>Add Service</button>
            </Link>
            <ClientServiceLog clientId={client._id}/>
        </div>
    )

}

export default ClientCard