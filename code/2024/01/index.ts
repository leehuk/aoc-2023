import * as al from 'leeh-aoc-lib';

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.replace(/\s+/, " ")).map(x => x.split(" "));

    let left = data.map(x => parseInt(x[0])).toSorted();
    let right = data.map(x => parseInt(x[1])).toSorted();

    for (const [i, _] of left.entries()) {
        result += Math.abs(left[i] - right[i]);
    }

    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.replace(/\s+/, " ")).map(x => x.split(" "));

    let right = data.map(x => parseInt(x[1])).toSorted();

    for (const [_, val] of data.map(x => parseInt(x[0])).entries()) {
        result += (val * right.filter(x => x == val).length);
    }

    al.finish(filename, result, check);
}

handleOne('sample-1.txt', 11);
handleOne('data-1.txt', 2166959);

handleTwo('sample-1.txt', 31);
handleTwo('data-1.txt', 23741109);
