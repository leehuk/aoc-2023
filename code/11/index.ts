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

interface Pos {
    x: number;
    y: number;
};

function sdist(a: Pos, b: Pos): number {
    return (Math.abs(a['x']-b['x']) + Math.abs(a['y']-b['y']));
}

function handle(filename: string, mult: number): number {
    let result = 0;
    let data = lines(filename).map(x => x.split(""));

    let adjx: number[] = [];
    let adjy: number[] = [];
    let stars = [];

    for(let y = 0; y < data.length; y++) {
        let lstars = [];

        for(let x = 0; x < data[y].length; x++) {
            if(data[y][x] == "#") {
                lstars.push({ x: x, y: y } as Pos);
            }
        }

        if(lstars.length > 0) {
            stars.push(...lstars);
        } else {
            adjy.push(y);
        }
    }

OUTER:
    for(let x = 0; x < data[0].length; x++) {
        for(let y = 0; y < data.length; y++) {
            if(data[y][x] == "#") {
                continue OUTER;
            }
        }

        adjx.push(x);
    }

    stars = stars.map(pos => { return {
        x: pos['x'] + (adjx.filter(x => x < pos['x']).length * mult),
        y: pos['y'] + (adjy.filter(y => y < pos['y']).length * mult)
    } as Pos});

    for(let i = 0; i < stars.length; i++) {
        for(let j = i+1; j < stars.length; j++) {
            result += sdist(stars[i], stars[j]);
        }
    }

    return result;

}

function handleOne(filename: string, check?: Object): void {
    let result = handle(filename, 1);

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

function handleTwo(filename: string, check?: Object): void {
    let result = handle(filename, 999999);

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

handleOne('sample-1.txt', 374);
//handleOne('sample-2.txt', 374);

handleOne('data-1.txt', 9370588);
handleTwo('data-1.txt', 746207878188);

//handleTwo('sample-2.txt', 467835);
