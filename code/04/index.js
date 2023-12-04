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
function parse(filename) {
    let data = [];
    lines(filename).forEach(line => {
        const found = line.match(/^Card\s+([0-9]+): ([^|]+) \| (.*)/);
        if (found) {
            let cardNum = found[3].trim().replace(/\s+/g, " ").split(" ").map(x => parseInt(x));
            let result = found[2].trim().replace(/\s+/g, " ").split(" ").map(x => parseInt(x)).reduce((acc, val) => cardNum.includes(val) ? acc + 1 : acc, 0);
            data.push({
                //winNum: found[2].trim().replace(/\s+/g, " ").split(" ").map(x => parseInt(x)),
                //cardNum: found[3].trim().replace(/\s+/g, " ").split(" ").map(x => parseInt(x)),
                result: result,
                copies: 1
            });
        }
        else {
            console.log("err?: " + line);
        }
    });
    return data;
}
function handleOne(filename, check) {
    let result = 0;
    result = parse(filename).map(card => card.result).reduce((acc, val) => val > 0 ? acc + (2 ** (val - 1)) : acc, 0);
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
function handleTwo(filename, check) {
    let result = 0;
    let data = parse(filename);
    for (var [idx, card] of data.entries()) {
        for (let i = 0; i < card.copies; i++) {
            if (card.result == 0)
                continue;
            for (let j = 1; j <= card.result; j++) {
                data[idx + j].copies++;
            }
        }
    }
    result = data.map(card => card.copies).reduce((acc, val) => acc + val, 0);
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
handleOne('sample-1.txt', 13);
handleOne('data-1.txt', 21088);
handleTwo('sample-2.txt', 30);
handleTwo('data-2.txt');
