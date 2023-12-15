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

function ahash(str: string): number {
    let val = 0;
    for(let i = 0; i < str.length; i++) {
        val += str.charCodeAt(i);
        val *= 17;
        val = (val % 256);
    }

    return val;
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;

    result = lines(filename)[0].split(",").map(x => ahash(x)).reduce((acc,val) => acc+val, 0);

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

interface Lens {
    label: string;
    power: number;
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;

    let boxes: Lens[][] = [...Array(256)].fill(undefined).map(x => []);

    lines(filename)[0].split(",").forEach(op => {
        let match = op.match(/^([A-Za-z]+)(-|=[0-9]+)$/);
        if(match) {
            let label = match[1];
            let box = ahash(match[1]);
            let action = match[2];

            if(action == "-") {
                for(let i = 0; i < boxes[box].length; i++) {
                    let lens: Lens = boxes[box][i];
                    if(lens['label'] == label) {
                        boxes[box].splice(i, 1);
                        break;
                    }
                }
            } else {
                let found = false;

                for(let i = 0; i < boxes[box].length; i++) {
                    let lens: Lens = boxes[box][i];
                    if(lens['label'] == label) {
                        lens['power'] = parseInt(action.slice(1));
                        found = true;
                        break;
                    }
                }

                if(!found) {
                    boxes[box].push(({ label: label, power: parseInt(action.slice(1)) } as Lens));
                }
            }
        }
    });

    for(let i = 0; i < boxes.length; i++) {
        for(let j = 0; j < boxes[i].length; j++) {
            result += (i+1) * (j+1) * boxes[i][j].power;
        }
    }

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

handleOne('sample-1.txt', 1320);
handleOne('data-1.txt');

handleTwo('sample-1.txt', 145);
handleTwo('data-1.txt', 291774);
