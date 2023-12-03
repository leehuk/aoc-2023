import * as fs from "fs";

let debugMode = false;

interface Point {
    x: number;
    y: number;
    value: string;
    part: number;
    family: number;
}

function debugLog(msg: string) {
    if(debugMode) {
        console.log(msg);
    }
}

function lines(filename: string): string[] {
   return fs.readFileSync(filename, 'utf8').replace(/[\r\n]+$/, '').split(/\n/);
}

function neighbours(data: Point[][], x: number, y: number): Point[] {
    let result: Point[] = [];

    [x-1,x,x+1].forEach(xx => {
        [y-1,y,y+1].forEach(yy => {
            if(data[xx] && data[xx][yy]) {
                result.push(data[xx][yy]);
            }
        });
    });

    return result;

}

function parse(filename: string): Point[][] {
    let data: Point[][] = [];

    for(var [x,line] of lines(filename).entries()) {
        debugLog("parse()::" + line + "::");
        data[x] = [];

        for(var [y,chr] of line.split("").entries()) {
            data[x][y] = { x: x, y: y, value: chr, part: 0, family: 0 };
        }
    }

    const matcher = /[^0-9\.]/;
    let family = 1;

    for(let x = 0; x < data.length; x++) {
        let nbs = [];
        let nummers = [];

        for(let y = 0; y < data[x].length+1; y++) {
            const lchar = (data[x][y] ? data[x][y].value : '.');

            if(lchar.match(/[0-9]/)) {
                nummers.push(data[x][y]);
                nbs.push(neighbours(data, x, y));
            } else if(nummers.length > 0) {

                let value = parseInt(nummers.map(pt => pt.value).join(""));
                if(nbs.flat().map(pt => pt.value).join("").match(matcher)) {
                    nummers.forEach(pt => {
                        data[pt.x][pt.y].part = value;
                        data[pt.x][pt.y].family = family;
                    });
                }

                family++;
                nummers = [];
                nbs = [];
            }
        }
    }

    return data;
}

function handleOne(filename: string, check?: Object): void {
    let result = parse(filename).flat().filter((pt) => pt.part).filter((pt,idx,arr) => idx == arr.map(x => x.family).indexOf(pt.family)).map(pt => pt.part).reduce((tot, val) => tot + val, 0);
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;

    let data = parse(filename);
    data.flat().filter((pt) => pt.value == "*").forEach(pt => {
        let nbs = neighbours(data, pt.x, pt.y).flat().filter(pt => pt.part).map(pt => pt.part + "." + pt.family).filter((pt,idx,arr) => idx == arr.indexOf(pt));
        if(nbs.length == 2) {
            result += parseInt(nbs[0]) * parseInt(nbs[1]);
        }
    });

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

handleOne('sample-1.txt', 4361);
handleOne('data-1.txt', 520135);

handleTwo('sample-2.txt', 467835);
handleTwo('data-2.txt');
