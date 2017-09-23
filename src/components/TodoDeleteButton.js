import React from 'react';
import {Dialog, FlatButton, FontIcon, RaisedButton} from "material-ui";


class TodoDeleteButton extends React.Component {
    constructor(){
        super();
        this.state = {
            deleteDialogOpen: false,
        };
    }
    handleDelete(){
        if(this.props.onDelete) this.props.onDelete();
    }
    render() {
        return (
            <div>
                <RaisedButton
                    label="delete"
                    icon={<FontIcon className="material-icons">delete</FontIcon>}
                    secondary
                    onClick={()=>this.setState({deleteDialogOpen: true})}
                />
                <Dialog
                    title="Delete todo"
                    actions={[
                        <FlatButton
                            label="Cancel"
                            primary={true}
                            onClick={()=>this.setState({deleteDialogOpen:false})}
                        />,
                        <FlatButton
                            label="Delete"
                            secondary
                            onClick={()=>this.handleDelete()}
                        />,
                    ]}
                    modal={false}
                    open={this.state.deleteDialogOpen}
                    onRequestClose={()=>this.setState({deleteDialogOpen:false})}
                >
                    Are you sure you want to delete this todo ?
                </Dialog>
            </div>
        );
    }
}

export default TodoDeleteButton;