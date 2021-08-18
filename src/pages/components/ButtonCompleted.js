import React from 'react';
import { FaCheck  } from "react-icons/fa";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function BtnCompleted({id}){

    const history = useHistory();

    function handleCompletesTask(id){
        axios.all([
            axios.get('/completed/'+id)
        ]).then(axios.spread((... resp) => {
            if(resp[0].data.success){
                alert("Tarefa concluída!");
                history.push('/completed-tasks');
            }
        })).catch((err) => {
            console.log("Error: "+ err);
        });
    }

    return (
        <div className="row info-footer">
            <div className="col text-right">
                <button onClick={() => handleCompletesTask(id)} className="btn btn-completed" type="button"><FaCheck /> Concluir tarefa</button>
            </div>
        </div>
    );
}