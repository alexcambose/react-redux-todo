import React from 'react';
import {Divider, FontIcon, IconButton, ListItem} from "material-ui";
import { withRouter } from 'react-router-dom'
import {connect} from "react-redux";
import {favouriteTodo} from '../actions/todos';
import {amber500, green700} from 'material-ui/styles/colors';
import moment from 'moment';
import {Link} from "react-router-dom";

@connect( store => {
    return {
        todos: store.todos,
    };
})

class TodoList extends React.Component{
    markFavourite(id, boolean){
        this.props.dispatch(favouriteTodo(id, boolean));
    }
    navigate(id){
        this.props.history.push('/view/' + id);
    }
    render(){
        let allTodos = this.props.todos.todos;

        if(this.props.todos.onlyCompleted) allTodos = allTodos.filter(e => e.done);
        if(this.props.todos.onlyStarred) allTodos = allTodos.filter(e => e.favourite);
        if(this.props.todos.sortBy === 'DATE_CREATED'){
            allTodos.sort((a,b) => {
                return (new Date(b.date) - new Date(a.date));
            });
        }else if (this.props.todos.sortBy === 'ALPHABETICALLY'){
            allTodos.sort((a,b) => {
                if(a.title.toUpperCase() > b.title.toUpperCase()) return 1;
                if(a.title.toUpperCase() < b.title.toUpperCase()) return -1;
                return 0;
            });
        }


        const todos = allTodos.map((e,i) => {
            const textStyle = e.done ? {color: 'white'} : {};
            const secondaryText =  (
                <div style={textStyle}>
                    <span>{moment(e.date).fromNow()}</span>
                    {e.password ? <span style={{float: 'right'}}><FontIcon style={{...textStyle, fontSize: 14, opacity: 0.4}} className="material-icons">lock</FontIcon></span> : '' }
                </div>);
            return <div key={e.id}>
                <ListItem
                    rightIconButton={
                        <IconButton onClick={() => this.markFavourite(e.id, !e.favourite)}>
                            {e.favourite ? <FontIcon color={amber500} className="material-icons">star</FontIcon>
                                : <FontIcon color={textStyle.color} className="material-icons">star_border</FontIcon>}
                        </IconButton>
                    }
                    primaryText={e.title}
                    hoverColor={e.done ? 'red' : null}
                    style={e.done ? {backgroundColor: green700, color: 'white'} : {}}
                    secondaryText={secondaryText}
                    onClick={() => this.navigate(e.id)}
                />
                {i !== allTodos.length - 1 ? <Divider style={{height: textStyle.color ? 2 : 1}}/> : ''}
            </div>
        });

        if(allTodos.length === 0) return <div className='ptext' style={{textAlign: 'center', padding:20}}>No todos, you can <Link to='add'>add</Link> one</div>;

        return (
            <div>
                {todos}
            </div>
        );
    }
}


export default withRouter(TodoList);
