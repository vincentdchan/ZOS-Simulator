import {Window} from "../Windows/Window"

const task_manager_template = `<div class="task-manager">
    <div class="tabs">
        <ul>
            <li>Process</li>
            <li>CPU</li>
            <li>Memory</li>
            <li>Information</li>
        </ul>
    </div>
    <div class="main-frame">
        <slot name="processPage" />
        <slot name="cpuPage" />
        <slot name="memoryPage" />
        <slot name="infoPage" />
    </div>
</div>`;

const process_page_template = `<div class="process-page page">
    <table></table>
</div>`;

const cpu_page_template = `<div class="cpu-page page">
</div>`;

const memory_page_template = `<div class="memory-page page">
</div>`;

const info_page_template = `<div class="info-page page">
</div>`;

class TaskManager extends Window {

    constructor() {
        this._dom = this.RenderTemplate(template);

        this.Slot('processPage', this.RenderTemplate(process_page_template));
        this.Slot('cpuPage', this.RenderTemplate(cpu_page_template));
        this.Slot('memoryPage', this.RenderTemplate(memory_page_template));
        this.Slot('infoPage', this.RenderTemplate(info_page_template));
    }

}
