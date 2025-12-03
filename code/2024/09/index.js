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
    let data = al.lines(filename).map(x => x.split(""))[0];
    let rdata = [];
    let fid = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < Number(data[i]); j++) {
            rdata.push((i % 2 == 0) ? fid : undefined);
        }
        if (i % 2 == 0) {
            fid++;
        }
    }
    for (let i = 0; i < rdata.length; i++) {
        if (rdata[i] !== undefined) {
            continue;
        }
        while (i < rdata.length) {
            let sq = rdata.pop();
            if (sq !== undefined) {
                rdata[i] = sq;
                break;
            }
        }
    }
    for (let i = 0; i < rdata.length; i++) {
        result += (i * rdata[i]);
    }
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""))[0];
    let blks = [];
    let fid = 0;
    for (let [i, size] of data.entries()) {
        let blk = { fid: fid, size: Number(size), free: (i % 2 == 0) ? false : true, moved: false };
        blks.push(blk);
        if (i % 2 == 0) {
            fid++;
        }
    }
    for (let chkpos = blks.length - 1; chkpos > 0; chkpos--) {
        let movblk = blks[chkpos];
        if (movblk.free || movblk.moved) {
            continue;
        }
        for (let [i, chkblk] of blks.entries()) {
            if (!chkblk.free || chkblk.size < movblk.size) {
                continue;
            }
            if (chkblk.fid > movblk.fid) {
                break;
            }
            blks.splice(i, (chkblk.size == movblk.size ? 1 : 0), { fid: movblk.fid, size: movblk.size, free: false, moved: true });
            chkpos += (chkblk.size == movblk.size ? 0 : 1);
            chkblk.size -= movblk.size;
            movblk.free = true;
            break;
        }
    }
    let pos = 0;
    for (let blk of blks.values()) {
        if (blk.free) {
            pos += blk.size;
            continue;
        }
        for (let i = 0; i < blk.size; i++) {
            result += pos * blk.fid;
            pos++;
        }
    }
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 1928);
handleOne('data-1.txt', 6607511583593);
handleTwo('sample-1.txt', 2858);
handleTwo('data-1.txt', 6636608781232);
