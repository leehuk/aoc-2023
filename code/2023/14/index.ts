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

interface TiltInfo {
    north: TiltDetail,
    east: TiltDetail,
    south: TiltDetail,
    west: TiltDetail
}
interface TiltDetail {
    rowadj: number,
    coladj: number
}

let tiltInfo: TiltInfo = {
    north: { rowadj: -1, coladj: 0 },
    east: { rowadj: 0, coladj: 1 },
    south: { rowadj: 1, coladj: 0 },
    west: { rowadj: 0, coladj: -1 }
};

function tilt(data: string[][], dir: keyof TiltInfo = "north") {
    for(let row = (dir == "south" ? data.length - 1 : 0); row >= 0 && row < data.length; row += (dir == "south" ? -1 : 1)) {
        for(let col = (dir == "east" ? data[0].length - 1 : 0); col >= 0 && col < data[0].length; col += (dir == "east" ? -1 : 1)) {
            if(data[row][col] != "O") {
                continue;
            }

            let cand = -1;

            if(tiltInfo[dir]['rowadj']) {
                for(let nrow = row + tiltInfo[dir]['rowadj']; nrow >= 0 && nrow < data.length; nrow += tiltInfo[dir]['rowadj']) {
                    if(data[nrow][col] == ".") {
                        cand = nrow;
                    } else {
                        break;
                    }
                }

                if(cand > -1) {
                    data[cand][col] = "O";
                    data[row][col] = ".";
                }
            } else {
                for(let ncol = col + tiltInfo[dir]['coladj']; ncol >= 0 && ncol < data[0].length; ncol += tiltInfo[dir]['coladj']) {
                    if(data[row][ncol] == ".") {
                        cand = ncol;
                    } else {
                        break;
                    }
                }

                if(cand > -1) {
                    data[row][cand] = "O";
                    data[row][col] = ".";
                }
            }
        }
    }
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;

    let data = lines(filename).map(x => x.split(""));
    tilt(data);
    result = data.map(x => x.reduce((acc, val) => (val == "O" ? acc+1 : acc), 0)).reduce((acc, val, idx) => acc += ((data.length - idx) * val), 0);

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

let cache: {[index: string]: number} = {};

function handleTwo(filename: string, check?: Object): void {
    let result = 0;

    let data = lines(filename).map(x => x.split(""));

    let limit = 1000000000;
    for(let i = 0; i < limit; i++) {
        let ckey = data.map(x => x.join("")).join("");

        // we've found our loop, skip forward
        if(cache[ckey] !== undefined) {
            let loopval = i-cache[ckey];

            while(i + loopval < limit) {
                i += loopval;
            }
        } else {
            cache[ckey] = i;
        }

        tilt(data, "north");
        tilt(data, "west");
        tilt(data, "south");
        tilt(data, "east");
    }

    result = data.map(x => x.reduce((acc, val) => (val == "O" ? acc+1 : acc), 0)).reduce((acc, val, idx) => acc += ((data.length - idx) * val), 0);

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

handleOne('sample-1.txt', 136);
handleOne('data-1.txt', 109939);

handleTwo('sample-1.txt', 64);
handleTwo('data-1.txt', 101010);
