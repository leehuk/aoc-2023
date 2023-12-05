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
;
function parse(filename) {
    let data = { seeds: [], lookup: {} };
    let mapidx = "";
    lines(filename).forEach(line => {
        if (line == "") {
            return;
        }
        debugLog(line);
        const seeds = line.match(/^(seeds): ([0-9\s]+)$/);
        const marker = line.match(/^([a-z\-]+) map:$/);
        const vals = line.match(/^[0-9\s]+$/);
        if (!seeds && !marker && !vals) {
            console.log("ERROR: Parse failure: " + line);
            return;
        }
        if (seeds) {
            data["seeds"].push(...seeds[2].replace(/\s+/g, " ").split(" ").map(x => parseInt(x)));
        }
        else if (marker) {
            mapidx = marker[1];
            data["lookup"][mapidx] = [];
        }
        else {
            let nvals = line.replace(/\s+/g, " ").split(" ").map(x => parseInt(x));
            data["lookup"][mapidx].push({ first: nvals[1], last: (nvals[1] + nvals[2] - 1), value: nvals[0] });
        }
    });
    //console.log(data);
    //console.log(data["lookup"]);
    return data;
}
function lookup(data, idx) {
    for (let val of data) {
        if (idx >= val["first"] && idx <= val["last"]) {
            return (idx - val["first"] + val["value"]);
        }
    }
    return idx;
}
const lookupTable = {
    "seed-to-soil": "soil-to-fertilizer",
    "soil-to-fertilizer": "fertilizer-to-water",
    "fertilizer-to-water": "water-to-light",
    "water-to-light": "light-to-temperature",
    "light-to-temperature": "temperature-to-humidity",
    "temperature-to-humidity": "humidity-to-location"
};
function rlookup(data, idx, key = "seed-to-soil") {
    let result = idx;
    for (let val of data[key]) {
        if (idx >= val["first"] && idx <= val["last"]) {
            result = (idx - val["first"] + val["value"]);
            break;
        }
    }
    if (lookupTable[key]) {
        return rlookup(data, result, lookupTable[key]);
    }
    else {
        return result;
    }
}
function resolve(data, seed) {
    if (false) {
        let soil = lookup(data["lookup"]["seed-to-soil"], seed);
        let fert = lookup(data["lookup"]["soil-to-fertilizer"], soil);
        let water = lookup(data["lookup"]["fertilizer-to-water"], fert);
        let light = lookup(data["lookup"]["water-to-light"], water);
        let temp = lookup(data["lookup"]["light-to-temperature"], light);
        let hum = lookup(data["lookup"]["temperature-to-humidity"], temp);
        return lookup(data["lookup"]["humidity-to-location"], hum);
    }
    else {
        return rlookup(data["lookup"], seed);
    }
}
function handleOne(filename, check) {
    let result = -1;
    let data = parse(filename);
    data["seeds"].forEach(seed => {
        let soil = lookup(data["lookup"]["seed-to-soil"], seed);
        let fert = lookup(data["lookup"]["soil-to-fertilizer"], soil);
        let water = lookup(data["lookup"]["fertilizer-to-water"], fert);
        let light = lookup(data["lookup"]["water-to-light"], water);
        let temp = lookup(data["lookup"]["light-to-temperature"], light);
        let hum = lookup(data["lookup"]["temperature-to-humidity"], temp);
        let loc = lookup(data["lookup"]["humidity-to-location"], hum);
        if (result < 0 || loc < result) {
            result = loc;
        }
    });
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
function handleTwo(filename, check) {
    let result = -1;
    let data = parse(filename);
    for (let i = 0; i < data["seeds"].length; i += 2) {
        const start = Date.now();
        process.stdout.write("Running " + data["seeds"][i] + " for " + data["seeds"][i + 1] + " iterations: ");
        for (let j = 0; j < data["seeds"][i + 1]; j++) {
            let loc = resolve(data, data["seeds"][i] + j);
            if (result < 0 || loc < result) {
                result = loc;
            }
        }
        const end = Date.now();
        console.log(end - start + " ms");
    }
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
//handleOne('sample-1.txt', 35);
//handleOne('data-1.txt', 525792406);
handleTwo('sample-2.txt', 46);
//handleTwo('data-2.txt', 79004094);
handleTwo('sample-3.txt', 79004094);
