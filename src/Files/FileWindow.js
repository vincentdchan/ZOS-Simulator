/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-12 
 ************************/

import {Window} from "../Windows/Window.js"
import {FileItem} from "./FileItem.js"

const template = `<div class="pathContainer">
    <input type="text" />
    <div class="itemContainer unselectable" ref="fileContainer">
    </div>
</div>`

export class FileWindow extends Window {

    constructor(wm) {
        super(wm);
        this.Slot('default', this.RenderTemplate(template))

        let fi1 = new FileItem();
        fi1.fileType = "text";
        fi1.filename = "text1.txt";
        let fi2 = new FileItem();
        fi2.fileType = "folder";
        fi2.filename = "abc";

        this.$refs.fileContainer.appendChild(fi1.dom);
        this.$refs.fileContainer.appendChild(fi2.dom);
    }

    render() {
        const style = {
            height: 260 + "px",
        };
        return null;
    }

    inputPathChanged(event) {
        this.setState({
            path: event.target.value
        });
    }

}
