import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaSyncAlt } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';

import Alert from '../components/Alert';

export default function EditTask(props)
{
    const { id } = useParams();
    const [ task, setTask ] = useState([]);

    const [name, setName] = useState('');
    const [priority, setPriority] = useState('');
    const [description, setDescription] = useState('');
    const [ msg, setMsg ] = useState('');

    const history = useHistory();

    useEffect(() => {
        getTask(id);
    }, [id]);

    async function getTask()
    {
        axios.all([
            axios.get('/tasks/'+id+'/edit')
        ]).then(axios.spread((... resp) => {
            setTask(resp[0].data);
            setName(resp[0].data.name);
            setPriority(resp[0].data.priority);
            setDescription(resp[0].data.description);
        })).catch((err) => {
            console.log("Error: "+err);
        });
    }

    async function handlerUpdateTask(e)
    {
        e.preventDefault();        
        const data = {
            name,
            priority,
            description
        };

        await axios.all([
            axios.patch('/tasks/'+id, data)
        ]).then(axios.spread((... resp) => {
            if(resp[0].data.success){
                setMsg(<Alert msg={"Tarefa atualizada com sucesso."} type={"success"} />);
            }
        })).catch((err) => {
            console.log("Error: "+err);
        });
    }

    return (
        <section className="container">
            <article className="content">
                <div className="row">
                    <div className="col title">
                        <h1><FaSyncAlt /> Atualizar Tarefa</h1>
                    </div>
                    <div className="col text-right">
                        <button onClick={history.goBack} className="btn" type="button"><FaAngleLeft /> Voltar</button>
                    </div>
                </div>
                <hr />
                {msg}
                <div className="row">
                    <div className="col">
                        <form onSubmit={handlerUpdateTask}>
                            <div className="row">
                                <input 
                                    className="style-input"
                                    placeholder="Nome"
                                    value={name}
                                    onChange={e => setName(e.target.value)}    
                                />
                            </div>
                            <div className="row">
                                <select className="style-input" value={priority} onChange={e => setPriority(e.target.value)}>
                                    <option value="" disabled>Prioridade</option>
                                    <option value="high">Alta</option>
                                    <option value="medium">Média</option>
                                    <option value="low">Baixa</option>
                                </select>
                            </div>
                            <div className="row">
                                <textarea className="style-input" placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} ></textarea>
                            </div>
                            <div className="row">
                                <div className="col text-right">
                                    <button type="submit" className="btn"><FaSyncAlt /> Atualizar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </article>
        </section>
    );
}