import style from "../stylesheets/main.scss"
import * as htmlparser from "htmlparser"

export class Component {

    set dom(value) {
        this._dom = value;
    }

    get dom() {
        return this._dom;
    }

    constructor() {
        this._slot = {};
        this.$refs = {};
    }

    RenderTemplate(template) {
        let handle = new htmlparser.DefaultHandler((error, dom) => {
            if (error) {
                console.error(error);
            }
        })

        let parser = new htmlparser.Parser(handle);
        parser.parseComplete(template);
        // console.log(JSON.stringify(handle.dom, null, 2));
        let doms = this.vListToDomList(handle.dom);
        return doms[0];
    }

    vListToDomList(vlist) {
        return vlist.map((dom_node) => {
            switch(dom_node.type) {
                case "text":
                    return document.createTextNode(dom_node.data);
                case "tag":
                    let dom;
                    if (dom_node.name == "slot") {
                        dom = document.createElement("div");
                        if ("attribs" in dom_node && "name" in dom_node.attribs) {
                            let slot_name = dom_node.attribs.name;
                            this._slot[slot_name] = dom;
                            dom.setAttribute('data-slot-name', slot_name);
                        } else {
                            this._slot['default'] = dom;
                            dom.setAttribute('data-slot-name', 'default');
                        }
                    } else {
                        dom = document.createElement(dom_node.name);
                        for (let attr_key in dom_node.attribs) {
                            if (attr_key == 'ref') {
                                let attr_value = dom_node.attribs[attr_key];
                                this.$refs[attr_value] = dom;
                            } else {
                                let attr_value = dom_node.attribs[attr_key];
                                dom.setAttribute(attr_key, attr_value);
                            }
                        }
                        if ('children' in dom_node) {
                            this.vListToDomList(dom_node['children']).forEach((value) => {
                                dom.appendChild(value);
                            })
                        }
                    }
                    return dom;
                case "comment":
                    break;
                case "script":
                    break;
                default:
                    console.log(dom_node);
            }
        })
    }

    Slot(name, value) {
        this._slot[name].appendChild(value);
    }

}

class TitleBar extends Component {

    Render() {
    }

}

const window_template = `<div class="window" ref="frame">
    <div class="titleBar unselectable" ref="titlebar">
        <div class="right">
            <i class="fa fa-window-close" aria-hidden="true"></i>
        </div>
        <p class="name" ref="title_content"></p>
    </div>
    <div>
        <slot name="default" />
    </div>
</div>`

export class Window extends Component {

    constructor() {
        super();
        this._dom = this.RenderTemplate(window_template);

        this.x = 16;
        this.y = 16;
        this.width = 400;
        this.height = 300;
        this.title = "Window";
        // super(props);

        // this.titleBarPressed = false;

        // this.windowsManager = props.windowsManager;
        // this.windowsID = this.windowsManager.GetNewId();
        // this.windowsManager.addEventListener("focusedWindowChanged", (id) => {
        //     if (id === this.windowsID) {
        //         this.focus();
        //     } else {
        //         this.unfocus();
        //     }
        // });
        window.addEventListener("mousemove", (event) => this.onMouseMove(event));

        // this.state = {
        //     x: 16,
        //     y: 16,
        //     width: 400,
        //     height: 300,
        //     zIndex: this.windowsManager.zIndexCounter(),
        //     focused: false,
        // };
        this.$refs.titlebar.addEventListener('mouseup', (e) => this.onTitleBarMouseUp(e));
        this.$refs.titlebar.addEventListener('mousedown', (e) => this.onTitleBarMouseDown(e));
    }

    focus() {
        if (!this.state.focused) {
            this.setState({
                focused: true,
                zIndex: this.windowsManager.zIndexCounter(),
            });
        }
    }

    unfocus() {
        this.setState({
            focused: false
        });
    }

    render() {
        // const myStyle = {
        //     left: this.state.x + "px",
        //     top: this.state.y + "px",
        //     width: this.state.width + "px",
        //     height: this.state.height + "px",
        //     zIndex: this.state.zIndex,
        // };
        // let classList = "window";
        // if (this.state.focused) {
        //     classList += " glowing-border";
        // }
        // return <div className={classList} style={myStyle} onMouseDown={this.onMouseDown.bind(this)}>
        //     <TitleBar name={this.props.titleName}
        //     onMouseUp={this.onTitleBarMouseUp.bind(this)} 
        //     onMouseDown={this.onTitleBarMouseDown.bind(this)}  />
        //     <div>{ this.props.children }</div>
        // </div>
    }

    onMouseDown(event) {
        this.windowsManager.FocusWindow(this.windowsID);
    }

    onMouseMove(event) {
        if (this.titleBarPressed) {
            this.x = event.clientX - this.lastOffset.x,
            this.y = event.clientY - this.lastOffset.y,
            this.lastOffset = {
                x: event.clientX - this.x,
                y: event.clientY - this.y,
            };
        }
    }

    onTitleBarMouseDown(event) {
        this.titleBarPressed = true;
        this.lastOffset = {
            x: event.clientX - this.x,
            y: event.clientY - this.y,
        };

        // this.setState({
        //     zIndex: this.windowsManager.zIndexCounter(),
        // });
    }

    onTitleBarMouseUp(event) {
        this.titleBarPressed = false;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        if (this._title != value) {
            this.$refs['title_content'].innerText = value;
            this._title = value;
        }
    }

    get x() {
        return this._x;
    }

    set x(value) {
        if (this._x !== value) {
            this._x = value;
            this._dom.style.left = value + 'px';
        }
    }

    get y() {
        return this._y;
    }

    set y(value) {
        if (this._y !== value) {
            this._y = value;
            this._dom.style.top = value + 'px';
        }
    }

    get width() {
        return this._width;
    }

    set width(value) {
        if (this._width !== value) {
            this._width = value;
            this._dom.style.width = value + 'px' ;
        }
    }

    get height() {
        return this._height;
    }

    set height(value) {
        if (this._height !== value) {
            this._height = value;
            this._dom.style.height = value + 'px';
        }
    }

}


// Component.RegisterTemplate('window', `
// <div class="window">
//     <title-bar />
//     <div>
//         <slot />
//     </div>
// </div>
// `)

// Component.RegisterTemplate('title-bar', titlebar_tamplate);
