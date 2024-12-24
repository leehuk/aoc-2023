import * as al from 'leeh-aoc-lib';

type PageLimit = {
    [key: string]: number[];
};

function parse(filename: string, data: number[][], limits: PageLimit): void {
    al.lines(filename).forEach(x => {
        if(x == "") {
            return;
        }

        const res = x.match(/([0-9]+)\|([0-9]+)/);

        if(res) {
            if(!limits[res[1]]) {
                limits[res[1]] = [parseInt(res[2])];
            } else {
                limits[res[1]].push(parseInt(res[2]));
            }

            return;
        } else {
            data.push(x.split(",").map(x => parseInt(x)));
        }
    });
}

function dcheck(data: number[], limits: PageLimit): boolean {
    for(let i = 0; i < data.length; i++) {
        let val = data[i];

        if(!limits[val]) {
            continue;
        }

        for(let j = 0; j < i; j++) {
            let cval = data[j];

            if(limits[val].includes(cval)) {
                return false;
            }
        }
    }

    return true;
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = [] as number[][];
    let limits = {} as PageLimit;

    parse(filename, data, limits);

    data.forEach(x => {
        if(dcheck(x, limits)) {
            let mpos = Math.floor(x.length/2);
            result += x[mpos];
        }
    });

    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = [] as number[][];
    let limits = {} as PageLimit;

    parse(filename, data, limits);

    data.forEach(x => {
        if(dcheck(x, limits)) {
            return;
        }

        outer: while(1) {
            for(let i = 0; i < x.length; i++) {
                let val = x[i];

                if(!limits[val]) {
                    continue;
                }

                for(let j = 0; j < i; j++) {
                    let cval = x[j];

                    if(limits[val].includes(cval)) {
                        x.splice(i, 1);
                        x.splice(j, 0, val);
                        continue outer;
                    }
                }
            }

            break;
        }

        let mpos = Math.floor(x.length/2);
        result += x[mpos];
    });

    al.finish(filename, result, check);
}

handleOne('sample-1.txt', 143);
handleOne('data-1.txt', 7307);

handleTwo('sample-1.txt', 123);
handleTwo('data-1.txt', 4713);
