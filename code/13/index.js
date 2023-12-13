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
function fdiv(buf, fuzzy = false) {
    let result = -1;
    OUTER: for (let y = 0; y < buf.length - 1; y++) {
        let diff = buf[y].reduce((acc, val, idx) => { return (buf[y][idx] == buf[y + 1][idx] ? acc : acc + 1); }, 0);
        if (diff == 0 || (fuzzy && diff == 1)) {
            let ldiff = 0;
            for (let yl = y - 1, yr = y + 2; yl >= 0 && yr < buf.length; yl--, yr++) {
                ldiff += buf[yl].reduce((acc, val, idx) => { return (buf[yl][idx] == buf[yr][idx] ? acc : acc + 1); }, 0);
            }
            if ((!fuzzy && diff == 0 && ldiff == 0) || (fuzzy && ((diff == 1 && ldiff == 0) || (diff == 0 && ldiff == 1)))) {
                result = y + 1;
                break OUTER;
            }
            continue OUTER;
        }
    }
    return result;
}
function fsolve(filename, fuzzy = false) {
    let result = 0;
    let buf = [];
    [...lines(filename), ""].forEach(line => {
        if (line == "") {
            let ydiv = fdiv(buf, fuzzy);
            let xbuf = buf[0].map((_, idx) => buf.map(row => row[idx]));
            let xdiv = fdiv(xbuf, fuzzy);
            result += (ydiv >= 0 ? (ydiv * 100) : 0) + (xdiv >= 0 ? xdiv : 0);
            buf = [];
        }
        else {
            buf.push(line.split(""));
        }
    });
    return result;
}
function handleOne(filename, check) {
    let result = fsolve(filename);
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
function handleTwo(filename, check) {
    let result = fsolve(filename, true);
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
handleOne('sample-1.txt', 405);
handleOne('data-1.txt', 36041);
handleTwo('sample-1.txt', 400);
handleTwo('data-2.txt', 35915);
