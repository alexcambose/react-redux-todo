import React from 'react';
import './styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Route}from 'react-router-dom';
import { ConnectedRouter} from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import AddTodo from './containers/AddTodo';
import Todos from "./containers/Todos";
import ViewTodo from "./containers/ViewTodo";

class App extends React.Component{
    render(){
        return (
            <div style={{margin: 'auto', paddingTop: 40, width: 800}}>
                <MuiThemeProvider>
                    <ConnectedRouter history={createHistory()}>
                        <div>
                            <Route exact path="/" component={Todos}/>
                            <Route path="/add/" component={AddTodo}/>
                            <Route path="/view/:id" component={ViewTodo}/>
                            <Route path="/edit/:id" component={AddTodo}/>
                        </div>
                    </ConnectedRouter>


                </MuiThemeProvider>
            </div>

        );
    }
}

export default App;