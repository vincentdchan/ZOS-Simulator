import {Emitter} from "../Emitter"

export class WindowsManager extends Emitter {

    constructor() {
        super();

        this._id_counter = 0;
        this._focused_id = 0;

        let zIndex = 0;
        this.zIndexCounter = function () {
            return zIndex++;
        };
    }

    GetZIndexCounter() {
        return this.zIndexCounter;
    }

    FocusWindow(id) {
        this._focused_id = id;
        this.emit("focusedWindowChanged", id);
    }

    GetFocusedId() {
        return this._focused_id;
    }

    GetNewId() {
        return this._id_counter++;
    }

}
