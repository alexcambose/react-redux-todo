import React from 'react';
import {DatePicker, FlatButton, IconButton, TextField, Toggle} from "material-ui";
import FontIcon from 'material-ui/FontIcon';
import {connect} from 'react-redux';
import {addTodo, saveTodo} from "../actions/todos";
import {Link} from "react-router-dom";
import BackButton from "../components/BackButton";

@connect(state => {
    return {
        todos: state.todos.todos,
    }
})
class AddTodo extends React.Component{
    constructor(params){
        super(params);
        this.todo = '';
        if(this.props.match.params.id) {
            this.todo = this.props.todos.filter(e => parseInt(this.props.match.params.id) === e.id)[0];
        }
        this.state = {
            todoSaved: false,

            title: this.todo.title || '',
            description: this.todo.description || '',
            deadline: (this.todo.deadline ? new Date(this.todo.deadline) : null),
            password: this.todo.password || '',

            titleError: '',
            enabledDeadline: !!this.todo.deadline || false,
            enabledPassword: !!this.todo.password || false,
        };
    }
    addTodo(){
        const { title, description, deadline, password } = this.state;
        if(title.trim() === '') return false;
        if(this.todo) //save
            this.props.dispatch(saveTodo({id: this.todo.id, title, description, deadline, password, date: new Date()}));
        else
            this.props.dispatch(addTodo({id: (new Date).getTime(), title, description, deadline, password, date: new Date()}));

        this.props.history.goBack();
    }
    render(){
        const { title, description, deadline, password, titleError, enabledDeadline, enabledPassword} = this.state;

        const titleMaxLength = 80;
        return (
            <div>
               <BackButton/>
                <TextField
                    value={title}
                    maxLength={titleMaxLength}
                    floatingLabelText="Title"
                    fullWidth={true}
                    errorText={titleError}
                    onChange={(e,title) => this.setState({title})}
                />
                {this.state.title ? <span className="maxLengthLabel">{titleMaxLength - this.state.title.length} characters left</span> : ''}
                <TextField
                    value={description}
                    floatingLabelText="Description"
                    fullWidth={true}
                    multiLine={true}
                    rows={3}
                    onChange={(e,description) => this.setState({description})}
                />
                <div className="flex aic">
                    <Toggle style={{width: '200px', marginRight: 10}}
                        label="Deadline"
                        toggled={enabledDeadline}
                        onToggle={(e,toggle)=>this.setState({enabledDeadline:toggle})}
                    />
                    <DatePicker
                        style={{flexGrow: 3}}
                        textFieldStyle={{width: '100%'}}
                        hintText="Select date"
                        disabled={!this.state.enabledDeadline}
                        onChange={(e,deadline) => this.setState({deadline})}
                        value={deadline}
                    />
                </div>
                <div className="flex aic">
                    <Toggle
                        toggled={enabledPassword}
                        style={{width: '200px', marginRight: 10}}
                        label="Password protect"
                        onToggle={(e,toggle)=>this.setState({enabledPassword:toggle})}
                    />
                    <TextField
                        style={{flexGrow: 3}}
                        floatingLabelText="Password"
                        disabled={!this.state.enabledPassword}
                        onChange={(e,password) => this.setState({password})}
                        value={password}
                        type='password'

                    />
                </div>

                <FlatButton
                    label="Save todo"
                    fullWidth
                    onClick={()=>this.addTodo()}
                />
            </div>
        );
    }
}


export default AddTodo;