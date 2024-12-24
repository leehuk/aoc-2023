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
function handleOne(filename, check) {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));
    let mark = al.fillarray(data.length, data[0].length);
    let pos = al.veclocate(data, "^");
    if (pos === false) {
        console.log("uhoh");
        return;
    }
    data[pos['row']][pos['col']] = ".";
    mark[pos['row']][pos['col']] = true;
    let dir = { dir: "n" };
    while (true) {
        let peek = al.vecdataat(pos, data, dir.dir);
        //console.log("at position: " + al.vecp(pos) + " facing " + dir.dir + " seeing " + peek);
        if (peek === false) {
            break;
        }
        else if (peek == ".") {
            al.vecmove(pos, data, dir.dir);
            mark[pos['row']][pos['col']] = true;
        }
        else if (peek == "#") {
            al.degrotate(dir, 90);
        }
        else {
            console.log("unexpected chr " + peek + " at " + al.vecp(pos));
        }
    }
    result = mark.map(x => x.reduce((acc, val) => (val === true ? acc + 1 : acc), 0)).reduce((acc, val) => acc += val, 0);
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 41);
handleOne('data-1.txt', 0);
//handleTwo('sample-1.txt', 0);
//handleTwo('data-1.txt', 0);
