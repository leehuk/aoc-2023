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
    let data = al.lines(filename).map(x => x.replace(/(p|v)=/g, "").replace(/,/g, " ").split(" ").map(x => Number(x)));
    const xmax = (filename == "data-1.txt") ? 101 : 11;
    const ymax = (filename == "data-1.txt") ? 103 : 7;
    const xmid = (xmax - 1) / 2;
    const ymid = (ymax - 1) / 2;
    let quads = [0, 0, 0, 0];
    for (const row of data) {
        let x = (row[0] + (row[2] * 100)) % xmax;
        let y = (row[1] + (row[3] * 100)) % ymax;
        x += (x < 0) ? xmax : 0;
        y += (y < 0) ? ymax : 0;
        if (x < xmid && y < ymid) {
            quads[0]++;
        }
        else if (x > xmid && y < ymid) {
            quads[1]++;
        }
        else if (x < xmid && y > ymid) {
            quads[2]++;
        }
        else if (x > xmid && y > ymid) {
            quads[3]++;
        }
    }
    result = quads[0] * quads[1] * quads[2] * quads[3];
    al.finish(filename, result, check);
}
async function handleTwo(filename, check) {
    let result = 0;
    let data = al.lines(filename).map(x => x.replace(/(p|v)=/g, "").replace(/,/g, " ").split(" ").map(x => Number(x)));
    let sleep = require('util').promisify(setTimeout);
    const xmax = (filename == "data-1.txt") ? 101 : 11;
    const ymax = (filename == "data-1.txt") ? 103 : 7;
    const grid = new al.CoordGrid([], xmax, ymax).fill(function () { return new Array(); });
    for (const row of data) {
        grid.coords[row[0]][row[1]].data.push({
            vector: new al.Coord(row[2], row[3]),
            gen: 0,
        });
    }
    for (let i = 1; i <= 10000; i++) {
        for (let x = 0; x < xmax; x++) {
            for (let y = 0; y < ymax; y++) {
                let pos = grid.coords[x][y];
                let queue = pos.data.slice();
                pos.data = [];
                for (let robot of queue) {
                    if (robot.gen == i) {
                        pos.data.push(robot);
                    }
                    else {
                        let newpos = grid.moveOverflow(pos, robot.vector);
                        robot.gen = i;
                        newpos.data.push(robot);
                    }
                }
            }
        }
        /*
        let rcount : number[] = [];
        for(let x = 0; x < xmax; x++) {
            for(let y = 0; y < ymax; y++) {
                if(!rcount[y]) {
                    rcount[y] = 0;
                }

                rcount[y] += grid.coords[x][y].data.length;
            }
        }
        */
        // if(Math.max(...rcount) > 30) {
        if (i == 6620) {
            grid.drawclear();
            console.log(`Iteration ${i}\n`);
            grid.draw(function (pos) {
                return (pos && pos.data.length > 0) ? "@" : " ";
            });
            await sleep(500);
        }
    }
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 12);
handleOne('data-1.txt', 0);
// handleTwo('sample-1.txt', 0);
handleTwo('data-1.txt', 0);
