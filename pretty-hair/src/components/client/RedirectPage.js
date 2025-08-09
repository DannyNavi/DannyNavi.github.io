import { useParams, Navigate } from "react-router-dom";

export default function RedirectPage(){
    const { id } = useParams();

    return(
        <Navigate to={`/viewclient/${id}`}/>
    )
}