import React, { useState } from 'react';

import { FaTimes, FaInfoCircle, FaAngleRight, FaPen  } from "react-icons/fa";
import '../Tasks/style.css';
import BtnCompleted from '../components/ButtonCompleted';
import BtnRestore from './ButtonRestore';
import {Collapse} from 'react-collapse';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Task = ({task, completed, restore}) => {

    const [ state, setState ] = useState(false);
    const button = completed;
    const retore = restore;

    const btnCompleted = (id) => {
        if(button){ return <BtnCompleted id={id} />; }
    };

    const btnRestore = (id) => {
        if(retore){ return <BtnRestore id={id} />; }
    };

    function handleCollapse()
    {
        if(state == true){ setState(false);
        }else{ setState(true);}
    }

    async function handleDeletedTask(id)
    {
        try {
            await axios.delete('/tasks/'+id)
            .then((resp) => {
                alert('Tarefa removida com sucesso.');
                history.go(0);
            }).catch((err) => {
                alert(err);
            });
        } catch (err) {
            console.log("Error: $err");
        }
    }
    
    return (
        <div>
            <div className="content-taks">
                <span className={"priority priority-color-"+task.priority}></span>
                <div className="row">
                    <div onClick={() => handleCollapse()} className="col title-task">
                        <p>{ task.name }</p>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col text-right">
                                <ul className="ul-icons">
                                    <li>
                                        <Link to={"/edit-task/"+task.id}>
                                            <button type="button" className="btn-info-task" ><FaPen /></button>
                                        </Link>
                                    </li>  
                                    <li>
                                        <button onClick={() => handleCollapse()} type="button" className="btn-info-task" ><FaInfoCircle /></button>
                                    </li>                         
                                    <li>
                                        <button onClick={() => handleDeletedTask(task.id)} type="button" className="btn-delete-task" ><FaTimes /></button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>             
                </div>

                <Collapse isOpened={state}>
                    <div className="info-task">
                        <div className="row">
                            <div className="col">
                                <hr />
                                <p><FaAngleRight /> {task.description}</p>
                            </div>
                        </div>
                        {btnCompleted(task.id)}
                        {btnRestore(task.id)}
                    </div>
                </Collapse> 
            </div>
        </div>
    );
};
 
export default Task;