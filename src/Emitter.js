
export class Emitter {

    constructor() {
        this._map = {}
    }

    addEventListener(name, callback) {
        if (name in this._map) {
            this._map[name].push(callback);
        } else {
            this._map[name] = [callback];
        }
    }

    emit() {
        let args = Array.prototype.slice.call(arguments);
        let name = args[0];
        args = args.slice(1);
        if (name in this._map) {
            this._map[name].forEach(v => v.apply(undefined, args))
        }
    }

}
