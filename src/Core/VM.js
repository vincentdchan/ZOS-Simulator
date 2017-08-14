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
const OP_TOINT  = 64;
const OP_TOSTR  = 65;

export class VM {

    constructor() {
        this._context_queue = [];
        this._current_context = null;
    }

    // Run the program directly
    Run(program) {
        let new_pid = this._context_queue.length;
        let ctx = new Context();
        ctx.pid = new_pid;
        ctx.program = program;
        this._context_queue.push(ctx);
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

    ExtractRegisterNumber(content) {
        if (content[0] != 'R' && content[0] != 'r')
            throw new Error("OP must be a register");
        return parseInt(content[1]);
    }

    Step() {
        let ctx = this._current_context;
        let current_pc = ctx.pc;
        ctx.pc++;

        let inst = ctx.program.instructions[current_pc];
        let op_code = inst[0],
            op1 = inst[1],
            op2 = inst[2],
            op3 = inst[3];

        function GetValue(op) {
            if (typeof op == "number") {
                return op;
            } else if (typeof op == "string") {
                if (op[0] == 'R' || op[0] == 'r')  {
                    return ctx.registers[parseInt(op[1])];
                } else if (op[0] == 'C' || op[0] == 'c') {
                    return ctx.program.constants[parseInt(op[1])];
                } else {
                    throw new Error("Not a register");
                }
            } else {
                throw new Error("Not a legal type: " + typeof op);
            }
        }
        let targetReisterNumber, val1, val2, newValue;
        switch(inst[0]) {
        case OP_STOP:
            this.Kill(ctx.pid);
            break;
        case OP_ADD:
            targetReisterNumber = this.ExtractRegisterNumber(op1);
            val1 = GetValue(op2);
            val2 = GetValue(op3);
            newValue = val1 + val2;
            ctx.registers[targetReisterNumber] = newValue;
            ctx.flags.type = typeof newValue;
            ctx.flags.zero = newValue === 0;
            ctx.flags.sign = newValue < 0;
            break;
        case OP_SUB:
            targetReisterNumber = this.ExtractRegisterNumber(op1);
            val1 = GetValue(op2);
            val2 = GetValue(op3);
            newValue = val1 - val2;
            ctx.registers[targetReisterNumber] = newValue;
            ctx.flags.type = typeof newValue;
            ctx.flags.zero = newValue === 0;
            ctx.flags.sign = newValue < 0;
            break;
        case OP_MUL:
            targetReisterNumber = this.ExtractRegisterNumber(op1);
            val1 = GetValue(op2);
            val2 = GetValue(op3);
            newValue = val1 * val2;
            ctx.registers[targetReisterNumber] = newValue;
            ctx.flags.type = typeof newValue;
            ctx.flags.zero = newValue === 0;
            ctx.flags.sign = newValue < 0;
            break;
        case OP_DIV:
            targetReisterNumber = this.ExtractRegisterNumber(op1);
            val1 = GetValue(op2);
            val2 = GetValue(op3);
            newValue = val1 / val2;
            ctx.registers[targetReisterNumber] = newValue;
            ctx.flags.type = typeof newValue;
            ctx.flags.zero = newValue === 0;
            ctx.flags.sign = newValue < 0;
            break;
        case OP_LOAD:
            break;
        case OP_STORE:
            break;
        case OP_CMP:
            val1 = GetValue(op1);
            val2 = GetValue(op2);
            if (typeof val1 != "number" && typeof val2 != "number") {
                throw new Error("You can not compare somthing that is not number.");
            }
            ctx.flags.zero = val === val2;
            ctx.flags.sign = val1 < val2;
            break;
        case OP_JMP:
            val1 = GetValue(op1);
            if (typeof val1 != "number") {
                throw new Error("You can not jump to an offset that is not number.");
            }
            ctx.pc = val1;
            break;
        case OP_NOTSTRICT_EQL:
            val1 = GetValue(op1);
            val2 = GetValue(op2);
            ctx.flags.zero = val1 == val2;
            break;
        case OP_SLICE:
            targetReisterNumber = this.ExtractRegisterNumber(op1);
            val1 = GetValue(op2);
            val2 = GetValue(op3);
            ctx.registers[targetReisterNumber] = ctx.registers[targetReisterNumber].slice(val1, val2);
            break;
        case OP_TOINT:
            targetReisterNumber = this.ExtractRegisterNumber(op1);
            val1 = GetValue(op2);
            ctx.registers[targetReisterNumber] = parseInt(val1);
            ctx.flags.sign = "number";
            break;
        case OP_TOSTR:
            targetReisterNumber = this.ExtractRegisterNumber(op1);
            val1 = GetValue(op2);
            ctx.registers[targetReisterNumber] = val1.toString();
            ctx.flags.sign = "string";
            break;
        }
    }

    Kill(pid) {
        throw new Error("Not implemented");
    }

    get pc() {
        return this._current_context.pc;
    }

    get flags() {
        return this._current_context.flags;
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
            zero: false,    // equal
            sign: false,    // less than
            type: "undefined"
        }
        this._pc = 0;
        this._pid = -1;
    }

    get registers() {
        return this._registers;
    }

    get program() {
        return this._program;
    }

    set program(value) {
        this._program = value;
    }

    set pc(value) {
        this._pc = value;
    }

    get pc() {
        return this._pc;
    }

    set pid(value) {
        this._pid = value;
    }

    get pid() {
        return this._pid;
    }

    get flags() {
        return this._flags;
    }

}

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
