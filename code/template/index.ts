import * as fs from "fs";

let debugMode = false;

function debugLog(msg: string) {
    if(debugMode) {
        console.log(msg);
    }
}

function handleOne(line: string) {
}

function handleTwo(line: string) {
}

type HandleFunction = {
    (line: string): void;
};

function parse(filename: string, handler: HandleFunction, check?: Object) {
    let result = 0;

    let data = fs.readFileSync(filename, 'utf8')
    data.split("\n").forEach((line) => { 
        if(line != "") {
            debugLog("handle()::" + line + "::");

            result += handler(line); 
        }
    });

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

parse('sample-1.txt', handleOne);
parse('data-1.txt', handleOne);

parse('sample-2.txt', handleTwo);
parse('data-2.txt', handleTwo);
