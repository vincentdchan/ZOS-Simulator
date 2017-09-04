/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-12 
 ************************/

import {WindowComponent} from "../Windows/Window.js"
import {FileItemComponent} from "./FileItem.js"

const template = `<window v-bind:wm="wm" v-bind:title-content="titleContent">
    <div class="pathContainer">
        <input type="text" />
        <div class="itemContainer unselectable" ref="fileContainer">

            <file-item v-for="item in items" 
                v-bind:file-type="item.fileType" 
                v-bind:filename="item.filename" />

        </div>
    </div>
</window>`

export const FileExplorerComponent = {

    props: ['wm', 'titleContent'],

    template: template,

    components: {
        'window': WindowComponent,
        'file-item': FileItemComponent,
    },

    data: function() {

        return {
            items: [
                {
                    fileType: 'folder',
                    filename: "home",
                },
                {
                    fileType: 'text',
                    filename: "cdz.txt",
                },
            ],
        }

    },

}
