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
function sdist(a, b) {
    return (Math.abs(a['x'] - b['x']) + Math.abs(a['y'] - b['y']));
}
function handle(filename, mult) {
    let result = 0;
    let data = lines(filename).map(x => x.split(""));
    let adjx = [];
    let adjy = [];
    let stars = [];
    for (let y = 0; y < data.length; y++) {
        let lstars = [];
        for (let x = 0; x < data[y].length; x++) {
            if (data[y][x] == "#") {
                lstars.push({ x: x, y: y });
            }
        }
        if (lstars.length > 0) {
            stars.push(...lstars);
        }
        else {
            adjy.push(y);
        }
    }
    OUTER: for (let x = 0; x < data[0].length; x++) {
        for (let y = 0; y < data.length; y++) {
            if (data[y][x] == "#") {
                continue OUTER;
            }
        }
        adjx.push(x);
    }
    stars = stars.map(pos => {
        return {
            x: pos['x'] + (adjx.filter(x => x < pos['x']).length * mult),
            y: pos['y'] + (adjy.filter(y => y < pos['y']).length * mult)
        };
    });
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            result += sdist(stars[i], stars[j]);
        }
    }
    return result;
}
function handleOne(filename, check) {
    let result = handle(filename, 1);
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
function handleTwo(filename, check) {
    let result = handle(filename, 999999);
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
handleOne('sample-1.txt', 374);
//handleOne('sample-2.txt', 374);
handleOne('data-1.txt', 9370588);
handleTwo('data-1.txt', 746207878188);
//handleTwo('sample-2.txt', 467835);
