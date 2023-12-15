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
let cache = {};
function rexplode(spring, check, sidx = 0, cidx = 0, sc = 0) {
    for (let i = sidx; i < spring.length; i++) {
        if (spring[i] == "?") {
            let ckey = spring.slice(i) + "|" + sidx + "|" + cidx + "|" + sc;
            if (cache[ckey] !== undefined) {
                return cache[ckey];
            }
            // out of possible matches, we can only wildcard to "." now
            if (check[cidx] === undefined) {
                if (sc > 0) {
                    return 0;
                }
                continue;
            }
            let result = rexplode("#" + spring.slice(i + 1), check, sidx, cidx, sc) + rexplode("." + spring.slice(i + 1), check, sidx, cidx, sc);
            cache[ckey] = result;
            return result;
        }
        else if (spring[i] == "#") {
            sc++;
            if (cidx >= check.length || sc > check[cidx]) {
                return 0;
            }
        }
        else if (spring[i] == ".") {
            if (sc > 0) {
                if (sc != check[cidx]) {
                    return 0;
                }
                cidx++;
                sc = 0;
            }
        }
    }
    if (sc > 0) {
        if (sc != check[cidx]) {
            return 0;
        }
        cidx++;
    }
    if (check[cidx]) {
        return 0;
    }
    return 1;
}
function handleOne(filename, check) {
    let result = 0;
    let springs = lines(filename).map(x => x.split(" ")[0]);
    let checks = lines(filename).map(x => x.split(" ")[1].split(",").map(x => parseInt(x)));
    for (let i = 0; i < springs.length; i++) {
        cache = {};
        result += rexplode(springs[i], checks[i]);
    }
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
function handleTwo(filename, check) {
    let result = 0;
    let springs = lines(filename).map(x => x.split(" ")[0]).map(x => [...Array(5)].fill(x).join("?"));
    let checks = lines(filename).map(x => x.split(" ")[1]).map(x => [...Array(5)].fill(x).join(",").split(",").map(x => parseInt(x)));
    for (let i = 0; i < springs.length; i++) {
        cache = {};
        result += rexplode(springs[i], checks[i]);
    }
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
//handleOne('sample-2.txt', 1);
handleOne('sample-1.txt', 21);
handleOne('data-1.txt', 7771);
handleTwo('sample-1.txt', 525152);
handleTwo('data-1.txt', 10861030975833);
