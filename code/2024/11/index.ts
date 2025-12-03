import * as al from 'leeh-aoc-lib';

function mgs(map: Map<number,number>, key: number, value: number) {
    let cur = map.get(key);
    if(cur === undefined) {
        map.set(key, value);
    } else {
        map.set(key, cur+value);
    }
}

function stoneShift(map: Map<number,number>): Map<number,number> {
    let res = new Map<number,number>;

    for(const [idx,count] of map.entries()) {
        if(idx === 0) {
            mgs(res, 1, count);
        } else {
            let sidx = idx.toString();
            if(sidx.length % 2 == 0) {
                mgs(res, Number(sidx.substring(0, sidx.length/2)), count);
                mgs(res, Number(sidx.substring(sidx.length/2)), count);
            } else {
                mgs(res, idx*2024, count);
            }
        }
    }

    return res;
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = new Map<number,number>();
    al.lines(filename).map(x => x.split(" ")).flat().map(x => Number(x)).forEach(x => mgs(data, x, 1));

    for(let i = 0; i < 25; i++) {
        data = stoneShift(data);
    }

    for(const [_,count] of data.entries()) {
        result += count;
    }

    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = new Map<number,number>();
    al.lines(filename).map(x => x.split(" ")).flat().map(x => Number(x)).forEach(x => mgs(data, x, 1));

    for(let i = 0; i < 75; i++) {
        data = stoneShift(data);
    }

    for(const [_,count] of data.entries()) {
        result += count;
    }

    al.finish(filename, result, check);
}

handleOne('sample-1.txt', 55312);
handleOne('data-1.txt', 202019);

//handleTwo('sample-1.txt', 0);
handleTwo('data-1.txt', 239321955280205);
