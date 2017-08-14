/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-14 
 ************************/ 

import {Window} from "../Windows/Window"
import style from "../stylesheets/taskManager.scss"

const task_manager_template = `<div id="task-manager" class="task-manager">
    <div class="tabs">
        <ul class="unselectable">
            <li v-bind:class="{ active: nav_number == 1}" v-on:click="choose(1)">Process</li>
            <li v-bind:class="{ active: nav_number == 2}" v-on:click="choose(2)">CPU</li>
            <li v-bind:class="{ active: nav_number == 3}" v-on:click="choose(3)">Memory</li>
            <li v-bind:class="{ active: nav_number == 4}" v-on:click="choose(4)">Information</li>
        </ul>
    </div>
    <div class="main-frame">
        <slot name="processPage" />
        <slot name="cpuPage" />
        <slot name="memoryPage" />
        <slot name="infoPage" />
    </div>
</div>`;

const process_page_template = `<div v-show="nav_number == 1" class="process-page page">
    <table>
        <thead>
            <tr>
                <th>PID</th>
                <th>Process Name</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>#aaa</td>
                <td>Name.asm</td>
            </tr>
        </tbody>
    </table>
</div>`;

const cpu_page_template = `<div v-show="nav_number == 2" class="cpu-page page">
</div>`;

const memory_page_template = `<div v-show="nav_number == 3" class="memory-page page">
</div>`;

const info_page_template = `<div v-show="nav_number == 4" class="info-page page">
    <div class="content-body">
        <h1>ZOS</h1>
        <table>
            <tbody>
                <tr>
                    <td class="name">ComputerName</td>
                    <td>ZOS-Simualtor</td>
                </tr>
                <tr>
                    <td class="name">Company</td>
                    <td>fsociety</td>
                </tr>
                <tr>
                    <td class="name">OS Version</td>
                    <td>ZOS-1.0.0</td>
                </tr>
                <tr>
                    <td class="name">Processor</td>
                    <td>ZVM 1.0.0</td>
                </tr>
                <tr>
                    <td class="name">Memory</td>
                    <td>256k</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>`;

export class TaskManager extends Window {

    constructor(wm) {
        super(wm);
        this.Slot('default', this.RenderTemplate(task_manager_template));

        this.Slot('processPage', this.RenderTemplate(process_page_template));
        this.Slot('cpuPage', this.RenderTemplate(cpu_page_template));
        this.Slot('memoryPage', this.RenderTemplate(memory_page_template));
        this.Slot('infoPage', this.RenderTemplate(info_page_template));

        this.width = 640;
        this.height = 480;

        this.title = "Task Manager"
    }

    Render(dom) {
        super.Render(dom);
    }

    onMounted() {
        let app = new Vue({
            el: '#task-manager',
            data: {
                nav_number: 1,
                message: 'Hello world',
            },
            methods: {

                choose(number) {
                    this.nav_number = number;
                }

            }
        });
    }

}
