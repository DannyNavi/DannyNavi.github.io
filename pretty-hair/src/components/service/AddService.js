import AddPermService from "./AddPermService"
import AddDyeService from "./AddDyeService"
import AddWaxService from "./AddWaxService"
import "../../styles/AddService.css"

function AddService(){

  return(
    <div className="AddServiceContainer">
      <AddPermService/>
      <AddDyeService/>
      <AddWaxService/>
    </div>
  )
}

export default AddService

