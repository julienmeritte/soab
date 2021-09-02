import React from "react";
import { TechnicolorShader } from "three-stdlib";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.socket = props.socket;
        this.state = {
            messages: ['test', 'deuxième test'],
            text: '',
        }
    }
    
    handleNameChange = (event) => {
        this.setState({text: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        let messages = [...this.state.messages];
        messages.push(this.state.text);
        this.setState({messages});
    }
    
    render() {
        const{message,text} = this.state;
        return(
            <div>
                <ul class="messages">
                    {this.state.messages.map((message, i) => {                      
                        return (<li>
                            {message}
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