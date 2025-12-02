import * as al from 'leeh-aoc-lib';

interface Calc {
    target: number;
    parts: number[];
};

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => {
        let res = x.match(/([0-9]+): (.*)/);

        return {
            target: parseInt(res![1]),
            parts: res![2].split(" ").map(x => parseInt(x)),
        } as Calc;
    });

    for(let row of data.values()) {
        let first = row.parts.shift()!;
        let checks : number[] = [first];

        while(row.parts.length >= 1) {
            let val = row.parts.shift()!;

            checks = checks.map(x => [x + val, x * val]).flat().filter((val) => val > 0 && val <= row.target);
        }

        if(checks.includes(row.target)) {
            result += row.target;
        }
    }

    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => {
        let res = x.match(/([0-9]+): (.*)/);

        return {
            target: parseInt(res![1]),
            parts: res![2].split(" ").map(x => parseInt(x)),
        } as Calc;
    });

    for(let row of data.values()) {
        let first = row.parts.shift()!;
        let checks : number[] = [first];

        while(row.parts.length >= 1) {
            let val = row.parts.shift()!;

            checks = checks.map(x => [x + val, x * val, Number(x.toString() + val.toString())]).flat().filter((val) => val > 0 && val <= row.target);
        }

        if(checks.includes(row.target)) {
            result += row.target;
        }
    }

    al.finish(filename, result, check);
}

handleOne('sample-1.txt', 3749);
handleOne('data-1.txt', 4555081946288);

handleTwo('sample-1.txt', 11387);
handleTwo('data-1.txt', 227921760109726);
