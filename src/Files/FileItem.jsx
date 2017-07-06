import React from "react"
import ReactDOM from 'react-dom'
import style from "../stylesheets/file.scss"

export class FileItem extends React.Component {

    constructor(props) {
        super(props);
    }

    GetIcon() {
        if (this.props.fileType == "folder") {
            return <img className="file-icon" src="assets/images/Folder-icon.png" />
        } else {
            return <img className="file-icon" src="assets/images/Text-Document-icon.png" />
        }
    }

    render() {
        return <div className="file-item">
            {this.GetIcon()}
            <p className="filename">{this.props.filename}</p>
        </div>
    }

}
