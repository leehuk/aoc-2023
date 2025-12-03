import * as al from 'leeh-aoc-lib';

function maxpos(values: number[]): {max: number, pos: number} {
    let max = Math.max(...values);

    return { max: max, pos: values.indexOf(max) };
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split("").map(x => Number(x)));

    for(let row of data.values()) {
        let m1 = -1;
        let m2 = -1;

        for(let i = 0; i < row.length; i++) {
            if(row[i] > m1 && i < row.length-1) {
                m1 = row[i];
                m2 = -1;
            } else if(row[i] > m2) {
                m2 = row[i];
            }
        }

        result += (m1*10)+m2;
    }

    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split("").map(x => Number(x)));

    for(let row of data.values()) {
        let len = 12;
        // sliding window length
        let wlen = row.length - len + 1;

        let maxv = "";
        let pos = 0;

        while(maxv.length < len) {
            let mp = maxpos(row.slice(pos, pos+wlen));
            maxv += mp.max.toString();

            pos += mp.pos + 1;
            wlen -= mp.pos;

            if(wlen == 1) {
                maxv += row.slice(pos).map(x => x.toString()).join("");
            }
        }

        result += Number(maxv);
    }

    al.finish(filename, result, check);
}

handleOne('sample-1.txt', 357);
handleOne('data-1.txt', 17092);

handleTwo('sample-1.txt', 3121910778619);
handleTwo('data-1.txt', 170147128753455);
