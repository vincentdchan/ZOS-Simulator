import style from "../stylesheets/file.scss"
import {Component} from "../Windows/Window"

const template = `<div class="file-item">
    <img ref="iconimg" class="file-icon" />
    <p class="filename" ref="filename"></p>
</div>`

export class FileItem extends Component {

    constructor() {
        super();
        this._dom = this.RenderTemplate(template);
    }

    get fileType() {
        return this._fileType;
    }

    set fileType(value) {
        this._fileType = value;

        if (this._fileType == "folder") {
            this.$refs.iconimg.setAttribute("src", "assets/images/Folder-icon.png");
        } else {
            this.$refs.iconimg.setAttribute("src", "assets/images/Text-Document-icon.png");
        }
    }

    get filename() {
        return this._filename;
    }

    set filename(value) {
        this._filename = value;
        this.$refs.filename.innerText = value;
    }

}
