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
function nextseq(data) {
    let diffs = data.map((val, idx, arr) => {
        if (idx + 1 < arr.length) {
            return arr[idx + 1] - val;
        }
    }).filter((x) => x !== undefined);
    if (diffs.filter(x => x != 0).length > 0) {
        return data.slice(-1)[0] + nextseq(diffs);
    }
    return data.slice(-1)[0];
}
function handleOne(filename, check) {
    let result = 0;
    lines(filename).map(x => x.split(" ").map(x => parseInt(x))).forEach(x => { result += nextseq(x); });
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
function handleTwo(filename, check) {
    let result = 0;
    lines(filename).map(x => x.split(" ").map(x => parseInt(x)).toReversed()).reverse().forEach(x => { result += nextseq(x); });
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
handleOne('sample-1.txt', 114);
handleOne('data-1.txt', 1681758908);
handleTwo('sample-2.txt', 2);
handleTwo('data-2.txt', 803);
