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
;
;
var data;
var path;
function PosFactory(x, y) {
    return {
        x: x,
        y: y,
        north: (data[y] ? ["S", "|", "J", "L"].includes(data[y][x]) : false),
        east: (data[y] ? ["S", "-", "L", "F"].includes(data[y][x]) : false),
        south: (data[y] ? ["S", "|", "7", "F"].includes(data[y][x]) : false),
        west: (data[y] ? ["S", "-", "7", "J"].includes(data[y][x]) : false)
    };
}
function mazeCheck(pos, dir) {
    let frompos = path.slice(-2)[0];
    if (frompos['x'] == pos['x'] && frompos['y'] == pos['y']) {
        return false;
    }
    let startpos = path[0];
    if (startpos['x'] == pos['x'] && startpos['y'] == pos['y']) {
        return true;
    }
    if (pos[dir]) {
        path.push(pos);
        if (mazeRunRecurse(pos)) {
            return true;
        }
        path.pop();
    }
    return false;
}
function mazeRunRecurse(pos) {
    if ((pos['north'] && mazeCheck(PosFactory(pos['x'], pos['y'] - 1), 'south')) ||
        (pos['east'] && mazeCheck(PosFactory(pos['x'] + 1, pos['y']), 'west')) ||
        (pos['south'] && mazeCheck(PosFactory(pos['x'], pos['y'] + 1), 'north')) ||
        (pos['west'] && mazeCheck(PosFactory(pos['x'] - 1, pos['y']), 'east'))) {
        return true;
    }
    return false;
}
function mazeRunLoop(startpos) {
    let cands = [startpos];
    OUTER: while (cands.length > 0) {
        let cand = cands.shift();
        let cl = cands.length;
        path.push(cand);
        let checks = [
            { check: 'north', pos: PosFactory(cand['x'], cand['y'] - 1), from: 'south' },
            { check: 'east', pos: PosFactory(cand['x'] + 1, cand['y']), from: 'west' },
            { check: 'south', pos: PosFactory(cand['x'], cand['y'] + 1), from: 'north' },
            { check: 'west', pos: PosFactory(cand['x'] - 1, cand['y']), from: 'east' }
        ];
        for (let check of checks) {
            let pos = check['pos'];
            let frompos = path.slice(-2)[0];
            if (frompos['x'] == pos['x'] && frompos['y'] == pos['y']) {
                continue;
            }
            if (cand[check['check']] && pos[check['from']]) {
                if (startpos['x'] == pos['x'] && startpos['y'] == pos['y']) {
                    break OUTER;
                }
                cands.unshift(pos);
            }
        }
        if (cl == cands.length) {
            path.pop();
        }
    }
}
function handleOne(filename, check) {
    let result = 0;
    var start;
    data = lines(filename);
    path = [];
    for (let y of data.keys()) {
        let x = data[y].indexOf("S");
        if (x > -1) {
            start = PosFactory(x, y);
            break;
        }
    }
    //path.push(start!);
    //mazeRunRecurse(start!);
    mazeRunLoop(start);
    //maze(start!);
    //console.log(path);
    result = path.length / 2;
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
function handleTwo(filename, check) {
    let result = 0;
    let pathtile = [...Array(data.length)].map(x => x = []);
    let drawtiles = [...Array(data.length)].map(x => x = []);
    path.forEach(pos => { pathtile[pos['y']][pos['x']] = true; });
    for (let y of data.keys()) {
        let vcount = 0;
        let dpos = [];
        for (let x = 0; x < data[y].length; x++) {
            let val = data[y][x];
            if (pathtile[y][x]) {
                if (val == "|" || val == "7" || val == "F" || val == "S") {
                    vcount++;
                }
                if ((vcount % 2) == 0) {
                    result += dpos.length;
                    drawtiles.push(dpos);
                    dpos = [];
                }
            }
            else if ((vcount % 2) == 1) {
                dpos.push(PosFactory(x, y));
            }
        }
    }
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
    let tiles = [];
    for (let y of data.keys()) {
        tiles[y] = [];
        for (let x = 0; x < data[y].length; x++) {
            tiles[y][x] = " ";
        }
    }
    for (let pos of path) {
        tiles[pos['y']][pos['x']] = data[pos['y']][pos['x']];
    }
    for (let pos of drawtiles.flat()) {
        tiles[pos['y']][pos['x']] = "X";
    }
    fs.writeFileSync('filled.txt', tiles.map(x => x.join("")).join("\n"));
}
//handleOne('sample-1.txt', 4);
//handleOne('sample-2.txt', 4);
//handleOne('sample-3.txt', 8);
//handleOne('sample-4.txt', 4);
handleOne('sample-4.txt');
handleTwo('sample-4.txt');
//handleOne('sample-1.txt', 4);
//handleTwo('sample-1.txt');
handleOne('data-1.txt', 7005);
handleTwo('data-1.txt', 417);
