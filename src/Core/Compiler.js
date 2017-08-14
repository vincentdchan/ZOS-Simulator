/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-14 
 ************************/ 
import {Program} from "./Program"

let regex_line = /([a-zA-Z]+)\s+([RC]?\d+)\s*,\s*([RC]?\d+)\s*,\s*([RC]?\d+)\s*(;.*)?/;
let regex_comment = /\s*(;.*)?/;

export function Compile(source_code) {
    let lines = source_code.split("\n");

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let result;
        if ((result = regex_line.exec(line)) !== null) {

        } else if ((result = regex_comment.exec(line)) !== null) {

        } else {
            throw new Error("Compile error: " + line);
        }
    }
}
