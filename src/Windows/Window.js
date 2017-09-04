/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-12 
 ************************/

import style from "../stylesheets/main.scss"

const window_template = `<div class="window" ref="frame" :style="{ left: x + 'px', top: y + 'px', zIndex: zIndex }"
    v-on:mousedown="onMouseDown($event)">
    <div class="titleBar unselectable" ref="titlebar" 
        v-on:mouseup="onTitleBarMouseUp($event)"
        v-on:mousedown="onTitleBarMouseDown($event)">

        <div class="right">
            <i class="fa fa-window-close" aria-hidden="true"></i>
        </div>
        <p class="name" >{{ titleContent }}</p>
    </div>
    <div>
        <slot />
    </div>
</div>`

export const WindowComponent =  {
    props: ['wm', 'titleContent'],
    template: window_template,

    mounted: function() {
        this.zIndex = this.wm.zIndexCounter();
        this.windowsID = this.wm.GetNewId();

        this.wm.addEventListener("focusedWindowChanged", (id) => {
            if (id === this.windowsID) {
                this.$refs.frame.focus();
            } else {
                this.unfocus();
            }
        });
        window.addEventListener("mousemove", (event) => this.onMouseMove(event));
    },

    data: () => {
        return {
            x: 16,
            y: 16,
            width: 400,
            height: 300,
            title: "Window",
            titleBarPressed: false,
            focused: false,
            zIndex: 0,
            windowsID: -1,
        }
    },

    methods: {

        focus: function() {
            if (!this._focused) {
                this._focused = true;
                this.zIndex = this.wm.zIndexCounter(); 
                this._dom.classList.add('glowing-border');
            }
        },

        unfocus: function() {
            this._focused = false;
            this._dom.classList.remove('glowing-border');
        },

        onMouseDown: function(event) {
            this.wm.FocusWindow(this.windowsID);
        },

        onMouseMove: function(event) {
            if (this.titleBarPressed) {
                this.x = event.clientX - this.lastOffset.x,
                this.y = event.clientY - this.lastOffset.y,
                this.lastOffset = {
                    x: event.clientX - this.x,
                    y: event.clientY - this.y,
                };
            }
        },

        onTitleBarMouseDown: function(event) {
            this.titleBarPressed = true;
            this.lastOffset = {
                x: event.clientX - this.x,
                y: event.clientY - this.y,
            };

            this.zIndex = this.wm.zIndexCounter();
        },

        onTitleBarMouseUp: function(event) {
            this.titleBarPressed = false;
        },

    },
}
