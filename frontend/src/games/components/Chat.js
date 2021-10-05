import React from "react";
import { TechnicolorShader } from "three-stdlib";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            listMsg: [{name : "Admin" , text: "Bienvenu" , room: ""}],
            text: '',
            display: true,
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

    closeForm = () => {
        console.log('APPPPPPPPPPPPPPEL');
        if(this.state.display) {
            this.setState({display: false});
            console.log('true now');
        }
        else {
            this.setState({display: true});
            console.log('false now');
        }
    }

    render() {
        const{ listMsg ,text , display} = this.state;
        const divhide = {
            display: 'none',
        };
        const divshow = {
            display: 'block',
        };
        return(
            <div>
                <div class="popup" style={display ? divshow : divhide}>
                    <div class="chat-popup">
                        <form class="form-container" onSubmit={(e) => {this.onSubmit(e);}}>
                            <div class="message-container">
                                <ul class="messages">
                                    {this.props.listMessages.map((data, i) => {
                                        return (<li key={i}>
                                            <p class="username"><b>{data.name}</b><small class="message">{data.text}</small></p>
                                        </li>)
                                    })}
                                </ul>
                            </div>
                            <input class="form-control" type="text" name="message" value={text} placeholder="Type your message" onChange={(e) => this.handleNameChange(e)} required/>
                            <button id="submit" type="submit" class="btn btn-primary">Send</button>
                            {display ?
                            (<button type="button" class="btn cancel" onClick={this.closeForm}>Close</button> )
                            : (<div></div>)}
                        </form>
                    </div>
                </div>
                {!display ?
                    (<button class="btn btn-primary" onClick={this.closeForm}>Open chat</button>)
                    : (<div></div>)}
            </div>
        );
    }
}
export default Chat;