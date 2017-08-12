import {Window} from "../Windows/Window"
import style from "../stylesheets/textEditor.scss"

const template = `<div class="text-editor">
    <div class="toolbar">
        <span class="btn"><i class="fa fa-file-text-o" aria-hidden="true"></i></span>
        <span class="btn"><i class="fa fa-floppy-o" aria-hidden="true"></i></span>
    </div>
    <textarea class="real-editor"></textarea>
</div>`

export class TextEditor extends Window {

    constructor() {
        super();
        this.Slot('default', this.RenderTemplate(template));
    }

}
