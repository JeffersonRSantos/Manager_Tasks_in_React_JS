import React, { Component } from 'react';

class Alert extends Component{
    constructor(props){
        super(props);
    }

    isMsg(){
        if(this.props.msg){
            return (
                <div className={"msg-response-"+this.props.type}>
                    <p>{this.props.msg}</p>
                </div>
            );
        }
        return ;
    }


    render(){
        return (
            <>
                {this.isMsg()}
            </>
        );
    }
}

export default Alert;