import * as al from 'leeh-aoc-lib';

interface xy {
    x: number,
    y: number,
}

function determinant(a: number, b: number, c: number, d: number): number {
    return (a * d) - (b * c);
}

function cramer(data: number[], adj: number = 0): xy {
    let res : xy = { x: 0, y: 0 };

    if(adj > 0) {
        data[4] += adj;
        data[5] += adj;
    }

    let det = determinant(data[0], data[2], data[1], data[3]);

    if(det != 0) {
        let detx = determinant(data[4], data[2], data[5], data[3]) / det;
        let dety = determinant(data[0], data[4], data[1], data[5]) / det;

        if(Number.isInteger(detx) && Number.isInteger(dety)) {
            res.x = detx;
            res.y = dety;
        }
    }

    return res;
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).reduce((acc, cur) => acc + (cur == "" ? "\n" : " ") + cur, "").split("\n");

    let res = [0, 0];
    data.forEach(line => {
        let match = line.match(/Button A: X\+([0-9]+), Y\+([0-9]+) Button B: X\+([0-9]+), Y\+([0-9]+) Prize: X=([0-9]+), Y=([0-9]+)/);
        if(!match) {
            console.log("ERROR: Regexp Failure");
            return;
        }

        let det = cramer(match.slice(1, 7).map(x => Number(x)));
        res[0] += det.x;
        res[1] += det.y;
    })

    result = (res[0] * 3) + res[1];

    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).reduce((acc, cur) => acc + (cur == "" ? "\n" : " ") + cur, "").split("\n");

    let res = [0, 0];
    data.forEach(line => {
        let match = line.match(/Button A: X\+([0-9]+), Y\+([0-9]+) Button B: X\+([0-9]+), Y\+([0-9]+) Prize: X=([0-9]+), Y=([0-9]+)/);
        if(!match) {
            console.log("ERROR: Regexp Failure");
            return;
        }

        let det = cramer(match.slice(1, 7).map(x => Number(x)), 10000000000000);
        res[0] += det.x;
        res[1] += det.y;
    })

    result = (res[0] * 3) + res[1];

    al.finish(filename, result, check);
}

handleOne('sample-1.txt', 480);
handleOne('data-1.txt', 38839);

handleTwo('sample-1.txt', 0);
handleTwo('data-1.txt', 0);
