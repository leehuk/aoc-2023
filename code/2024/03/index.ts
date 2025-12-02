import * as al from 'leeh-aoc-lib';

function handle(line: string): number {
    let result = 0;
    let matches = line.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g)!;

    for(const val of matches) {
        let match = val.match(/\(([0-9]{1,3}),([0-9]{1,3})\)/)!;
        result += (parseInt(match[1]) * parseInt(match[2]));
    }

    return result;
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename).join('x');

    result = handle(data);

    al.finish(filename, result, check);
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = al.lines(filename);

    console.log(data[3]);
    let x = data[3].replace(/don't\(\).*?do\(\)/g, "");
    console.log(x);
    x = x.replace(/don't\(\).*/, "");
    console.log(x);

    let lines = data.map(x => x.replace(/don't\(\).*?do\(\)/g, "")).map(x => x.replace(/don't\(\).*/, "")).join('x');
    result = handle(lines);

    al.finish(filename, result, check);
}

handleOne('sample-1.txt', 161);
handleOne('data-1.txt', 173785482);

//handleTwo('sample-2.txt', 48);
handleTwo('data-1.txt', 0);
