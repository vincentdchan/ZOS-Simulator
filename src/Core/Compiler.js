/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-14 
 ************************/ 
import {Program} from "./Program"

let regex_line = /([a-zA-Z]+)\s+([RC]?\d+)\s*,\s*([RC]?\d+|\s+)\s*,\s*([RC]?\d+|\s+)\s*(;.*)?/;
let regex_define = /(define|DEFINE)\s+(\w+)\s+"((\\"|\w)+)"/
let regex_comment = /\s*(;.*)?/;

export function Compile(source_code) {
    let lines = source_code.split("\n");
    let program = new Program();

    let source_map;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let result;
        if ((result = regex_line.exec(line)) !== null) {
            let inst_id = program.AddInstruction(result[1], result[2], result[3], result[4]);
            source_map[inst_id] = i;
        } else if ((result = regex_define.exec(line)) != null) {
            let define_name = result[2],
                define_value = result[3];
        } else if ((result = regex_comment.exec(line)) !== null) {
            // comment line, ignore it
        } else {
            throw new Error("Compile error: " + line);
        }
    }

    program.source_map = source_map;

    return program;
}
