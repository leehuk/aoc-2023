import * as al from 'leeh-aoc-lib';

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            let vec = al.vecinit(i, j);

            if(al.vecdata(vec, data) == "X") {
                outer: for(const dir of al.vecdirs() as (keyof al.VecCardinal)[]) {
                    vec = al.vecinit(i, j);

                    for(const letter of ["M","A","S"]) {
                        if(!al.vecmove(vec, data, dir)) {
                            continue outer;
                        }

                        if(al.vecdata(vec, data) != letter) {
                            continue outer;
                        }
                    }

                    result++;
                }
            }
        }
    }

    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            let vec = al.vecinit(i, j);

            if(al.vecdata(vec, data) == "A") {
                let ne = al.vecdataat(vec, data, "ne");
                let se = al.vecdataat(vec, data, "se");
                let sw = al.vecdataat(vec, data, "sw");
                let nw = al.vecdataat(vec, data, "nw");

                if(ne === false || se === false || sw === false || nw === false) {
                    continue;
                }

                if(((ne == "M" && sw == "S") || (ne == "S" && sw == "M")) && ((nw == "M" && se == "S") || (nw == "S" && se == "M"))) {
                    result++;
                }
            }
        }
    }

    al.finish(filename, result, check);
}

handleOne('sample-1.txt', 18);
handleOne('data-1.txt', 2462);

handleTwo('sample-1.txt', 9);
handleTwo('data-1.txt', 1877);
