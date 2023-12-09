import * as fs from "fs";

let debugMode = false;

function debugLog(msg: string) {
    if(debugMode) {
        console.log(msg);
    }
}

function lines(filename: string): string[] {
   return fs.readFileSync(filename, 'utf8').replace(/[\r\n]+$/, '').split(/\n/);
}

function nextseq(data: number[]): number {
    let diffs = data.map((val,idx,arr) => {
        if(idx+1 < arr.length) {
            return arr[idx+1]-val;
        }
    }).filter((x): x is number => x !== undefined);

    if(diffs.filter(x => x != 0).length > 0) {
        return data.slice(-1)[0] + nextseq(diffs);
    }

    return data.slice(-1)[0];
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;

    lines(filename).map(x => x.split(" ").map(x => parseInt(x))).forEach(x => { result += nextseq(x); });

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    
    lines(filename).map(x => x.split(" ").map(x => parseInt(x)).toReversed()).reverse().forEach(x => { result += nextseq(x); });

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

handleOne('sample-1.txt', 114);
handleOne('data-1.txt', 1681758908);

handleTwo('sample-2.txt', 2);
handleTwo('data-2.txt', 803);
