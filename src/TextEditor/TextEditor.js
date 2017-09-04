/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-12 
 ************************/

import {WindowComponent} from "../Windows/Window"
import style from "../stylesheets/textEditor.scss"

const template = `<Window v-bind:wm="wm" v-bind:title-content="titleContent">
    <div class="text-editor">
        <div class="toolbar">
            <span class="btn"><i class="fa fa-file-text-o" aria-hidden="true"></i></span>
            <span class="btn"><i class="fa fa-floppy-o" aria-hidden="true"></i></span>
        </div>
        <textarea class="real-editor"></textarea>
    </div>
</Window>`

export const TextEditorComponent = {

    props: ['wm', 'titleContent'],

    template: template,

    components: {
        'Window': WindowComponent,
    },

}
