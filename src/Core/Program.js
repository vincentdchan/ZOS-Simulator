
let program_id = 0;

function newInst(op_code, a1, a2, a3) {
    return [op_code, a1, a2, a3];
}

export class Program {

    constructor() {
        this._name = "program#" + program_id++;
        this._constants = [];
        this._instructions = [];
        this._source_map = null;
    }

    AddInstruction(op_code, a1, a2, a3) {
        this._instructions.push(newInst(op_code, a1, a2, a3));
        return this._instructions.length - 1;
    }

    AddConstant(constant) {
        this._constants.push(constant);
        return this._constants.length - 1;
    }

    get constants() {
        return this._constants;
    }

    get instructions() {
        return this._instructions;
    }

    get source_map() {
        return this._source_map;
    }

    set source_map(value) {
        this._source_map = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

}
