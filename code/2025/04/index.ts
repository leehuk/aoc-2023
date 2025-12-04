import * as al from 'leeh-aoc-lib';

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));
    let grid = new al.CoordGrid(data);

    for(let pos of grid.findval("@")) {
        if(grid.neighs(pos, al.coordVec8Arr).filter(x => x.data == "@").length < 4) {
            result++;
        }
    }

    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));
    let grid = new al.CoordGrid(data);

    let updated = true;
    while(updated) {
        updated = false;
        for(let pos of grid.findval("@")) {
            if(grid.neighs(pos, al.coordVec8Arr).filter(x => x.data == "@").length < 4) {
                pos.data = ".";
                result++;
                updated = true;
            }
        }
    }

    al.finish(filename, result, check);
}

handleOne('sample-1.txt', 13);
handleOne('data-1.txt', 1489);

handleTwo('sample-1.txt', 43);
handleTwo('data-1.txt', 8890);
