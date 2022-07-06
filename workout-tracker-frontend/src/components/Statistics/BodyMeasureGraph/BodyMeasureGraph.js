import StandardLayout from "../../layout/StandardLayout";
import classes from "../Statistics.module.css";
import {useEffect, useState} from "react";
import BodyMeasureService from "../../../services/body-measures-service";
import {useParams} from "react-router-dom";
import { Line } from 'react-chartjs-2';import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


const BodyMeasureGraph = () =>{

    const [bodyMeasures, setBodyMeasures] = useState([]);
    const [name, setName] = useState("");

    let {id} = useParams();

    useEffect(() =>{
        BodyMeasureService.getById(id)
            .then(response =>{
                if(response.data){
                    console.log(response.data);
                    setBodyMeasures(response.data);
                    setName(response.data[0].name);
                }
            }).catch(() => alert("There was an error while loading your data!"))
    }, [])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    let labels = bodyMeasures.map(bodyMeasure => {
        let date = new Date(bodyMeasure.date);
        return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}.`;
    });
    let values = bodyMeasures.map(bodyMeasure => bodyMeasure.value);

    const data = {
        labels,
        datasets: [
            {
                label: 'Body measure value',
                data: values,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ]
    }

    return(
        <StandardLayout>
            <main className={classes.main} style={{minHeight: "90vh"}}>
                <h1 className={classes.title}>Statistics for body measurement</h1>
                <h2 className={classes.title}>{name}</h2>
                <Line options={options} data={data} />
                 </main>
        </StandardLayout>
    )
}

export default BodyMeasureGraph;