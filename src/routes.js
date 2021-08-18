import React from 'react';

//rotas
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

//pages
import Tasks from './pages/Tasks/Index';
import NewTask from './pages/Tasks/Create';
import CompletedTask from './pages/Tasks/Completed';
import EditTask from './pages/Tasks/Edit';

export default function Routes(){
    return ( 
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Tasks />
                </Route>
                <Route path="/new-task" exact>
                    <NewTask />
                </Route>
                <Route path="/completed-tasks" exact>
                    <CompletedTask />
                </Route>
                <Route path="/edit-task/:id" exact>
                    <EditTask />
                </Route>
                <Redirect from="*" to="/" />
            </Switch>
        </BrowserRouter>
    );
}