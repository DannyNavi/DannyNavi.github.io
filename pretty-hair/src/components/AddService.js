import AddPermService from "./AddPermService"
import AddDyeService from "./AddDyeService"
import "../styles/AddService.css"

function AddService(){

  return(
    <div className="AddServiceContainer">
      <AddPermService/>
      <AddDyeService/>
    </div>
  )
}

export default AddService

