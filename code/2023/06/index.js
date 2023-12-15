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
;
function lines(filename) {
    return fs.readFileSync(filename, 'utf8').replace(/[\r\n]+$/, '').split(/\n/);
}
function handleOne(filename, check) {
    let result = 1;
    let times = lines(filename)[0].replace(/\s+/g, " ").replace(/.*: /, "").split(" ").map(x => parseInt(x));
    let maxes = lines(filename)[1].replace(/\s+/g, " ").replace(/.*: /, "").split(" ").map(x => parseInt(x));
    let data = times.reduce((map, key, index) => { map[key] = maxes[index]; return map; }, {});
    for (const [time_s, distance] of Object.entries(data)) {
        result *= [...Array(parseInt(time_s)).keys()].map(i => { return (i * (parseInt(time_s) - i) > distance ? 1 : 0); }).reduce((acc, val) => { return acc + val; }, 0);
    }
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
function handleTwo(filename, check) {
    let data = lines(filename).join(":").replace(/\s/g, "").split(":").filter(x => parseInt(x)).map(x => parseInt(x));
    let result = [...Array(data[0]).keys()].map(i => { return (i * (data[0] - i) > data[1] ? 1 : 0); }).reduce((acc, val) => { return acc + val; }, 0);
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
handleOne('sample-1.txt', 288);
handleOne('data-1.txt', 131376);
handleTwo('sample-2.txt', 71503);
handleTwo('data-2.txt', 34123437);
