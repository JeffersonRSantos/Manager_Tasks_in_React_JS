import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaAngleLeft, FaCheck  } from "react-icons/fa";
import axios from 'axios';

//components
import Task from '../components/Task';

export default function CompletedTask(){

    const [tasks, setTasks] = useState([]);

    const registerTasks = useCallback((items) => {
        setTasks(items);
    }, [tasks]);

    useEffect(() => {
        axios.all([
            axios.get('/completed-tasks')
            ]).then(axios.spread((... response) => {
                registerTasks(response[0].data);
            })).catch((err) => {
                console.log("Error: ".err);
            });
    }, []);

    return (
        <section className="container">
            <article className="content">
                <div className="row">
                    <div className="col title">
                        <h1><FaCheck /> Tarefas Concluídas</h1>
                    </div>
                    <div className="col text-right">
                        <ul className="ul-inline">
                            <li>
                                <Link to="/">
                                    <button className="btn-create" type="button"><FaAngleLeft /> Voltar</button>
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
                <hr />
                { tasks.map((task, i) => ( <Task task={task} key={i} restore={true} /> ) ) }
            </article>
        </section>
    );
};