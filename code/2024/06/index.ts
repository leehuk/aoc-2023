import * as al from 'leeh-aoc-lib';

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));
    let mark = al.fillarray(data.length, data[0].length);

    let pos = al.veclocate(data, "^");
    if(pos === false) {
        console.log("uhoh");
        return;
    }

    data[pos['row']][pos['col']] = ".";
    mark[pos['row']][pos['col']] = true;

    let dir = { dir: "n" } as al.VecDir;

    while(true) {
        let peek = al.vecdataat(pos, data, dir.dir);

        //console.log("at position: " + al.vecp(pos) + " facing " + dir.dir + " seeing " + peek);

        if(peek === false) {
            break;
        } else if(peek == ".") {
            al.vecmove(pos, data, dir.dir);
            mark[pos['row']][pos['col']] = true;
        } else if(peek == "#") {
            al.degrotate(dir, 90);
        } else {
            console.log("unexpected chr " + peek + " at " + al.vecp(pos));
        }
    }

    result = mark.map(x => x.reduce((acc, val) => (val === true ? acc+1 : acc), 0)).reduce((acc, val) => acc += val, 0);

    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));

    let startpos = al.veclocate(data, "^");
    if(startpos === false) {
        console.log("uhoh");
        return;
    }
    data[startpos.row][startpos.col] = ".";

    let blocks = al.fillarray(data.length, data[0].length);

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[0].length; j++) {
            let pos = al.vecclone(startpos);
            let dir = { dir: "n" } as al.VecDir;
            let mark = al.fillarrayarr(data.length, data[0].length);

            mark[pos.row][pos.col].push(dir.dir);

            if(i == startpos.row && j == startpos.col) {
                continue;
            }

            if(data[i][j] == "#") {
                continue;
            }

            data[i][j] = "#";

            while(true) {
                let dpeek = al.vecdataat(pos, data, dir.dir);
                let mpeek = al.vecdataat(pos, mark, dir.dir);

                if(dpeek === false) {
                    break;
                } else if(mpeek.includes(dir.dir)) {
                    blocks[i][j] = true;
                    break;
                } else if(dpeek == ".") {
                    al.vecmove(pos, data, dir.dir);
                    mark[pos.row][pos.col].push(dir.dir);
                } else if(dpeek == "#") {
                    al.degrotate(dir, 90);
                } else {
                    console.log("unexpected chr " + dpeek + " at " + al.vecp(pos));
                }
            }

            data[i][j] = ".";
        }
    }

    result = blocks.map(x => x.reduce((acc, val) => (val === true ? acc+1 : acc), 0)).reduce((acc, val) => acc += val, 0);

    al.finish(filename, result, check);
}

handleOne('sample-1.txt', 41);
handleOne('data-1.txt', 5531);

handleTwo('sample-1.txt', 6);
handleTwo('data-1.txt', 2165);
