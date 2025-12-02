import * as al from 'leeh-aoc-lib';

function getAnts(data: string[][]): Record<string, al.Coord[]> {
    let ants : Record<string, al.Coord[]> = {};

    for(let [y, vals] of data.entries()) {
        for(let [x, code] of vals.entries()) {
            if(code == ".") {
                continue;
            }

            let coord = new al.Coord(x, y, code);
            if(code in ants) {
                ants[code].push(coord);
            } else {
                ants[code] = [coord];
            }
        }
    }

    return ants;
}

function markSeen(node: al.Coord, data: boolean[][]) {
    if(data[node.x] === undefined) {
        data[node.x] = new Array();
    }

    data[node.x][node.y] = true;
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));

    let xmax = data[0].length - 1;
    let ymax = data.length - 1;

    let ants = getAnts(data);
    let seen : boolean[][] = new Array(xmax);

    for(const key of Object.keys(ants)) {
        while(ants[key].length > 1) {
            let pos = ants[key].pop()!;

            for(let coord of Object.values(ants[key])) {
                let anode = coord.clone().add(pos.distance(coord));
                if(anode.bounded(0, xmax, 0, ymax)) {
                    markSeen(anode, seen);
                }

                anode = pos.clone().sub(pos.distance(coord));
                if(anode.bounded(0, xmax, 0, ymax)) {
                    markSeen(anode, seen);
                }
            }
        }
    }

    result = seen.flat().length;
    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));

    let xmax = data[0].length - 1;
    let ymax = data.length - 1;

    let ants = getAnts(data);
    let seen : boolean[][] = new Array(xmax);

    for(const key of Object.keys(ants)) {
        while(ants[key].length > 1) {
            let pos = ants[key].pop()!;
            markSeen(pos, seen);

            for(let coord of Object.values(ants[key])) {
                markSeen(coord, seen);

                let anode = coord.clone();
                while(anode.bounded(0, xmax, 0, ymax)) {
                    markSeen(anode, seen);
                    anode.add(pos!.distance(coord));
                }

                anode = pos.clone();
                while(anode.bounded(0, xmax, 0, ymax)) {
                    markSeen(anode, seen);
                    anode.sub(pos.distance(coord));
                }
            }
        }
    }

    result = seen.flat().length;
    al.finish(filename, result, check);
}

handleOne('sample-1.txt', 14);
handleOne('data-1.txt', 273);

handleTwo('sample-1.txt', 34);
handleTwo('data-1.txt', 1017);
