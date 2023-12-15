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
;
function lines(filename) {
    return fs.readFileSync(filename, 'utf8').replace(/[\r\n]+$/, '').split(/\n/);
}
;
;
const handTypes = ["x", "11111", "1112", "122", "113", "23", "14", "5"];
function csort(a, b) {
    for (let i = 0; i < a["cards"].length; i++) {
        if (a["cards"][i] > b["cards"][i]) {
            return 1;
        }
        else if (a["cards"][i] < b["cards"][i]) {
            return -1;
        }
    }
    return 0;
}
function parseOne(filename) {
    let data = lines(filename).map(line => {
        return { cards: line.split(" ")[0].split("").map(card => { return card == "A" ? 14 : (card == "K" ? 13 : (card == "Q" ? 12 : (card == "J" ? 11 : (card == "T" ? 10 : parseInt(card))))); }), bid: parseInt(line.split(" ")[1]) };
    }).map(hand => {
        hand["type"] = handTypes.indexOf(Object.values(hand["cards"].reduce((data, val) => {
            data[val] ? data[val]++ : data[val] = 1;
            return data;
        }, {})).sort().join(""));
        return hand;
    }).sort((a, b) => {
        return a["type"] > b["type"] ? 1 : (a["type"] < b["type"] ? -1 : csort(a, b));
    });
    //console.log(data);
    return data;
}
function handleOne(filename, check) {
    let result = 0;
    result = parseOne(filename).reduce((acc, val, idx) => {
        return acc + ((idx + 1) * val["bid"]);
    }, 0);
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
function parseTwo(filename) {
    let data = lines(filename).map(line => {
        return { cards: line.split(" ")[0].split("").map(card => { return card == "A" ? 14 : (card == "K" ? 13 : (card == "Q" ? 12 : (card == "J" ? 1 : (card == "T" ? 10 : parseInt(card))))); }), bid: parseInt(line.split(" ")[1]) };
    }).map(hand => {
        hand["jokers"] = hand["cards"].reduce((acc, val) => { return val == 1 ? acc + 1 : acc; }, 0);
        let sig = Object.values(hand["cards"].reduce((data, val) => {
            if (val != 1) {
                data[val] ? data[val]++ : data[val] = 1;
            }
            return data;
        }, {})).sort();
        sig[sig.length - 1] += hand["jokers"];
        // ugh
        if (hand["jokers"] == hand["cards"].length) {
            hand["type"] = handTypes.indexOf("5");
        }
        else {
            hand["type"] = handTypes.indexOf(sig.join(""));
        }
        return hand;
    }).sort((a, b) => {
        return a["type"] > b["type"] ? 1 : (a["type"] < b["type"] ? -1 : csort(a, b));
    });
    //console.log(data);
    return data;
}
function handleTwo(filename, check) {
    let result = 0;
    result = parseTwo(filename).reduce((acc, val, idx) => {
        return acc + ((idx + 1) * val["bid"]);
    }, 0);
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
handleOne('sample-1.txt', 6440);
handleOne('data-1.txt', 246163188);
handleTwo('sample-2.txt', 5905);
handleTwo('sample-3.txt', 6505);
handleTwo('data-2.txt', 245794069);
