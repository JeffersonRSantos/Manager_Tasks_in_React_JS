import React from 'react';
import { FaUndoAlt  } from "react-icons/fa";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function BtnRestore({id}){

    const history = useHistory();

    function handleCompletesTask(id){
        axios.all([
            axios.get('/restore/'+id)
        ]).then(axios.spread((... resp) => {
            if(resp[0].data.success){
                alert("Tarefa restaurada!");
                history.go();
            }
        })).catch((err) => {
            console.log("Error: "+ err);
        });
    }

    return (
        <div className="row info-footer">
            <div className="col text-right">
                <button onClick={() => handleCompletesTask(id)} className="btn btn-completed" type="button"><FaUndoAlt /> Restaurar tarefa</button>
            </div>
        </div>
    );
}