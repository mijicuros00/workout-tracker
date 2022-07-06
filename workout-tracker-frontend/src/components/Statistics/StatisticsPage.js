import classes from "./Statistics.module.css";
import StandardLayout from "../layout/StandardLayout";
import {useEffect, useState} from "react";
import BodyMeasureService from "../../services/body-measures-service";
import BodyMeasure from "./BodyMeasure/BodyMeasure";

const StatisticsPage = () =>{

    const [bodyMeasures, setBodyMeasures] = useState([]);
    const [name, setName] = useState("");
    const [value, setValue] = useState("");

    useEffect(() =>{
        BodyMeasureService.getAll()
            .then(response =>{
                if(response.data){
                    setBodyMeasures(response.data)
                }
            }).catch(() => alert("There was an error while loading your data!"))
    }, [])

    const nameChangeHandler = e =>{
        setName(e.target.value);
    }

    const valueChangeHandler = e =>{
        setValue(e.target.value);
    }

    const submitHandler = e =>{
        e.preventDefault();
        BodyMeasureService.create({name, value})
            .then(response =>{
                if(response.data){
                    setName("");
                    setValue("");
                    bodyMeasures.push(response.data);
                }
            }).catch(() => alert("There was an error!"))

    }


    return(
        <StandardLayout>
            <main className={classes.main} style={{minHeight: "90vh"}}>
                <h1 className={classes.title}>Statistics page</h1>
                    <form className={classes.form} onSubmit={submitHandler}>
                        <h3>Add a body measurement</h3>
                        <label>Measurement name</label>
                        <input type="text" placeholder="Name" value={name} onChange={nameChangeHandler}/>
                        <label>Measurement value</label>
                        <input type="number" placeholder="Value" value={value} onChange={valueChangeHandler}/>
                        <input type="submit" value="Submit" className={classes.submitButton} />
                    </form>
                <h3 className={classes.title}>Your body measures are displayed below</h3>
                {bodyMeasures.map(bodyMeasure => <BodyMeasure key={bodyMeasure.id} id={bodyMeasure.id} name={bodyMeasure.name} value={bodyMeasure.value} date={bodyMeasure.date} />)}
            </main>
        </StandardLayout>
    )
}
export default StatisticsPage;