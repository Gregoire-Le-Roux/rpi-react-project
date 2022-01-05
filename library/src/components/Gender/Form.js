import { useState } from "react";
import { addGender } from "../../api/Gender"

function GenderForm () {
    const [gender, setGender] = useState('')


    const SubmitClick = (event) => {
        event.preventDefault();
        addGender(gender)
    };

    function genderChange(e) {
        let value = e.target.value
        setGender(value)
    }

    return (
        <form onSubmit={SubmitClick}>
            <input type="text" value={gender} onChange={genderChange} placeholder="Exemple: Fantastique" required></input>
            <br></br>
            <button type="submit" >Ajouter</button>
        </form>
    );
}
export default GenderForm