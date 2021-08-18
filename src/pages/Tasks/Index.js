import React, { useState, useRef, useEffect, useCallback, usePrevius } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaCheck, FaTasks } from "react-icons/fa";
import axios from 'axios';
//css
import './style.css';
//components
import Task from '../components/Task';

export default function Tasks (){

    const [tasks, setTasks] = useState([{"name": "Crie uma nova tarefa"}]);
    const inputName = useRef('');

    const registerTasks = useCallback((items) => {
        setTasks(items);
    }, [tasks]);

    async function getTasks(){
        await axios.all([
            axios.get('/tasks')
        ]).then(axios.spread((... resp) => {
            registerTasks(resp[0].data);
            
        })).catch((err) => {
            console.log("Error: ".err);
        });
    }

    useEffect(() => {
        getTasks();
    }, []);

    async function getValueName(e){
        //params
        let data = {
            "name": e.target.value
        };
        //search over three characters
        if(e.target.value.length > 2){
            await axios.all([
                axios.post('/filter-tasks', data)
            ]).then(axios.spread((... response) => {
                registerTasks(response[0].data);
            })).catch((err) => {
                console.log("Error: ".err);
            });
        }else{
            //return all tasks
            getTasks();
        }
    }

    return (
        <section className="container">
            <article className="content">
                <div className="row">
                    <div className="col title">
                        <h1><FaTasks /> Tarefas</h1>
                    </div>
                    <div className="col right-col text-right">
                        <ul className="ul-inline">
                            <li>
                                <Link to="/completed-tasks">
                                    <button className="btn-create" type="button"><FaCheck /> Concluídas</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/new-task">
                                    <button className="btn-create" type="button"><FaPlus /> Criar</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col input-filter">
                        <input placeholder="Pesquisar tarefa..." onChange={(e) => getValueName(e)} ref={inputName} type="text" />
                    </div>
                </div>
                <hr />
                { tasks.map((task, i) => ( <Task task={task} completed="true" key={i}  /> ) ) }
            </article>
        </section>
    );   
};
