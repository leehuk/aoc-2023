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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const compute_gcd_1 = __importDefault(require("compute-gcd"));
let debugMode = false;
function debugLog(msg) {
    if (debugMode) {
        console.log(msg);
    }
}
function lines(filename) {
    return fs.readFileSync(filename, 'utf8').replace(/[\r\n]+$/, '').split(/\n/);
}
function parse(filename) {
    let data = { path: "", routes: {} };
    lines(filename).forEach(line => {
        if (line.match(/^[LR]+$/)) {
            data["path"] = line;
        }
        else {
            let match = line.match(/^([A-Z0-9]{3}) = \(([A-Z0-9]{3}), ([A-Z0-9]{3})\)/);
            if (match) {
                data["routes"][match[1]] = { left: match[2], right: match[3] };
            }
        }
    });
    //console.log(data);
    return data;
}
function handleOne(filename, check) {
    let result = 0;
    let data = parse(filename);
    let pos = "AAA";
    outer: while (1) {
        for (let step of data["path"].split("")) {
            if (pos == "ZZZ") {
                break outer;
            }
            result++;
            pos = (step == 'L' ? data["routes"][pos]["left"] : data["routes"][pos]["right"]);
        }
    }
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
function handleTwo(filename, check) {
    let result = 0;
    let data = parse(filename);
    let pos = Object.keys(data["routes"]).filter(x => x.slice(-1) == "A");
    let resultr = [];
    for (let x of pos) {
        let res = 0;
        outer: while (1) {
            for (let step of data["path"].split("")) {
                res++;
                x = (step == 'L' ? data["routes"][x]["left"] : data["routes"][x]["right"]);
                if (x.slice(-1) == "Z") {
                    break outer;
                }
            }
        }
        resultr.push(res);
    }
    // LCM
    result = Math.floor(resultr.reduce((acc, val) => acc *= val, 1) / Math.pow((0, compute_gcd_1.default)(resultr.sort()), 5));
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
handleOne('sample-1.txt', 2);
handleOne('sample-2.txt', 6);
handleOne('data-1.txt', 13207);
handleTwo('sample-3.txt', 6);
handleTwo('data-1.txt', 12324145107121);
