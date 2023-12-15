import * as fs from "fs";

let debugMode = false;

function debugLog(msg: string) {
    if(debugMode) {
        console.log(msg);
    }
}

interface GameResult {
    idx: number;
    results: GameValue[];
}
interface GameValue {
    [index: string]: number;

}

function parseline(line: string): GameResult {
    // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    let idx = line.split(":")[0].trim().split(" ")[1]
    let ret: GameResult = {
        idx: parseInt(idx),
        results: []
    };

    line.split(":")[1].trim().split(";").forEach((game) => {
        let val: GameValue = {};

        game.trim().split(",").forEach((res) => {
            let x = res.trim().split(" ")
            val[x[1].trim()] = parseInt(x[0].trim())
        });


        ret['results'].push(val);

    });

    return ret;

}

function handleOne(line: string) {
    let res = parseline(line);
    let ok = true;

    res.results.forEach((val) => {
        if(val['red'] > 12 || val['green'] > 13 || val['blue'] > 14) {
            ok = false;
        }
    });

    return (ok ? res.idx : 0);
}

function handleTwo(line: string) {
    let res = parseline(line);
    let min: GameValue = {'red': 0, 'green': 0, 'blue': 0};

    res.results.forEach((val) => {
        ['red','green','blue'].forEach((colour) => {
            if(val[colour] > min[colour]) {
                min[colour] = val[colour];
            }
        });
    });

    return min['red'] * min['green'] * min['blue'];
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

parse('sample-1.txt', handleOne, 8);
parse('data-1.txt', handleOne);

parse('sample-2.txt', handleTwo, 2286);
parse('data-2.txt', handleTwo);
