import * as al from 'leeh-aoc-lib';

interface Result {
    pos: number,
    count: number,
};

function updatePos(pos: number, dir: string, rot: number): number {
    if(dir == "L") {
        pos -= rot;
    } else {
        pos += rot;
    }

    pos = pos % 100;
    if(pos < 0) {
        pos = (100 + pos);
    }

    return pos;
}

function updatePosTrack(dir: string, rot: number, result: Result): void {
    let start = result.pos;

    while(rot >= 100) {
        rot -= 100;
        result.count++;
    };

    if(dir == "L") {
        result.pos -= rot;
    } else {
        result.pos += rot;
    }

    // overflowed
    if(result.pos >= 100) {
        result.pos -= 100;
        result.count++;
    // correct negative
    } else if(result.pos < 0) {
        // underflowed
        if(result.pos <= -100) {
            result.pos += 100;
            result.count++;
        }

        // crossed the zero boundary
        if(start > 0) {
            result.count++;
        }

        result.pos = (100 + result.pos);
    } else if(result.pos == 0) {
        result.count++;
    }
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename);

    let pos = 50;
    let count = 0;

    for(let entry of data.values()) {
        let d = entry.charAt(0);
        let r = Number(entry.substring(1));

        pos = updatePos(pos, entry.charAt(0), Number(entry.substring(1)));
        if(pos == 0) {
            result++;
        }
    }

    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result: Result = { pos: 50, count: 0 };
    let data: [string, number][] = al.lines(filename).map(x => [x.charAt(0), Number(x.substring(1))]);

    for(let entry of data.values()) {
        updatePosTrack(entry[0], entry[1], result);
    }

    al.finish(filename, result.count, check);
}

handleOne('sample-1.txt', 3);
handleOne('data-1.txt', 1043);

handleTwo('sample-1.txt', 6);
handleTwo('data-1.txt', 5963);
