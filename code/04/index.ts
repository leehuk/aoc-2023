import * as fs from "fs";

let debugMode = false;

function debugLog(msg: string) {
    if(debugMode) {
        console.log(msg);
    }
}

function lines(filename: string): string[] {
    return fs.readFileSync(filename, 'utf8').replace(/[\r\n]+$/, '').split(/\n/);
}

interface Card {
    //winNum: number[];
    //cardNum: number[];
    result: number;
    copies: number;
};

function parse(filename: string): Card[] {
    let data: Card[] = [];

    lines(filename).forEach(line => {
        const found = line.match(/^Card\s+([0-9]+): ([^|]+) \| (.*)/);

        if(found) {
            let cardNum = found[3].trim().replace(/\s+/g, " ").split(" ").map(x => parseInt(x));
            let result = found[2].trim().replace(/\s+/g, " ").split(" ").map(x => parseInt(x)).reduce((acc, val) => cardNum.includes(val) ? acc+1 : acc, 0);
            data.push({
                //winNum: found[2].trim().replace(/\s+/g, " ").split(" ").map(x => parseInt(x)),
                //cardNum: found[3].trim().replace(/\s+/g, " ").split(" ").map(x => parseInt(x)),
                result: result,
                copies: 1
            });
        } else {
            console.log("err?: " + line);
        }
    });

    return data;
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;

    result = parse(filename).map(card => card.result).reduce((acc, val) => val > 0 ? acc + (2**(val-1)) : acc, 0);

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = parse(filename);

    for(var [idx,card] of data.entries()) {
        for(let i = 0; i < card.copies; i++) {
            if(card.result == 0)
                continue;

            for(let j = 1; j <= card.result; j++) {
                data[idx+j].copies++;
            }
        }
    }
    result = data.map(card => card.copies).reduce((acc, val) => acc + val, 0);

    console.log("Final results for " + filename + ": " + result + (check ? (result === check ? " (ok)" : " (***FAIL***)") : ""));
}

handleOne('sample-1.txt', 13);
handleOne('data-1.txt', 21088);

handleTwo('sample-2.txt', 30);
handleTwo('data-2.txt', 6874754);
