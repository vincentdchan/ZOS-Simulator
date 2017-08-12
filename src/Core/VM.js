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
const OP_NOTSTRICT_EQL = 36;
const OP_SLICE  = 37;

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

export class Context {

    constructor() {
        this._registers = [];
        this._registers.length = 16;
        this._flags = {
            gt: false,
            lt: false,
            zero: false,
            sign: false,
            type: "undefined"
        }
    }

    RunProgram(program) {

    }

    Eval(source_code) {

    }

}

export class Program {

    constructor() {
        this._contants = [];
        this._instructions = [];
    }

    AddInstruction(op_code, a1, a2, a3) {
        this._instructions.push(newInst(op_code, a1, a2, a3));
    }

    AddConstant(constant) {
        this._contants.push(constant);
        return this._contants.length;
    }

}
