function GenderForm () {

    const SubmitClick = (event) => {
        event.preventDefault()
    }

    return (
        <form>
            <input type="text" placeholder="exemple: Fantastique"></input>
            <br></br>
            <button onclick={SubmitClick} >ajouter</button>
        </form>
    );
}
export default GenderForm