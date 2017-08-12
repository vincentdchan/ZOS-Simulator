/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-12 
 ************************/

export class File {

    constructor(fs, fd) {
        this.fs = fs;
        this.fd = fd;
    }

    Close() {
        this.fs.CloseFile(this);
    }

}

function NewFileField(name, content) {
    return {
        name: name,
        content: content,
        type: "file",
        create_at: new Date(),
        edited_at: new Date(),
    }
}

function NewDirField(name) {
    return {
        name: name,
        type: "folder",
        create_at: new Date(),
        edited_at: new Date(),
        children: {},
    }
}

function checkPath(path) {
    if (path[0] != '/') {
        throw new Error('A path must start width a /');
    }
}

export class FileSystem {

    constructor() {
        this._root = NewDirField("");
        this._open_fds = [];
    }

    GetFd() {
        for (let i = 0; i < this._open_fds.length; i++) {
            if (this._open_fds[i] === null) {
                return i;
            }
        }
        return this._open_fds.length;
    }

    Open(path) {
        let slices = path.split('/').slice(1);
        let current = this._root;
        for (let i = 0; i < slices.length; i++) {
            current = current.children[slices[i]];
            if (typeof current == 'undefined') {
                throw new Error("File not exists");
            }
        }
        let fd = this.GetFd();
        let file = new File(this, fd);
        this._open_fds[fd] = file;
        return file;
    }

    CreateFile(path) {

    }

    CreateAndOpenFile(path) {

    }

    CreateDir(path) {

    }

    Rename(path, newname) {

    }

    RemoveFile(path) {

    }

    RemoveDir(path) {

    }

    Exist(filename) {

    }

    CloseFile(file) {
    }

}
