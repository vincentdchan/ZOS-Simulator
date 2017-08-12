/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-12 
 ************************/

const OP_STOP   = 0;
const OP_ADD    = 1;
const OP_SUB    = 2;
const OP_MUL    = 3;
const OP_DIV    = 4;
const OP_LOAD   = 5;
const OP_STORE  = 6;
const OP_CMP    = 7;
const OP_JMP    = 8;

export class VM {

    // Run the program directly
    Run(program) {

    }

    // Run the program and listen to the
    // every step of the program
    RunDebug(program, callback) {

    }

    // This method compile 
    // asm file into opcode
    CompileASM(source_code) {

    }

    // Compile and run the program
    Eval(source_code) {

    }

}

function newInst(op_code, a1, a2, a3) {
    return [op_code, a1, a2, a3];
}

export class Program {

    constructor() {
        this._program = [];
        this._contants = [];
    }

    AddInstruction(op_code, a1, a2, a3) {
        this._program.push(newInst(op_code, a1, a2, a3));
    }

    AddConstant(constant) {
        this._contants.push(constant);
        return this._contants.length;
    }

}
