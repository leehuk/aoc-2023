"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const al = __importStar(require("leeh-aoc-lib"));
let debugMode = false;
function debugLog(msg) {
    if (debugMode) {
        console.log(msg);
    }
}
function rwalk(data, lit, row, col, dir) {
    while (row >= 0 && row < data.length && col >= 0 && col < data[0].length) {
        //console.log(`${row},${col} '${data[row][col]}' moving: ${dir}`);
        let chr = data[row][col];
        if (lit[row][col].includes(dir)) {
            return;
        }
        lit[row][col].push(dir);
        if (chr == ".") {
        }
        else if (chr == "-") {
            if (al.rcrowadj(dir) != 0) {
                rwalk(data, lit, row, col - 1, 'west');
                rwalk(data, lit, row, col + 1, 'east');
                break;
            }
        }
        else if (chr == "|") {
            if (al.rccoladj(dir) != 0) {
                rwalk(data, lit, row - 1, col, 'north');
                rwalk(data, lit, row + 1, col, 'south');
                break;
            }
        }
        else if (chr == "/") {
            if (al.rcrowadj(dir) > 0) {
                dir = 'west';
            }
            else if (al.rcrowadj(dir) < 0) {
                dir = 'east';
            }
            else if (al.rccoladj(dir) > 0) {
                dir = 'north';
            }
            else if (al.rccoladj(dir) < 0) {
                dir = 'south';
            }
        }
        else if (chr == "\\") {
            if (al.rcrowadj(dir) > 0) {
                dir = 'east';
            }
            else if (al.rcrowadj(dir) < 0) {
                dir = 'west';
            }
            else if (al.rccoladj(dir) > 0) {
                dir = 'south';
            }
            else if (al.rccoladj(dir) < 0) {
                dir = 'north';
            }
        }
        row += al.rcrowadj(dir);
        col += al.rccoladj(dir);
    }
}
function walk(data, row, col, dir) {
    let lit = al.fillarrayarr(data.length, data[0].length);
    rwalk(data, lit, row, col, dir);
    return lit.map(row => row.map(col => (col.length > 0 ? 1 : 0)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0);
}
function handleOne(filename, check) {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));
    result = walk(data, 0, 0, 'east');
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let results = [];
    let data = al.lines(filename).map(x => x.split(""));
    for (let row = 0; row < data.length; row++) {
        results.push(walk(data, row, 0, 'east'));
        results.push(walk(data, row, data[0].length - 1, 'west'));
    }
    for (let col = 0; col < data[0].length; col++) {
        results.push(walk(data, 0, col, 'south'));
        results.push(walk(data, data[0].length - 1, col, 'north'));
    }
    result = results.reduce((acc, val) => (val >= acc ? val : acc), 0);
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
handleOne('sample-1.txt', 46);
handleOne('data-1.txt', 7728);
handleTwo('sample-1.txt', 51);
handleTwo('data-1.txt', 8061);
