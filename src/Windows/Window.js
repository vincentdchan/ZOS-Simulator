import style from "../stylesheets/main.scss"
import * as htmlparser from "htmlparser"

export class Component {

    static Compile() {
        for (let key in template_map) {
            let value = template_map[key];
            let domlist = renderTemplate(value.text);
            let dom_map = vListToDomList(domlist);
        }
    }

    static travaseNode(node) {

    }

    set dom(value) {
        this._dom = value;
    }

    get dom() {
        return this._dom;
    }

    constructor() {
        this._slot = {}
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
        this._dom = doms[0];
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
                        } else {
                            this._slot['default'] = dom;
                        }
                    } else {
                        dom = document.createElement(dom_node.name);
                        for (let attr_key in dom_node.attribs) {
                            let attr_value = dom_node.attribs[attr_key];
                            dom.setAttribute(attr_key, attr_value);
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

    Slot(value) {
        this._dom.appendChild(value);
    }

}

class TitleBar extends Component {

    Render() {
    }

}

const window_template = `<div class="window">
    <div class="titleBar unselectable" >
        <div class="right">
            <i class="fa fa-window-close" aria-hidden="true"></i>
        </div>
        <p class="name">Title</p>
    </div>
    <div>
        <slot name="default" />
    </div>
</div>`

export class Window extends Component {

    constructor() {
        super();
        this.RenderTemplate(window_template);

        this.x = '16px';
        this.y = '16px';
        this.width = '400px';
        this.height = '300px';
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
        // window.addEventListener("mousemove", (event) => this.onMouseMove(event));

        // this.state = {
        //     x: 16,
        //     y: 16,
        //     width: 400,
        //     height: 300,
        //     zIndex: this.windowsManager.zIndexCounter(),
        //     focused: false,
        // };
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
            this.setState({
                x: event.clientX - this.lastOffset.x,
                y: event.clientY - this.lastOffset.y,
            });
            this.lastOffset = {
                x: event.clientX - this.state.x,
                y: event.clientY - this.state.y,
            };
        }
    }

    onTitleBarMouseDown(event) {
        this.titleBarPressed = true;
        this.lastOffset = {
            x: event.clientX - this.state.x,
            y: event.clientY - this.state.y,
        };

        this.setState({
            zIndex: this.windowsManager.zIndexCounter(),
        });
    }

    onTitleBarMouseUp(event) {
        this.titleBarPressed = false;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        if (this._x != value) {
            this._x = value;
            this._dom.style.left = value;
        }
    }

    get y() {
        return this._y;
    }

    set y(value) {
        if (this._y != value) {
            this._y = value;
            this._dom.style.top = value;
        }
    }

    get width() {
        return this._width;
    }

    set width(value) {
        if (this._width != value) {
            this._width = value;
            this._dom.style.width = value;
        }
    }

    get height() {
        return this._height;
    }

    set height(value) {
        if (this._height != value) {
            this._height = value;
            this._dom.style.height = value;
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
