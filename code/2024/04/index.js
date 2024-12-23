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
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            let vec = al.vecinit(i, j);
            if (al.vecdata(vec, data) == "X") {
                outer: for (const dir of al.vecdirs()) {
                    vec = al.vecinit(i, j);
                    for (const letter of ["M", "A", "S"]) {
                        if (!al.vecmove(vec, data, dir)) {
                            continue outer;
                        }
                        if (al.vecdata(vec, data) != letter) {
                            continue outer;
                        }
                    }
                    result++;
                }
            }
        }
    }
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            let vec = al.vecinit(i, j);
            if (al.vecdata(vec, data) == "A") {
                let ne = al.vecdataat(vec, data, "ne");
                let se = al.vecdataat(vec, data, "se");
                let sw = al.vecdataat(vec, data, "sw");
                let nw = al.vecdataat(vec, data, "nw");
                if (ne === false || se === false || sw === false || nw === false) {
                    continue;
                }
                if (((ne == "M" && sw == "S") || (ne == "S" && sw == "M")) && ((nw == "M" && se == "S") || (nw == "S" && se == "M"))) {
                    result++;
                }
            }
        }
    }
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 18);
handleOne('data-1.txt', 2462);
handleTwo('sample-1.txt', 9);
handleTwo('data-1.txt', 1877);
