import * as al from 'leeh-aoc-lib';

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(",")).flat().map(x => x.split("-").map(y => Number(y)));

    for(let row of data.values()) {
        for(let i = row[0]; i <= row[1]; i++) {
            let val = i.toString();

            if(val.length % 2 != 0) {
                continue;
            }

            if(val.slice(0, val.length/2) == val.slice(val.length/2)) {
                result += i;
            }
        }
    }

    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(",")).flat().map(x => x.split("-").map(y => Number(y)));

    for(let row of data.values()) {
        for(let i = row[0]; i <= row[1]; i++) {
            let val = i.toString();

            for(let j = 2; j <= val.length; j++) {
                if(val.length % j != 0) {
                    continue;
                }

                let step = val.length / j;
                let cmp = val.slice(0, step);
                let match = true;

                for(let k = step; k < val.length; k += step) {
                    if(val.slice(k, k+step) != cmp) {
                        match = false;
                        break;
                    }
                }

                if(match) {
                    result += i;
                    break;
                }
            }
        }
    }

    al.finish(filename, result, check);
}

handleOne('sample-1.txt', 1227775554);
handleOne('data-1.txt', 53420042388);

handleTwo('sample-1.txt', 4174379265);
handleTwo('data-1.txt', 69553832684);