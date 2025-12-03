import * as al from 'leeh-aoc-lib';

function gridwalk(grid : al.CoordGrid, mode: "UNIQUE_TARGET"|"UNIQUE_PATH"): number {
    let result = 0;

    for(let pos of grid.findval("0")) {
        result += grid.walk(
            pos,
            mode,
            function (from, to, depth): boolean {
                return (Number(from.data)+1 == Number(to.data)) ? true : false;
            },
            function (pos, depth): boolean {
                return (pos.data == "9" && depth == 9) ? true : false;
            }
        );
    }

    return result;
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));

    result = gridwalk(new al.CoordGrid(data), "UNIQUE_TARGET");
    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));

    result = gridwalk(new al.CoordGrid(data), "UNIQUE_PATH");
    al.finish(filename, result, check);
}

handleOne('sample-1.txt', 36);
handleOne('data-1.txt', 782);

handleTwo('sample-1.txt', 81);
handleTwo('data-1.txt', 1694);
