
export class Program {

    constructor() {
        this._constants = [];
        this._instructions = [];
    }

    AddInstruction(op_code, a1, a2, a3) {
        this._instructions.push(newInst(op_code, a1, a2, a3));
    }

    AddConstant(constant) {
        this._constants.push(constant);
        return this._constants.length;
    }

    get constants() {
        return this._constants;
    }

    get instructions() {
        return this._instructions;
    }

}
