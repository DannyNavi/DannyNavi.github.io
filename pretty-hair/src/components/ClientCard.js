import react from "react";

function ClientCard(props){
    const client = props.client

    const deleteClient = async (id) => {
        if (!window.confirm('Are you sure you want to delete this client?')) return;

        try {
        const res = await fetch(`https://dannynavi-github-io.onrender.com/${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) throw new Error('Failed to delete client');
        alert('Client deleted!');
        // You can call a prop function here to refresh the client list if needed
        } catch (err) {
        console.error(err);
        alert('An error occurred while deleting the client');
        }
    };

    return(
        <div key={client._id} className="client-card" style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
            <button onClick={deleteClient}>Delete</button>
            <h2>{client.name}</h2>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Address:</strong> {client.address}</p>
            <p><strong>City:</strong> {client.city}</p>
            <p><strong>State:</strong> {client.state}</p>
            <p><strong>ZIP:</strong> {client.zip}</p>
            <p><strong>Cell:</strong> {client.cell}</p>
            <p><strong>Allergies:</strong> {client.allergies || 'None'}</p>
            <p><strong>Birthday:</strong> {client.birthday}</p>
        </div>
    )

}

export default ClientCard