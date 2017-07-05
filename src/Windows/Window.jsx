import React from "react"
import ReactDOM from 'react-dom'
import style from "../stylesheets/main.scss"

class TitleBar extends React.Component {

    render() {
        return <div className="titleBar unselectable" onMouseDown={this.props.onMouseDown} 
            onMouseUp={this.props.onMouseUp} >
            <div className="right">
                <i className="fa fa-window-close" aria-hidden="true"></i>
            </div>
            <p className="name">{ this.props.name }</p>
        </div>
    }

}

export class Window extends React.Component {

    constructor(props) {
        super();

        this.titleBarPressed = false;
        this.zIndexCounter = props.zIndexCounter;
        this.state = {
            x: 16,
            y: 16,
            width: 400,
            height: 300,
            zIndex: this.zIndexCounter(),
        };

        window.addEventListener("mousemove", (event) => this.onMouseMove(event));
    }

    render() {
        const myStyle = {
            left: this.state.x + "px",
            top: this.state.y + "px",
            width: this.state.width + "px",
            height: this.state.height + "px",
            zIndex: this.state.zIndex,
        };
        return <div className="window" style={myStyle}>
            <TitleBar name={this.props.titleName}
            onMouseUp={this.onTitleBarMouseUp.bind(this)} 
            onMouseDown={this.onTitleBarMouseDown.bind(this)}  />
        </div>
    }

    onMouseMove(event) {
        if (this.titleBarPressed) {
            this.setState({
                x: event.clientX - this.lastOffset.x,
                y: event.clientY - this.lastOffset.y,
            });
            this.lastOffset = {
                x: event.clientX - this.state.x,
                y: event.clientY - this.state.y,
            };
        }
    }

    onTitleBarMouseDown(event) {
        this.titleBarPressed = true;
        this.lastOffset = {
            x: event.clientX - this.state.x,
            y: event.clientY - this.state.y,
        };

        this.setState({
            zIndex: this.zIndexCounter(),
        });
    }

    onTitleBarMouseUp(event) {
        this.titleBarPressed = false;
    }

}
