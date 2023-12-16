export function fillarray(rows: number, cols: number): any[][] {
    return Array(rows).fill(undefined).map(r => Array(cols).fill(undefined).map(c => undefined));
}

export function fillarrayarr(rows: number, cols: number): any[][] {
    return Array(rows).fill(undefined).map(r => Array(cols).fill(undefined).map(c => []));
}