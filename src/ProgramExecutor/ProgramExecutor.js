/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-12 
 ************************/

import {Window} from "../Windows/Window.js"
import style from "../stylesheets/programExecutor.scss"

const template = `<div ref="frame" class="program-executor">
    <div class="toolbar unselectable">
        <div ref="runBtn" class="item">
            <img class="undraggable" src="assets/images/exe/run.png" />
        </div>
        <div ref="pauseBtn" class="item">
            <img class="undraggable" src="assets/images/exe/pause.png" />
        </div>
        <div ref="stopBtn" class="item">
            <img class="undraggable" src="assets/images/exe/stop.png" />
        </div>
        <div ref="stepForwardBtn" class="item">
            <img class="undraggable" src="assets/images/exe/step-forward.png" />
        </div>
    </div>
    <div class="main-table row" ref="programFrame">
        <div class="col-8 code-area">
            <div class="line">
                <div class="gutter">1</div>
                <div class="content">ADD R1, 3, 2</div>
            </div>
            <div class="line">
                <div class="gutter">2</div>
                <div class="content">ADD 3</div>
            </div>
            <div class="line">
                <div class="gutter">3</div>
                <div class="content"></div>
            </div>
        </div>
        <div class="col-4 watcher">
            <div class="variable-area" ref="variableArea">
                <div class="title unselectable">Variable Watcher</div>
                <div class="content">
                    <div><span class="variable">a</span>: 3</div>
                    <div><span class="variable">a</span>: 3</div>
                    <div><span class="variable">a</span>: 3</div>
                </div>
            </div>
            <div class="constant-area" ref="variableArea">
                <div class="title unselectable">Constant Watcher</div>
                <div class="content">
                    <div><span class="variable">a</span>: 3</div>
                    <div><span class="variable">a</span>: 3</div>
                    <div><span class="variable">a</span>: 3</div>
                </div>
            </div>
        </div>
    </div>
</div>`

const source_code = `
ADD     R1,  1,  1
ADD     R2, R1,  1
LOAD    R3, R2,  0
STORE   R1, R3,  0
`

export class ProgramExecutor extends Window {

    constructor(wm) {
        super(wm);
        this.Slot('default', this.RenderTemplate(template));
        this.width = 640;
        this.height = 480;

        this.$refs.frame.style.height = this.height - 16 + 'px';
        this.$refs.programFrame.style.height = this.height - 16 - 48 + 'px';

        this.$refs.runBtn.addEventListener('click', (e) => this.onRunClicked(e));
        this.$refs.pauseBtn.addEventListener('click', (e) => this.onPauseClicked(e));
        this.$refs.stopBtn.addEventListener('click', (e) => this.onStopClicked(e));
        this.$refs.stepForwardBtn.addEventListener('click', (e) => this.onStepForwardClicked(e));

        this.title = "Program Executor";
    }

    onRunClicked(event) {

    }

    onPauseClicked(event) {

    }

    onStopClicked(event) {

    }

    onStepForwardClicked(event) {

    }

}
