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
function parse(data) {
    let res = {
        rules: {},
        parts: []
    };
    for (let line of data) {
        let match = line.match(/^([a-z]+)\{(.*)\}$/);
        if (match) {
            let rname = match[1];
            if (res.rules.rname === undefined) {
                res.rules[rname] = [];
            }
            for (let el of match[2].split(",")) {
                let ematch = el.match(/^([xmas])([\<\>])([0-9]+):([a-zA-Z]+)$/);
                if (ematch) {
                    let rule = {
                        name: rname,
                        field: ematch[1],
                        comp: ematch[2],
                        val: parseInt(ematch[3]),
                        action: ematch[4]
                    };
                    res.rules[rname].push(rule);
                }
                else {
                    res.rules[rname].push({ name: rname, action: el });
                }
            }
        }
        match = line.match(/^\{x=(.*),m=(.*),a=(.*),s=(.*)\}$/);
        if (match) {
            res['parts'].push({ x: parseInt(match[1]), m: parseInt(match[2]), a: parseInt(match[3]), s: parseInt(match[4]) });
        }
    }
    return res;
}
function rtparse(rules, rname, idx, stack) {
    let rule = rules[rname][idx];
    if (rule.comp !== undefined) {
        if (rule.action == "A") {
            rtaccept([...stack, rule]);
        }
        else if (rule.action != "R") {
            stack.push(rule);
            rtparse(rules, rule.action, 0, stack);
            stack.pop();
        }
        let invrule = { ...rule };
        invrule.comp = (rule.comp == "<" ? ">" : "<");
        invrule.val = (rule.comp == "<" ? rule.val - 1 : rule.val + 1);
        stack.push(invrule);
        rtparse(rules, rname, idx + 1, stack);
        stack.pop();
    }
    else {
        if (rule.action == "A") {
            rtaccept([...stack, rule]);
        }
        else if (rule.action != "R") {
            rtparse(rules, rule.action, 0, stack);
        }
    }
}
function rtprint(rules, rname, idx, depth = 0) {
    let rule = rules[rname][idx];
    process.stdout.write(rule.name.padEnd(10));
    process.stdout.write("".padStart(depth * 5));
    if (rule.comp !== undefined) {
        process.stdout.write("IF   " + rule.field + rule.comp + " " + rule.val?.toString().padStart(5) + " THEN ");
        if (rule.action == "A" || rule.action == "R") {
            process.stdout.write((rule.action == "A" ? "ACCEPT" : "REJECT") + "\n");
        }
        else {
            process.stdout.write("...\n");
            rtprint(rules, rule.action, 0, depth + 1);
        }
        rtprint(rules, rname, idx + 1, depth);
    }
    else {
        process.stdout.write("OTHR ");
        if (rule.action == "A" || rule.action == "R") {
            process.stdout.write((rule.action == "A" ? "ACCEPT" : "REJECT") + "\n");
        }
        else {
            process.stdout.write("CALL<" + rule.action + ">\n");
            rtprint(rules, rule.action, 0, depth + 1);
        }
    }
}
let total = 0;
function rtaccept(stack) {
    let result = {
        x: Array(4001).fill(true),
        m: Array(4001).fill(true),
        a: Array(4001).fill(true),
        s: Array(4001).fill(true)
    };
    for (let chr of Object.keys(result)) {
        result[chr][0] = false;
    }
    for (let rule of stack) {
        let step = (rule.comp == "<" ? 1 : -1);
        for (let i = rule.val; i > 0 && i < 4001; i += step) {
            result[rule.field][i] = false;
        }
    }
    let math = 1;
    for (let key of Object.keys(result)) {
        let num = result[key].reduce((acc, val) => (val == false ? acc : acc + 1), 0);
        math *= num;
    }
    total += math;
}
function handleOne(filename, check) {
    let result = 0;
    let data = parse(al.lines(filename));
    let accept = [];
    let reject = [];
    OUTER: for (let part of data.parts) {
        let rname = "in";
        let rules = data.rules[rname];
        INNER: for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            if (rule.comp === undefined || (rule.comp == "<" && part[rule.field] < rule.val) || (rule.comp == ">" && part[rule.field] > rule.val)) {
                if (rule.action == "A") {
                    accept.push(part);
                    continue OUTER;
                }
                else if (rule.action == "R") {
                    reject.push(part);
                    continue OUTER;
                }
                else {
                    rname = rule.action;
                    rules = data.rules[rname];
                    i = -1;
                    continue INNER;
                }
            }
        }
    }
    for (let part of accept) {
        result += part.x + part.m + part.a + part.s;
    }
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let data = parse(al.lines(filename));
    total = 0;
    rtparse(data.rules, 'in', 0, []);
    //rtprint(res.rules, 'in', 0);
    result = total;
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 19114);
handleOne('data-1.txt', 401674);
handleTwo('sample-1.txt', 167409079868000);
handleTwo('data-1.txt', 134906204068564);
