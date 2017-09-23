import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {FontIcon, IconButton} from "material-ui";


class BackButton extends React.Component{
    render(){
        return (
            <div style={{float: 'left', marginRight: 10,}}>
                <IconButton onClick={() => this.props.history.goBack()}>
                    <FontIcon className="material-icons">arrow_back</FontIcon>
                </IconButton>
            </div>
        );
    }
}

export default withRouter(BackButton);