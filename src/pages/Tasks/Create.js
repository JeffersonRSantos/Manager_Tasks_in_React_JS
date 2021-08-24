import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaAngleLeft, FaPlus  } from "react-icons/fa";
import axios from 'axios';

import Alert from '../components/Alert';

export default function NewTask () {
    const [name, setName] = useState('');
    const [priority, setPriority] = useState('');
    const [description, setDescription] = useState('');
    const [ msg, setMsg ] = useState('');

    const history = useHistory();

    async function handleRegister(e)
    {
        e.preventDefault();

        //set data
        const data = {
            name,
            priority,
            description,
        }

        try{
            //send data to api
            const resp = await axios.post('tasks', data);
            if(resp) {setMsg(<Alert msg={"Nova tarefa registra com sucesso."} type={"success"} />); }
        }catch(err){
            alert('Preencha todos os campos.');
        }
    }

    return (
        <section className="container">
            <article className="content">
                <div className="row">
                    <div className="col title">
                        <h1><FaPlus />Nova Tarefa</h1>
                    </div>
                    <div className="col text-right">
                        <button onClick={history.goBack} className="btn" type="button"><FaAngleLeft /> Voltar</button>
                    </div>
                </div>
                <hr />
                {msg}
                <div className="row">
                    <div className="col">
                        <form onSubmit={handleRegister}>
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
                                    <button type="submit" className="btn"><FaPlus /> Criar tarefa</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </article>
        </section>
    );
}
