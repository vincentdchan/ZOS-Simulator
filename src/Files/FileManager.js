/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-12 
 ************************/

let TYPE_FILE = 0;
let TYPE_DIR = 1;

let fileTree = {
    name: "",
    type: TYPE_DIR,
    children: [
        {
            name: "code.asm",
            type: TYPE_FILE,
        },
        {
            name: "README.txt",
            type: TYPE_FILE,
        },
        {
            name: "children",
            type: TYPE_DIR,
            children: [
                {
                    name: "abc.txt",
                    type: TYPE_FILE,
                },
                {
                    name: "node_modules",
                    type: TYPE_DIR,
                    children: [
                        {
                            name: "cde.txt",
                            type: TYPE_DIR,
                        }
                    ]
                }
            ]
        }
    ]
}

export class FileManager {

    constructor() {
        this._current_path = "";
    }

    ChangePath(path) {
        this._current_path = path;
    }

    GetAllChildren() {
        let slices = this._current_path.split("/");
    }

    GetCurrentPath() {
        return this._current_path;
    }

}
