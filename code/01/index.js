"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var debugMode = false;
function debugLog(msg) {
    if (debugMode) {
        console.log(msg);
    }
}
function handleOne(line) {
    var matches = line.match(/[0-9]/g);
    var result = parseInt(matches[0].concat(matches.slice(-1)[0]));
    debugLog("Parsed: " + result);
    return result;
}
function handleTwo(line) {
    var firstNum = "";
    var lastNum = "";
    var digits = {
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9",
        "zero": "0"
    };
    Array(10).fill(0).map(function (element, index) { return digits[index] = index.toString(); });
    for (var i = 0; i < line.length; i++) {
        var matcher = "";
        for (var key in digits) {
            if (key === line.substr(i, key.length)) {
                if (firstNum == "") {
                    firstNum = digits[key];
                }
                lastNum = digits[key];
            }
        }
    }
    debugLog("Parsed: " + firstNum + " " + lastNum);
    return parseInt(firstNum.concat(lastNum));
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
parse('sample-1.txt', handleOne, 142);
parse('data-1.txt', handleOne);
parse('sample-2.txt', handleTwo, 281);
parse('data-2.txt', handleTwo);
