import * as fs from 'fs';
import * as al from 'leeh-aoc-lib';

let debugMode = false;

function debugLog(msg: string) {
    if(debugMode) {
        console.log(msg);
    }
}

function rwalk(data: string[][], lit: string[][][], row: number, col: number, dir: keyof al.RCPathOption) {
    while(row >= 0 && row < data.length && col >= 0 && col < data[0].length) {
        //console.log(`${row},${col} '${data[row][col]}' moving: ${dir}`);
        let chr = data[row][col];

        if(lit[row][col].includes(dir)) {
            return;
        }
    
        lit[row][col].push(dir);

        if(chr == ".") {
        } else if(chr == "-") {
            if(al.rcrowadj(dir) != 0) {
                rwalk(data, lit, row, col-1, 'west');
                rwalk(data, lit, row, col+1, 'east');
                break;
            }
        } else if(chr == "|") {
            if(al.rccoladj(dir) != 0) {
                rwalk(data, lit, row-1, col, 'north');
                rwalk(data, lit, row+1, col, 'south');
                break;
            }
        } else if(chr == "/") {
            if(al.rcrowadj(dir) > 0) {
                dir = 'west';
            } else if(al.rcrowadj(dir) < 0) {
                dir = 'east';
            } else if(al.rccoladj(dir) > 0) {
                dir = 'north';
            } else if(al.rccoladj(dir) < 0) {
                dir = 'south';
            }
        } else if(chr == "\\") {
            if(al.rcrowadj(dir) > 0) {
                dir = 'east';
            } else if(al.rcrowadj(dir) < 0) {
                dir = 'west';
            } else if(al.rccoladj(dir) > 0) {
                dir = 'south';
            } else if(al.rccoladj(dir) < 0) {
                dir = 'north';
            }
        }
    
        row += al.rcrowadj(dir);
        col += al.rccoladj(dir);
    }
}

function walk(data: string[][], row: number, col: number, dir: keyof al.RCPathOption) {
    let lit = al.fillarrayarr(data.length, data[0].length);
    rwalk(data, lit, row, col, dir);
    return lit.map(row => row.map(col => (col.length > 0 ? 1 as number : 0)).reduce((acc,val) => acc+val, 0)).reduce((acc, val) => acc+val, 0)
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));

    result = walk(data, 0, 0, 'east');

    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let results: number[] = [];

    let data = al.lines(filename).map(x => x.split(""));
    for(let row = 0; row < data.length; row++) {
        results.push(walk(data, row, 0, 'east'));
        results.push(walk(data, row, data[0].length-1, 'west'));
    }

    for(let col = 0; col < data[0].length; col++) {
        results.push(walk(data, 0, col, 'south'));
        results.push(walk(data, data[0].length-1, col, 'north'));
    }

    result = results.reduce((acc, val) => (val >= acc ? val : acc), 0);

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

handleOne('sample-1.txt', 46);
handleOne('data-1.txt', 7728);

handleTwo('sample-1.txt', 51);
handleTwo('data-1.txt', 8061);
