/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-12 
 ************************/

import {Window} from "../Windows/Window.js"
import style from "../stylesheets/programExecutor.scss"

const template = `<div class="program-executor">
    <div class="toolbar unselectable">
        <div class="item">
            <img src="assets/images/exe/run.png" />
        </div>
        <div class="item">
            <img src="assets/images/exe/pause.png" />
        </div>
        <div class="item">
            <img src="assets/images/exe/stop.png" />
        </div>
        <div class="item">
            <img src="assets/images/exe/step-forward.png" />
        </div>
    </div>
    <table class="main-table">
        <tbody>
            <tr>
                <td>
                    <div class="line">
                        <div class="gutter">1</div>
                        <div>ADD 3</div>
                    </div>
                </td>
                <td>
                    <div>
                        <div>a: 3</div>
                        <div>a: 3</div>
                        <div>a: 3</div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>`

export class ProgramExecutor extends Window {

    constructor(wm) {
        super(wm);
        this.Slot('default', this.RenderTemplate(template));
    }

}
