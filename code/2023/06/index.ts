import * as fs from "fs";

let debugMode = false;

function debugLog(msg: string) {
    if(debugMode) {
        console.log(msg);
    }
}

interface NumArray {
    [index: number]: number;
};

function lines(filename: string): string[] {
   return fs.readFileSync(filename, 'utf8').replace(/[\r\n]+$/, '').split(/\n/);
}

function handleOne(filename: string, check?: Object): void {
    let result = 1;

    let times = lines(filename)[0].replace(/\s+/g, " ").replace(/.*: /, "").split(" ").map(x => parseInt(x));
    let maxes = lines(filename)[1].replace(/\s+/g, " ").replace(/.*: /, "").split(" ").map(x => parseInt(x));

    let data = times.reduce((map, key, index) => { map[key] = maxes[index]; return map; }, {} as NumArray);

    for(const [time_s,distance] of Object.entries(data)) {
       result *= [...Array(parseInt(time_s)).keys()].map(i => { return (i * (parseInt(time_s)-i) > distance ? 1 as number : 0); }).reduce((acc,val) => { return acc + val; }, 0);
    }

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

function handleTwo(filename: string, check?: Object): void {
    let data = lines(filename).join(":").replace(/\s/g, "").split(":").filter(x => parseInt(x)).map(x => parseInt(x));
    let result = [...Array(data[0]).keys()].map(i => { return (i * (data[0]-i) > data[1] ? 1 as number : 0); }).reduce((acc,val) => { return acc + val; }, 0);

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

handleOne('sample-1.txt', 288);
handleOne('data-1.txt', 131376);

handleTwo('sample-2.txt', 71503);
handleTwo('data-2.txt', 34123437);
