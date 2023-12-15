import * as fs from "fs";

let debugMode = false;

function debugLog(msg: string) {
    if(debugMode) {
        console.log(msg);
    }
}

interface NumArray {
    [index: number]: number;
};

function lines(filename: string): string[] {
   return fs.readFileSync(filename, 'utf8').replace(/[\r\n]+$/, '').split(/\n/);
}

interface Hand {
    cards: number[];
    bid: number;
    type: number;
    jokers: number;
};

interface HandType {
    value: number;
    sig: string;
};

const handTypes = ["x","11111","1112","122","113","23","14","5"];

function csort(a: Hand, b: Hand): number {
    for(let i = 0; i < a["cards"].length; i++) {
        if(a["cards"][i] > b["cards"][i]) {
            return 1;
        } else if(a["cards"][i] < b["cards"][i]) {
            return -1;
        }
    }

    return 0;
}

function parseOne(filename: string): Hand[] {
    let data = lines(filename).map(line => {
        return { cards: line.split(" ")[0].split("").map(card => { return card == "A" ? 14 : (card == "K" ? 13 : (card == "Q" ? 12 : (card == "J" ? 11 : (card == "T" ? 10 : parseInt(card))))); }), bid: parseInt(line.split(" ")[1]) } as Hand;
    }).map(hand => {
        hand["type"] = handTypes.indexOf(Object.values(hand["cards"].reduce((data, val) => {
            data[val] ? data[val]++ : data[val] = 1;
            return data;
        }, {} as NumArray)).sort().join(""));

        return hand;
    }).sort((a,b) => {
        return a["type"] > b["type"] ? 1 : (a["type"] < b["type"] ? -1 : csort(a, b));
    });

    //console.log(data);
    return data;
}

function handleOne(filename: string, check?: Object): void {
    let result = 0

    result = parseOne(filename).reduce((acc,val,idx) => {
        return acc + ((idx+1)*val["bid"]);
    }, 0);

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

function parseTwo(filename: string): Hand[] {
    let data = lines(filename).map(line => {
        return { cards: line.split(" ")[0].split("").map(card => { return card == "A" ? 14 : (card == "K" ? 13 : (card == "Q" ? 12 : (card == "J" ? 1 : (card == "T" ? 10 : parseInt(card))))); }), bid: parseInt(line.split(" ")[1]) } as Hand;
    }).map(hand => {
        hand["jokers"] = hand["cards"].reduce((acc,val) => { return val == 1 ? acc+1 : acc; }, 0);

        let sig = Object.values(hand["cards"].reduce((data, val) => {
            if(val != 1) {
                data[val] ? data[val]++ : data[val] = 1;
            }
            return data;
        }, {} as NumArray)).sort();
        sig[sig.length -1] += hand["jokers"];

        // ugh
        if(hand["jokers"] == hand["cards"].length) {
            hand["type"] = handTypes.indexOf("5");
        } else {
            hand["type"] = handTypes.indexOf(sig.join(""));
        }

        return hand;
    }).sort((a,b) => {
        return a["type"] > b["type"] ? 1 : (a["type"] < b["type"] ? -1 : csort(a, b));
    });

    //console.log(data);
    return data;
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;

    result = parseTwo(filename).reduce((acc,val,idx) => {
        return acc + ((idx+1)*val["bid"]);
    }, 0);

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

handleOne('sample-1.txt', 6440);
handleOne('data-1.txt', 246163188);

handleTwo('sample-2.txt', 5905);
handleTwo('sample-3.txt', 6505);
handleTwo('data-2.txt', 245794069);
