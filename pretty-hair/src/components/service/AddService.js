import AddPermService from "./AddPermService"
import AddDyeService from "./AddDyeService"
import AddWaxService from "./AddWaxService"
import AddHairTreatmentService from "./AddHairTreatmentService"
import "../../styles/AddService.css"

function AddService(){

  return(
    <div className="AddServiceContainer">
      <AddPermService/>
      <AddDyeService/>
      <AddWaxService/>
      <AddHairTreatmentService/>
    </div>
  )
}

export default AddService

