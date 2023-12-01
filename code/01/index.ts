import * as fs from "fs";

let debugMode = false;

interface StringArray {
    [index: string]: string;
}

function debugLog(msg: string) {
    if(debugMode) {
        console.log(msg);
    }
}

function handleOne(line: string) {
    let matches = line.match(/[0-9]/g);
    let result = parseInt(matches[0].concat(matches.slice(-1)[0]));

    debugLog("Parsed: " + result);

    return result;
}

function handleTwo(line: string) {
    let firstNum = "";
    let lastNum = "";

    let digits: StringArray = {
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9",
        "zero": "0"
    };
    Array(10).fill(0).map((element,index) => digits[index] = index.toString())

    for(let i=0; i < line.length; i++) {
        let matcher = "";

        for(let key in digits) {
            if(key === line.substr(i, key.length)) {
                if(firstNum == "") {
                    firstNum = digits[key];
                }
                lastNum = digits[key];
            }
        }
    }

    debugLog("Parsed: " + firstNum + " " + lastNum);

    return parseInt(firstNum.concat(lastNum));
}

type HandleFunction = {
    (line: string): number;
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

parse('sample-1.txt', handleOne, 142);
parse('data-1.txt', handleOne);

parse('sample-2.txt', handleTwo, 281);
parse('data-2.txt', handleTwo);
