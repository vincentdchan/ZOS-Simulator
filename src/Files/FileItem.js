import style from "../stylesheets/file.scss"

const template = `
<div className="file-item">
    {this.GetIcon()}
    <p className="filename">{this.props.filename}</p>
</div>
`;

export class FileItem {

    constructor(props) {
    }

    GetIcon() {
        if (this.props.fileType == "folder") {
            return <img className="file-icon" src="assets/images/Folder-icon.png" />
        } else {
            return <img className="file-icon" src="assets/images/Text-Document-icon.png" />
        }
    }

    render() {
        return null;
    }

}
