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
function ahash(str) {
    let val = 0;
    for (let i = 0; i < str.length; i++) {
        val += str.charCodeAt(i);
        val *= 17;
        val = (val % 256);
    }
    return val;
}
function handleOne(filename, check) {
    let result = 0;
    result = lines(filename)[0].split(",").map(x => ahash(x)).reduce((acc, val) => acc + val, 0);
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
function handleTwo(filename, check) {
    let result = 0;
    let boxes = [...Array(256)].fill(undefined).map(x => new Map());
    lines(filename)[0].split(",").forEach(op => {
        let match = op.match(/^([A-Za-z]+)(-|=[0-9]+)$/);
        if (match) {
            let label = match[1];
            let box = ahash(match[1]);
            let action = match[2];
            if (action == "-") {
                boxes[box].delete(label);
            }
            else {
                boxes[box].set(label, parseInt(action.slice(1)));
            }
        }
    });
    for (let i = 0; i < boxes.length; i++) {
        let j = 0;
        boxes[i].forEach((power) => { result += (i + 1) * (j + 1) * power; j++; });
    }
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
handleOne('sample-1.txt', 1320);
handleOne('data-1.txt');
handleTwo('sample-1.txt', 145);
handleTwo('data-1.txt', 291774);
