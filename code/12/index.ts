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

let cache: {[index: string]: number} = {};

function rexplode(spring: string, check: number[], sidx: number = 0, cidx: number = 0, sc: number = 0): number {
    for(let i = sidx; i < spring.length; i++) {
        if(spring[i] == "?") {
            let ckey = spring.slice(i) + "|" + sidx + "|" + cidx + "|" + sc;

            if(cache[ckey] !== undefined) {
                return cache[ckey];
            }

            // out of possible matches, we can only wildcard to "." now
            if(check[cidx] === undefined) {
                if(sc > 0) {
                    return 0;
                }

                continue;
            }

            let result = rexplode("#" + spring.slice(i+1), check, sidx, cidx, sc) + rexplode("." + spring.slice(i+1), check, sidx, cidx, sc);
            cache[ckey] = result;
            return result;    
        } else if(spring[i] == "#") {
            sc++;
            if(cidx >= check.length || sc > check[cidx]) {
                return 0;
            }
        } else if(spring[i] == ".") {
            if(sc > 0) {
                if(sc != check[cidx]) {
                    return 0;
                }
                cidx++;
                sc = 0;
            }
        }
    }

    if(sc > 0) {
        if(sc != check[cidx]) {
            return 0;
        }
        cidx++;
    }

    if(check[cidx]) {
        return 0;
    }

    return 1;
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;

    let springs = lines(filename).map(x => x.split(" ")[0]);
    let checks = lines(filename).map(x => x.split(" ")[1].split(",").map(x => parseInt(x)));

    for(let i = 0; i < springs.length; i++) {
        cache = {};
        result += rexplode(springs[i], checks[i]);
    }

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;

    let springs = lines(filename).map(x => x.split(" ")[0]).map(x => [...Array(5)].fill(x).join("?"));
    let checks = lines(filename).map(x => x.split(" ")[1]).map(x => [...Array(5)].fill(x).join(",").split(",").map(x => parseInt(x)));

    for(let i = 0; i < springs.length; i++) {
        cache = {};
        result += rexplode(springs[i], checks[i]);
    }

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

//handleOne('sample-2.txt', 1);

handleOne('sample-1.txt', 21);
handleOne('data-1.txt', 7771);

handleTwo('sample-1.txt', 525152);
handleTwo('data-1.txt', 10861030975833);
