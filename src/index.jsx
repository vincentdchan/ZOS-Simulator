const {VirtualLine}  = require("./VirtualLine.js")
import {WindowsManager} from "./Windows/WindowsManager.js"
import {Window} from "./Windows/Window.jsx"
import {FileWindow} from "./Files/FileWindow.jsx"
import React from "react"
import ReactDOM from 'react-dom'

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

    ReactDOM.render(<div>
        <Window 
            titleName="Untitled 2"
            windowsManager={wm} />
        <FileWindow 
            titleName="File Manager"
            windowsManager={wm} />
    </div>,
        document.getElementById('world'));

});
