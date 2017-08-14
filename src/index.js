/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-12 
 ************************/

const {VirtualLine}  = require("./VirtualLine.js")
import {WindowsManager} from "./Windows/WindowsManager.js"
import {Window, Component} from "./Windows/Window"
import {TextEditor} from "./TextEditor/TextEditor"
import {FileWindow} from "./Files/FileWindow"
import {ProgramExecutor} from "./ProgramExecutor/ProgramExecutor"
import {TaskManager} from "./TaskManager/TaskManager"
import {VM} from "./Core/VM"

const measure_font = "船";

document.addEventListener("DOMContentLoaded", function(event) { 
    const canvas = document.getElementById("main-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.font = "12px Microsoft YaHei";

    const text = ctx.measureText(measure_font);
    const font_width = text.width;
    const font_height = text.height;

    let virtuallines = [];

    function Initialize() {
        virtuallines = [];

        let virtuallines_length = Math.ceil(canvas.width / font_width);

        for (let i = 0; i < virtuallines_length; i++) {
            let vl = new VirtualLine(i * (font_width + 2), font_width, canvas.height, font_width, 20);
            virtuallines.push(vl);
        }
    }

    window.addEventListener("resize", (e) => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        Initialize();
    })

    Initialize();

    let lastTime = new Date();
    let accuTime = 0;

    function tick() {
        const now = new Date();
        const deltaTime = (now.getTime() - lastTime.getTime()) / 1000;

        accuTime += deltaTime;

        if (accuTime > 0.08) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            virtuallines.forEach((v) => {
                v.paint(ctx, deltaTime);
            })
            accuTime = 0;
        }

        lastTime = now;

        requestAnimationFrame(tick);
    };

    tick();

    let wm = new WindowsManager();
    let vm = new VM();

    let my_window = new TextEditor(wm);
    let pe = new ProgramExecutor(wm);
    let fw = new FileWindow(wm);
    let taskManager = new TaskManager(wm);

    let world = document.getElementById('world');
    my_window.Render(world);
    pe.Render(world);
    fw.Render(world);
    taskManager.Render(world);
});
