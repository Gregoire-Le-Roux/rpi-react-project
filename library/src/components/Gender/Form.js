import { useState } from "react";
import { addGender } from "../../api/Gender"

function GenderForm (props) {
    const [gender, setGender] = useState("")


    const SubmitClick = async (event) => {
        event.preventDefault();
    
        const res = await addGender(gender);
        let id = res.data
        let newGender = {
            id: id,
            name: gender
        }
        props.updategenders(newGender);
        let genderInput = document.getElementById("genderName");
        console.log(genderInput);
        genderInput.value = ""

    };

    function genderChange(e) {
        let value = e.target.value
        setGender(value)
    }

    return (
        <form onSubmit={SubmitClick}>
            <input type="text" id="genderName" value={gender} onChange={genderChange} placeholder="Exemple: Fantastique" required></input>
            <br></br>
            <button type="submit" >Ajouter</button>
        </form>
    );
}
export default GenderForm