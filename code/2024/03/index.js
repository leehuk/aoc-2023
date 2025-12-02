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
function handle(line) {
    let result = 0;
    let matches = line.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);
    for (const val of matches) {
        let match = val.match(/\(([0-9]{1,3}),([0-9]{1,3})\)/);
        result += (parseInt(match[1]) * parseInt(match[2]));
    }
    return result;
}
function handleOne(filename, check) {
    let result = 0;
    let data = al.lines(filename).join('x');
    result = handle(data);
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let data = al.lines(filename);
    console.log(data[3]);
    let x = data[3].replace(/don't\(\).*?do\(\)/g, "");
    console.log(x);
    x = x.replace(/don't\(\).*/, "");
    console.log(x);
    let lines = data.map(x => x.replace(/don't\(\).*?do\(\)/g, "")).map(x => x.replace(/don't\(\).*/, "")).join('x');
    result = handle(lines);
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 161);
handleOne('data-1.txt', 173785482);
//handleTwo('sample-2.txt', 48);
handleTwo('data-1.txt', 0);
