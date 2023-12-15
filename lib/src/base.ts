import * as fs from "fs";

export function finish(filename: string, value: any, check?: any): void {
    console.log("Final results for " + filename + ": " + value + (check ? (value === check ? " (ok)" : " (***FAIL***)") : ""));
}

export function lines(filename: string): string[] {
    return fs.readFileSync(filename, 'utf8').replace(/[\r\n]+$/, '').split(/\n/);
}
