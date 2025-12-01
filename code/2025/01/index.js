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
;
function updatePos(pos, dir, rot) {
    if (dir == "L") {
        pos -= rot;
    }
    else {
        pos += rot;
    }
    pos = pos % 100;
    if (pos < 0) {
        pos = (100 + pos);
    }
    return pos;
}
function updatePosTrack(dir, rot, result) {
    let start = result.pos;
    while (rot >= 100) {
        rot -= 100;
        result.count++;
    }
    ;
    if (dir == "L") {
        result.pos -= rot;
    }
    else {
        result.pos += rot;
    }
    // overflowed
    if (result.pos >= 100) {
        result.pos -= 100;
        result.count++;
        // correct negative
    }
    else if (result.pos < 0) {
        // underflowed
        if (result.pos <= -100) {
            result.pos += 100;
            result.count++;
        }
        // crossed the zero boundary
        if (start > 0) {
            result.count++;
        }
        result.pos = (100 + result.pos);
    }
    else if (result.pos == 0) {
        result.count++;
    }
}
function handleOne(filename, check) {
    let result = 0;
    let data = al.lines(filename);
    let pos = 50;
    let count = 0;
    for (let entry of data.values()) {
        let d = entry.charAt(0);
        let r = Number(entry.substring(1));
        pos = updatePos(pos, entry.charAt(0), Number(entry.substring(1)));
        if (pos == 0) {
            result++;
        }
    }
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = { pos: 50, count: 0 };
    let data = al.lines(filename).map(x => [x.charAt(0), Number(x.substring(1))]);
    for (let entry of data.values()) {
        updatePosTrack(entry[0], entry[1], result);
    }
    al.finish(filename, result.count, check);
}
handleOne('sample-1.txt', 3);
handleOne('data-1.txt', 1043);
handleTwo('sample-1.txt', 6);
handleTwo('data-1.txt', 5963);
