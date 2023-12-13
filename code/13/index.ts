import * as fs from "fs";
import { StringMappingType } from "typescript";

let debugMode = false;

function debugLog(msg: string) {
    if(debugMode) {
        console.log(msg);
    }
}

function lines(filename: string): string[] {
   return fs.readFileSync(filename, 'utf8').replace(/[\r\n]+$/, '').split(/\n/);
}

function fdiv(buf: string[][], fuzzy: boolean = false): number {
    let result = -1;

    OUTER:
    for(let y = 0; y < buf.length-1; y++) {
        let diff = buf[y].reduce((acc,val,idx) => { return (buf[y][idx] == buf[y+1][idx] ? acc : acc+1); }, 0);

        if(diff == 0 || (fuzzy && diff == 1)) {
            let ldiff = 0;

            for(let yl = y-1, yr=y+2; yl >= 0 && yr < buf.length; yl--, yr++) {
                ldiff += buf[yl].reduce((acc,val,idx) => { return (buf[yl][idx] == buf[yr][idx] ? acc : acc+1); }, 0);
            }

            if((!fuzzy && diff == 0 && ldiff == 0) || (fuzzy && ((diff == 1 && ldiff == 0) || (diff == 0 && ldiff == 1)))) {
                result = y+1;
                break OUTER;
            }

            continue OUTER;
        }
    }

    return result;
}

function fsolve(filename: string, fuzzy: boolean = false): number {
    let result = 0;

    let buf: string[][] = [];
    [...lines(filename),""].forEach(line => {
        if(line == "") {
            let ydiv = fdiv(buf, fuzzy);
            let xbuf = buf[0].map((_, idx) => buf.map(row => row[idx]));
            let xdiv = fdiv(xbuf, fuzzy);
        
            result += (ydiv >= 0 ? (ydiv*100) : 0) + (xdiv >= 0 ? xdiv : 0);
            buf = [];
        } else {
            buf.push(line.split(""));
        }
    });

    return result;
}

function handleOne(filename: string, check?: Object): void {
    let result = fsolve(filename);
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

function handleTwo(filename: string, check?: Object): void {
    let result = fsolve(filename, true);
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

handleOne('sample-1.txt', 405);
handleOne('data-1.txt', 36041);

handleTwo('sample-1.txt', 400);
handleTwo('data-2.txt', 35915);
