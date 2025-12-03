import * as al from 'leeh-aoc-lib';

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""))[0];

    let rdata = [];
    let fid = 0;

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < Number(data[i]); j++) {
            rdata.push((i % 2 == 0) ? fid : undefined);
        }

        if(i % 2 == 0) {
            fid++;
        }
    }

    for(let i = 0; i < rdata.length; i++) {
        if(rdata[i] !== undefined) {
            continue;
        }

        while(i < rdata.length) {
            let sq : any = rdata.pop()!;
            if(sq !== undefined) {
                rdata[i] = sq;
                break;
            }
        }
    }

    for(let i = 0; i < rdata.length; i++) {
        result += (i * rdata[i]);
    }

    al.finish(filename, result, check);
}

interface Block {
    fid: number;
    size: number;
    free: boolean;
    moved: boolean;
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""))[0];

    let blks : Block[] = [];

    let fid = 0;
    for(let [i, size] of data.entries()) {
        let blk : Block = { fid: fid, size: Number(size), free: (i % 2 == 0) ? false : true, moved: false };
        blks.push(blk);

        if(i % 2 == 0) {
            fid++;
        }
    }

    for(let chkpos = blks.length - 1; chkpos > 0; chkpos--) {
        let movblk = blks[chkpos];

        if(movblk.free || movblk.moved) {
            continue;
        }

        for(let [i, chkblk] of blks.entries()) {
            if(!chkblk.free || chkblk.size < movblk.size) {
                continue;
            }

            // free space past the current block
            if(chkblk.fid > movblk.fid) {
                break;
            }

            blks.splice(i, (chkblk.size == movblk.size ? 1 : 0), { fid: movblk.fid, size: movblk.size, free: false, moved: true } as Block);
            // correct offset after splice
            chkpos += (chkblk.size == movblk.size ? 0 : 1);
            chkblk.size -= movblk.size;
            movblk.free = true;

            break;
        }
    }

    let pos = 0;
    for(let blk of blks.values()) {
        if(blk.free) {
            pos += blk.size;
            continue;
        }

        for(let i = 0; i < blk.size; i++) {
            result += pos * blk.fid;
            pos++;
        }
    }

    al.finish(filename, result, check);
}

handleOne('sample-1.txt', 1928);
handleOne('data-1.txt', 6607511583593);

handleTwo('sample-1.txt', 2858);
handleTwo('data-1.txt', 6636608781232);
