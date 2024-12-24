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
const al = __importStar(require("leeh-aoc-lib"));
function parse(filename, data, limits) {
    al.lines(filename).forEach(x => {
        if (x == "") {
            return;
        }
        const res = x.match(/([0-9]+)\|([0-9]+)/);
        if (res) {
            if (!limits[res[1]]) {
                limits[res[1]] = [parseInt(res[2])];
            }
            else {
                limits[res[1]].push(parseInt(res[2]));
            }
            return;
        }
        else {
            data.push(x.split(",").map(x => parseInt(x)));
        }
    });
}
function dcheck(data, limits) {
    for (let i = 0; i < data.length; i++) {
        let val = data[i];
        if (!limits[val]) {
            continue;
        }
        for (let j = 0; j < i; j++) {
            let cval = data[j];
            if (limits[val].includes(cval)) {
                return false;
            }
        }
    }
    return true;
}
function handleOne(filename, check) {
    let result = 0;
    let data = [];
    let limits = {};
    parse(filename, data, limits);
    data.forEach(x => {
        if (dcheck(x, limits)) {
            let mpos = Math.floor(x.length / 2);
            result += x[mpos];
        }
    });
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let data = [];
    let limits = {};
    parse(filename, data, limits);
    data.forEach(x => {
        if (dcheck(x, limits)) {
            return;
        }
        outer: while (1) {
            for (let i = 0; i < x.length; i++) {
                let val = x[i];
                if (!limits[val]) {
                    continue;
                }
                for (let j = 0; j < i; j++) {
                    let cval = x[j];
                    if (limits[val].includes(cval)) {
                        x.splice(i, 1);
                        x.splice(j, 0, val);
                        continue outer;
                    }
                }
            }
            break;
        }
        let mpos = Math.floor(x.length / 2);
        result += x[mpos];
    });
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 143);
handleOne('data-1.txt', 7307);
handleTwo('sample-1.txt', 123);
handleTwo('data-1.txt', 4713);
