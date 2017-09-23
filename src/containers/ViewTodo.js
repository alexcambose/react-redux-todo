import React from 'react';
import {connect} from 'react-redux';
import {FontIcon, RaisedButton} from "material-ui";
import TodoDeleteButton from "../components/TodoDeleteButton";
import {deleteTodo, doneTodo} from "../actions/todos";
import {Link} from "react-router-dom";
import BackButton from "../components/BackButton";
import PasswordDialog from "../components/PasswordDialog";
import {fullWhite, green500, red500} from "material-ui/styles/colors";
import moment from 'moment';

@connect(store => {
    return {
        todos: store.todos.todos,
    }
})
class ViewTodo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todo: this.props.todos.filter(e => parseInt(this.props.match.params.id) === e.id)[0],
            authorized: false,
        }
    }
    componentDidMount = () => this.setState({authorized: !this.state.todo.password});

    handleDelete(){
        this.props.dispatch(deleteTodo(this.state.todo.id));
        this.props.history.goBack();
    }
    handleDone(){
        this.props.dispatch(doneTodo(this.state.todo.id, !this.state.todo.done));
    }
    render(){
        const todo = this.state.todo;
        if(!todo) return;
        if(!this.state.authorized) return <PasswordDialog password={todo.password} canceled={() => this.props.history.goBack()} submitted={() => this.setState({authorized:true})}/>;
        return (
            <div>
                <BackButton/>
                {todo.done ?
                    <RaisedButton
                        label="mark as undone"
                        backgroundColor={red500}
                        labelColor={fullWhite}
                        onClick={() => this.handleDone()}
                        icon={<FontIcon className="material-icons" color={fullWhite}>clear</FontIcon>}
                    />
                    :
                <RaisedButton
                    label="mark as done"
                    backgroundColor={green500}
                    labelColor={fullWhite}
                    onClick={() => this.handleDone()}
                    icon={<FontIcon className="material-icons" color={fullWhite}>done</FontIcon>}
                /> }
                <div style={{float: 'right'}}>
                    <Link to={"/edit/" + todo.id}>
                        <RaisedButton
                            label="edit"
                            icon={<FontIcon className="material-icons">edit</FontIcon>}
                            primary
                        />
                    </Link>
                </div>
                <div style={{clear: 'both'}}>
                    <h2 className="ptext">{todo.title}</h2>
                    <p className="ptext">{todo.description}</p>
                </div>
                <div style={{float: 'left'}}>
                    <div className='ptext'>
                        Created on <strong>{moment(todo.date).format('LLL')}</strong>
                    </div>
                    {todo.deadline ?
                        <div className='ptext'>
                            Deadline on <strong>{moment(todo.deadline).format('LLL')} ({moment(todo.deadline).fromNow()})</strong>
                        </div>
                    : '' }
                </div>

                <div style={{float: 'right'}}>
                    <TodoDeleteButton
                        onDelete={() => this.handleDelete()}
                    />
                </div>
            </div>
        );
    }
}


export default ViewTodo;