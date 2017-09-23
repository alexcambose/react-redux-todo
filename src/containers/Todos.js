import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { List, IconButton, DropDownMenu, MenuItem, Checkbox } from "material-ui";
import FontIcon from 'material-ui/FontIcon';
import TodoList from "../components/TodoList";
import { onlyCompletedTodo, onlyStarredTodo, sortTodo } from "../actions/todos";

@connect(store => {
    return {
        todos: store.todos,
    }
})
class Todos extends React.Component{
    render(){
        return (
            <div>
                <Link to="/add">
                    <IconButton>
                        <FontIcon className="material-icons">add</FontIcon>
                    </IconButton>
                </Link>
                <div style={{float: 'right', display: 'flex', flexDirection:'row', alignItems: 'center'}}>
                    <Checkbox
                        style={{width: '180px'}}
                        label="Only completed"
                        checked={this.props.todos.onlyCompleted}
                        onCheck={(e, boolean) => this.props.dispatch(onlyCompletedTodo(boolean)) }
                    />
                    <Checkbox
                        style={{width: '170px'}}
                        label="Only starred"
                        checked={this.props.todos.onlyStarred}
                        onCheck={(e, boolean) => this.props.dispatch(onlyStarredTodo(boolean)) }
                    />
                    <DropDownMenu value={this.props.todos.sortBy} onChange={(e, i, val) => this.props.dispatch(sortTodo(val))}>
                        <MenuItem value={'DATE_CREATED'} primaryText="Date created" />
                        <MenuItem value={'ALPHABETICALLY'} primaryText="Alphabetically" />
                    </DropDownMenu>
                </div>
                <List>
                    <TodoList/>
                </List>
            </div>
        );
    }
}


export default Todos;