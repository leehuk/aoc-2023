"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var debugMode = false;
function debugLog(msg) {
    if (debugMode) {
        console.log(msg);
    }
}
function parseline(line) {
    // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    var idx = line.split(":")[0].trim().split(" ")[1];
    var ret = {
        idx: parseInt(idx),
        results: []
    };
    line.split(":")[1].trim().split(";").forEach(function (game) {
        var val = {};
        game.trim().split(",").forEach(function (res) {
            var x = res.trim().split(" ");
            val[x[1].trim()] = parseInt(x[0].trim());
        });
        ret['results'].push(val);
    });
    return ret;
}
function handleOne(line) {
    var res = parseline(line);
    var ok = true;
    res.results.forEach(function (val) {
        if (val['red'] > 12 || val['green'] > 13 || val['blue'] > 14) {
            ok = false;
        }
        //console.log("%o", val);
    });
    return (ok ? res.idx : 0);
}
function handleTwo(line) {
    var res = parseline(line);
    var min = { 'red': 0, 'green': 0, 'blue': 0 };
    res.results.forEach(function (val) {
        ['red', 'green', 'blue'].forEach(function (colour) {
            if (val[colour] > min[colour]) {
                min[colour] = val[colour];
            }
        });
    });
    return min['red'] * min['green'] * min['blue'];
}
function parse(filename, handler, check) {
    var result = 0;
    var data = fs.readFileSync(filename, 'utf8');
    data.split("\n").forEach(function (line) {
        if (line != "") {
            debugLog("handle()::" + line + "::");
            result += handler(line);
        }
    });
    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}
parse('sample-1.txt', handleOne, 8);
parse('data-1.txt', handleOne);
parse('sample-2.txt', handleTwo, 2286);
parse('data-2.txt', handleTwo);
