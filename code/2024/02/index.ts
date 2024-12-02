import * as al from 'leeh-aoc-lib';

function isValid(val: number[]): boolean {
    if(val[1] < val[0]) {
        val = val.reverse();
    }

    for(let idx = 0; idx < val.length-1; idx++) {
        let diff = Math.abs(val[idx] - val[idx+1]);
        if(diff < 1 || diff > 3 || val[idx+1] <= val[idx]) {
            return false;
        }
    }

    return true;
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(" ").map(x => parseInt(x)));

    result = data.reduce((acc, val) => { return isValid(val) ? acc + 1 : acc; }, 0);

    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(" ").map(x => parseInt(x)));

    outer: for(const [_, val] of data.entries()) {
        if(isValid(val) || isValid(val.slice(1)) || isValid(val.slice(0, -1))) {
            result++;
            continue outer;
        }

        for(let idx = 1; idx < val.length-1; idx++) {
            if(isValid([...val.slice(0, idx), ...val.slice(idx+1)])) {
                result++;
                continue outer;
            }
        }
    }

 
    al.finish(filename, result, check);
}

handleOne('sample-1.txt', 2);
handleOne('data-1.txt', 591);

handleTwo('sample-1.txt', 4);
handleTwo('data-1.txt', 621);
