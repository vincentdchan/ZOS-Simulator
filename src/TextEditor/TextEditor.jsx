import React from "react"
import ReactDOM from 'react-dom'
import {Window} from "../Windows/Window.jsx"
import style from "../stylesheets/textEditor.scss"

export class TextEditor extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Window titleName={this.props.titleName} windowsManager={this.props.windowsManager}>
            <div className="text-editor">
                <div className="toolbar">
                    <span className="btn"><i className="fa fa-file-text-o" aria-hidden="true"></i></span>
                    <span className="btn"><i className="fa fa-floppy-o" aria-hidden="true"></i></span>
                </div>
                <textarea className="real-editor"></textarea>
            </div>
        </Window>
    }

}
