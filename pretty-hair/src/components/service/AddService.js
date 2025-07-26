import AddPermService from "./AddPermService"
import AddDyeService from "./AddDyeService"
import AddWaxService from "./AddWaxService"
import AddHairService from "./AddHairService"
import "../../styles/AddService.css"

function AddService(){

  return(
    <div className="AddServiceContainer">
      <AddPermService/>
      <AddDyeService/>
      <AddWaxService/>
      <AddHairService/>
    </div>
  )
}

export default AddService

