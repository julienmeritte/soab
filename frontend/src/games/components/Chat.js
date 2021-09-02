import React from "react";
import { TechnicolorShader } from "three-stdlib";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listMsg: [{name : "Admin" , text: "Bienvenu" , room: ""}],
            text: '',
        }
    }
    
    componentDidMount() {
        
        if(this.props.player != null) {
            setInterval(() => {
                this.props.onReceivedMsg();
                if (this.props.listMessage != null) {
                    this.setState({listMsg: this.props.listMessages})
                }
                
            }, 1000);
        }
    }


    handleNameChange = (event) => {
        this.setState({text: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSendMsg(this.state.text);
    }
    
    render() {
        const{ listMsg ,text} = this.state;
        return(
            <div>
                <ul class="messages">
                    {this.props.listMessages.map((data, i) => {                      
                        return (<li key={i}>
                            {data.name} : {data.text}
                        </li>)
                    })}
                </ul>
                <form onSubmit={(e) => {this.onSubmit(e);}}>
                    <input class="form-control" type="text" name="message" value={text} placeholder="Type your message" onChange={(e) => this.handleNameChange(e)} required/>
                    <button id="submit" type="submit" class="btn btn-primary">Send</button>
                </form>
            </div>
        );
    }
}
export default Chat;