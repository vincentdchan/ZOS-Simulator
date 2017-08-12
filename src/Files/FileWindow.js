import {Window} from "../Windows/Window.js"
import {FileItem} from "./FileItem.js"

const template = `
<Window titleName={this.props.titleName} windowsManager={this.props.windowsManager}>
    <div className="pathContainer">
        <input type="text" value={this.state.path} onChange={this.inputPathChanged.bind(this)} />
    </div>
    <div style={style} className="itemContainer unselectable">
        <FileItem fileType="text" filename="text1.txt" fileManager={this.fileManager} />
        <FileItem fileType="text" filename="text2.txt" fileManager={this.fileManager} />
        <FileItem fileType="folder" filename="abc" fileManager={this.fileManager} />
    </div>
</Window>
`

export class FileWindow {

    constructor(props) {
        // super(props);

        this.fileManager = props.fileManager;

        this.state = {
            path: "C:/",
        };
    }

    render() {
        const style = {
            height: 260 + "px",
        };
        return <Window titleName={this.props.titleName} windowsManager={this.props.windowsManager}>
            <div className="pathContainer">
                <input type="text" value={this.state.path} onChange={this.inputPathChanged.bind(this)} />
            </div>
            <div style={style} className="itemContainer unselectable">
                <FileItem fileType="text" filename="text1.txt" fileManager={this.fileManager} />
                <FileItem fileType="text" filename="text2.txt" fileManager={this.fileManager} />
                <FileItem fileType="folder" filename="abc" fileManager={this.fileManager} />
            </div>
        </Window>
    }

    inputPathChanged(event) {
        this.setState({
            path: event.target.value
        });
    }

}
