import {Window} from "../Windows/Window"
import style from "../stylesheets/textEditor.scss"

const template = `
<Window titleName={this.props.titleName} windowsManager={this.props.windowsManager}>
    <div className="text-editor">
        <div className="toolbar">
            <span className="btn"><i className="fa fa-file-text-o" aria-hidden="true"></i></span>
            <span className="btn"><i className="fa fa-floppy-o" aria-hidden="true"></i></span>
        </div>
        <textarea className="real-editor"></textarea>
    </div>
</Window>
`

export class TextEditor extends Window {

    constructor(props) {
        super(props);
    }

    Render() {
    }

}
