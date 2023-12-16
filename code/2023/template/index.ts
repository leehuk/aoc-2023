import * as al from 'leeh-aoc-lib';

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));

    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));

    al.finish(filename, result, check);
}

handleOne('sample-1.txt', 0);
//handleOne('data-1.txt', 0);

//handleTwo('sample-2.txt', 0);
//handleTwo('data-2.txt', 0);
