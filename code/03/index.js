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
const fs = __importStar(require("fs"));
let debugMode = false;
function debugLog(msg) {
    if (debugMode) {
        console.log(msg);
    }
}
function lines(filename) {
    return fs.readFileSync(filename, 'utf8').replace(/[\r\n]+$/, '').split(/\n/);
}
function neighbours(data, x, y) {
    let result = [];
    [x - 1, x, x + 1].forEach(xx => {
        [y - 1, y, y + 1].forEach(yy => {
            if (data[xx] && data[xx][yy]) {
                result.push(data[xx][yy]);
            }
        });
    });
    return result;
}
function parse(filename) {
    let data = [];
    for (var [x, line] of lines(filename).entries()) {
        debugLog("parse()::" + line + "::");
        data[x] = [];
        for (var [y, chr] of line.split("").entries()) {
            data[x][y] = { x: x, y: y, value: chr, part: 0, family: 0 };
        }
    }
    const matcher = /[^0-9\.]/;
    let family = 1;
    for (let x = 0; x < data.length; x++) {
        let nbs = [];
        let nummers = [];
        for (let y = 0; y < data[x].length + 1; y++) {
            const lchar = (data[x][y] ? data[x][y].value : '.');
            if (lchar.match(/[0-9]/)) {
                nummers.push(data[x][y]);
                nbs.push(neighbours(data, x, y));
            }
            else if (nummers.length > 0) {
                let value = parseInt(nummers.map(pt => pt.value).join(""));
                if (nbs.flat().map(pt => pt.value).join("").match(matcher)) {
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
function handleOne(filename, check) {
    let result = parse(filename).flat().filter((pt) => pt.part).filter((pt, idx, arr) => idx == arr.map(x => x.family).indexOf(pt.family)).map(pt => pt.part).reduce((tot, val) => tot + val, 0);
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
function handleTwo(filename, check) {
    let result = 0;
    let data = parse(filename);
    data.flat().filter((pt) => pt.value == "*").forEach(pt => {
        let nbs = neighbours(data, pt.x, pt.y).flat().filter(pt => pt.part).map(pt => pt.part + "." + pt.family).filter((pt, idx, arr) => idx == arr.indexOf(pt));
        if (nbs.length == 2) {
            result += parseInt(nbs[0]) * parseInt(nbs[1]);
        }
    });
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
handleOne('sample-1.txt', 4361);
handleOne('data-1.txt', 520135);
handleTwo('sample-2.txt', 467835);
handleTwo('data-2.txt');
handleOne('sample-3.txt', 413);
handleTwo('sample-3.txt', 6756);
handleOne('sample-4.txt', 925);
handleTwo('sample-4.txt', 6756);
