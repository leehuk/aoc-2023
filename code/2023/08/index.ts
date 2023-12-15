import * as fs from "fs";
import gcd from "compute-gcd";

let debugMode = false;

function debugLog(msg: string) {
    if(debugMode) {
        console.log(msg);
    }
}

interface StringMap {
    [index: string]: string;
}

function lines(filename: string): string[] {
   return fs.readFileSync(filename, 'utf8').replace(/[\r\n]+$/, '').split(/\n/);
}

interface RouteTable {
    path: string;
    routes: RouteMap;
}
interface RouteMap {
    [index: string]: Route;
}
interface Route {
    left: string;
    right: string;
}

function parse(filename: string): RouteTable {
    let data: RouteTable = { path: "", routes: {} as RouteMap };

    lines(filename).forEach(line => {
        if(line.match(/^[LR]+$/)) {
            data["path"] = line;
        } else {
            let match = line.match(/^([A-Z0-9]{3}) = \(([A-Z0-9]{3}), ([A-Z0-9]{3})\)/);
            if(match) {
                data["routes"][match[1]] = { left: match[2], right: match[3] };
            }
        }
    });

    //console.log(data);
    return data;
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;

    let data = parse(filename);
    let pos = "AAA";

outer:
    while(1) {
        for(let step of data["path"].split("")) {
            if(pos == "ZZZ") {
                break outer;
            }

            result++;
            pos = (step == 'L' ? data["routes"][pos]["left"] : data["routes"][pos]["right"]);
        }
    }

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;

    let data = parse(filename);
    let pos = Object.keys(data["routes"]).filter(x => x.slice(-1) == "A");

    let resultr: number[] = [];

    for(let x of pos) {
        let res = 0;
outer:
        while(1) {
            for(let step of data["path"].split("")) {
                res++;
                x = (step == 'L' ? data["routes"][x]["left"] : data["routes"][x]["right"]);

                if(x.slice(-1) == "Z") {
                    break outer;
                }
            }
        }

        resultr.push(res);
    }

    // LCM
    result = Math.floor(resultr.reduce((acc,val) => acc*=val, 1) / Math.pow(gcd(resultr.sort())!, 5));

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

handleOne('sample-1.txt', 2);
handleOne('sample-2.txt', 6);
handleOne('data-1.txt', 13207);

handleTwo('sample-3.txt', 6);
handleTwo('data-1.txt', 12324145107121);
