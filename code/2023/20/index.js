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
function rtinit(engine, name) {
    if (!engine[name]) {
        let rt = {
            name: name,
            action: "",
            children: []
        };
        engine[name] = rt;
    }
    return engine[name];
}
function parse(data) {
    let engine = {};
    for (let line of data) {
        let match = line.match(/^([%&]?)([a-z]+) -> (.*)$/);
        let rt = rtinit(engine, match[2]);
        rt.action = match[1];
        if (rt.action == "%") {
            rt.fstate = false;
        }
        else if (rt.action == "&") {
            rt.cstate = {};
        }
        match[3].replaceAll(" ", "").split(",").forEach((cname, idx) => {
            let crt = rtinit(engine, cname);
            engine[rt.name].children.push(crt);
        });
    }
    let invs = [];
    for (let rt of Object.values(engine)) {
        if (rt.action == "&") {
            invs.push(rt.name);
        }
    }
    for (let rt of Object.values(engine)) {
        for (let child of rt.children) {
            for (let inv of invs) {
                if (inv == child.name) {
                    engine[inv].cstate[rt.name] = true;
                }
            }
        }
    }
    return engine;
}
let cyclengths = {};
function pulse(engine, cycle = 0) {
    let stack = [{ from: engine['broadcaster'], to: engine['broadcaster'], low: true }];
    let countl = 0;
    let counth = 0;
    while (stack.length > 0) {
        let pl = stack.shift();
        let rt = pl.to;
        //console.log(`pulse ${pl.from.name} -> ${rt.name} ${(pl.low ? "low" : "high")}`);
        if (cycle > 0 && rt.name == "xm" && !pl.low) {
            if (cyclengths[pl.from.name] === undefined) {
                cyclengths[pl.from.name] = cycle;
            }
        }
        if (pl.low) {
            countl++;
        }
        else {
            counth++;
        }
        if (rt.action == "%") {
            if (!pl.low) {
                continue;
            }
            let low = rt.fstate;
            rt.fstate = !rt.fstate;
            for (let child of pl.to.children) {
                stack.push({ from: rt, to: child, low: low });
            }
        }
        else if (rt.action == "&") {
            let low = false;
            rt.cstate[pl.from.name] = pl.low;
            if (Object.values(rt.cstate).reduce((acc, val) => (val ? acc + 1 : acc), 0) == 0) {
                low = true;
            }
            for (let child of pl.to.children) {
                stack.push({ from: rt, to: child, low: low });
            }
        }
        else {
            for (let child of pl.to.children) {
                stack.push({ from: rt, to: child, low: true });
            }
        }
    }
    return [countl, counth];
}
function handleOne(filename, check) {
    let result = 0;
    let data = parse(al.lines(filename));
    let lresults = [];
    for (let i = 0; i < 1000; i++) {
        lresults.push(pulse(data));
    }
    let countl = lresults.map(x => x[0]).reduce((acc, val) => acc + val, 0);
    let counth = lresults.map(x => x[1]).reduce((acc, val) => acc + val, 0);
    result = countl * counth;
    al.finish(filename, result, check);
}
function asstr(engine, name) {
    return Object.values(engine[name].cstate).map(x => (x ? "T" : "F")).join("");
}
function handleTwo(filename, check) {
    let result = 0;
    let data = parse(al.lines(filename));
    let i = 0;
    while (Object.values(cyclengths).length != 4) {
        i++;
        pulse(data, i);
    }
    result = Object.values(cyclengths).reduce((acc, val) => val * acc, 1);
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 32000000);
handleOne('sample-2.txt', 11687500);
handleOne('data-1.txt', 0);
//handleTwo('sample-2.txt', 0);
handleTwo('data-1.txt', 224602011344203);
