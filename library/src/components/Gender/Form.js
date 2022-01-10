import { useState } from "react";
import { addGender } from "../../api/Gender"

export function GenderForm (props) {
    const [gender, setGender] = useState("")


    const SubmitClick = (event) => {
        event.preventDefault();
    
        props.updategenders(gender);
        setGender("");
    };

    function genderChange(e) {
        let value = e.target.value
        value = value.charAt(0).toUpperCase() + value.slice(1);
        setGender(value);
    }

    return (
        <form onSubmit={SubmitClick}>
            <input type="text" value={gender} onChange={genderChange} placeholder="Exemple: Fantastique" required></input>
            <br></br>
            <button type="submit" >Ajouter</button>
        </form>
    );
}


export function ModifyGenderForm(props) {
    const [gender, setGender] = useState(props.gender)
    
    const handleChange = (e) => {
        let value = e.target.value;
        value = value.charAt(0).toUpperCase() + value.slice(1);
        let name = e.target.name;
        setGender(gender => ({
            ...gender,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {        
        e.preventDefault();

        props.genderupdate(gender);
        props.onHide();
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Nom:
                        <input type="text" name="name" value={gender.name} onChange={handleChange} required></input>
                    </label>
                </div>
                <button style={{backgroundColor: "#33cc33"}}>Modifier</button>
            </form>
        </div>
    );
}