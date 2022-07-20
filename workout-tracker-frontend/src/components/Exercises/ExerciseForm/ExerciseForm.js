import StandardLayout from "../../layout/StandardLayout";
import classes from "../Exercises.module.css";
import {useEffect, useState} from "react";
import TextArea from "../../util/TextArea";
import MuscleGroupService from "../../../services/muscle-group-service";
import ExerciseService from "../../../services/exercise-service";
import {useNavigate} from "react-router-dom";
import jwtService from "../../../services/jwt-service";

const ExerciseForm = () =>{

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [selectedMusleGroups, setSelectedMusleGroups] = useState([]);
    const [images, setImages] = useState([]);

    let navigate  = useNavigate();

    useEffect(() => {
        if(jwtService.getRoleFromJwt() === null)
            navigate("/login");

        MuscleGroupService.getAll()
            .then(response => {
                setMuscleGroups(response.data);
            }).catch(() => {
            alert("An error occurred while loading data!");
        })
    }, [])


    const descriptionChangeHandler = (value) =>{
        setDescription(value);
    }

    const checkHandler = e =>{
        let id = e.target.value;
        if(selectedMusleGroups.includes(id)){
            setSelectedMusleGroups(selectedMusleGroups.filter(groupId => groupId !== id));
            return;
        }
        selectedMusleGroups.push(id);
    }

    const uploadImageHandler = e =>{
        const file = e.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (){
            let imageBlob = reader.result.split(",")[1];
            images.push(imageBlob)
        }
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const submitHander = e =>{
        e.preventDefault();
        if(name.trim().length === 0 || description.trim().length === 0){
            alert("You must enter text for name and description!")
            return;
        }
        if(selectedMusleGroups.length < 1){
            alert("You must select at least one muscle group when creating exercise!");
            return;
        }
        let data ={
            name,
            description,
            images,
            selectedMusleGroups
        }
        ExerciseService.create(data)
            .then(response => {
                navigate('/exercises')
            }).catch(err => {
                alert("something went wrong!")
        })
    }

    let checkboxes = muscleGroups.map(muscleGroup => {
        return(
            <>
                <label className={classes.checkbox}>{muscleGroup.name}</label>
                <input type="checkbox" className={classes.checkbox} value={muscleGroup.id} onClick={checkHandler}/>
                <br/>
            </>
        )
    })

    return(
        <StandardLayout>
            <main className={classes.main} style={{minHeight: "90vh"}}>
                <h1 className={classes.title}>Create new exercise</h1>
                <form className={classes.form} onSubmit={submitHander}>
                    <label>Exercise name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    <TextArea title="description" value={description} setValue={descriptionChangeHandler} />
                    {checkboxes}
                    <input type="file" title="Upload a picture" onChange={uploadImageHandler}/>
                    {images.map(image => <img style={{maxWidth: "100%", objectFit: "cover", marginBottom: "20px"}} src={"data:image/png;base64, " + image} alt="Exercise picture"/>)}
                    <input type="submit" value="Create exercise"/>
                </form>
            </main>
        </StandardLayout>
    );
}
export default ExerciseForm;