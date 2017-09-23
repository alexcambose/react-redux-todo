import React from 'react';
import {Dialog, FlatButton, TextField} from "material-ui";

class PasswordDialog extends React.Component{
    constructor(){
        super();
        this.state = {
            opened: true,
            error: '',
            password: '',
        };
    }
    handleClose(){
        this.setState({opened: false});
        if(this.props.canceled) this.props.canceled();
    }
    handleSubmit(){
        if(this.state.password === this.props.password) {
            if(this.props.submitted) this.props.submitted();
        } else this.setState({error: 'Wrong password'});

    }
    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.handleClose()}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={() => this.handleSubmit()}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Password protected"
                    actions={actions}
                    modal={false}
                    open={this.state.opened}
                    onRequestClose={() => this.handleClose()}
                >
                    <TextField
                        hintText="Password"
                        fullWidth={true}
                        type='password'
                        onChange={(e, password) => this.setState({password})}
                        errorText={this.state.error}
                    />
                </Dialog>
            </div>
        );
    }
}

export default PasswordDialog;