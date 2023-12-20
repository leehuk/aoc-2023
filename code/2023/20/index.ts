import * as al from 'leeh-aoc-lib';
import { isAssertsKeyword } from 'typescript';

interface Router {
    name: string,
    action: string,
    children: Router[],

    fstate?: boolean,
    cstate?: Record<string,boolean>,

    success?: boolean
}

function rtinit(engine: Record<string,Router>, name: string): Router {
    if(!engine[name]) {
        let rt = {
            name: name,
            action: "",
            children: []
        } as Router;
        engine[name] = rt;
    }

    return engine[name];
}

function parse(data: string[]): Record<string,Router> {
    let engine: Record<string,Router> = {};

    for(let line of data) {
        let match = line.match(/^([%&]?)([a-z]+) -> (.*)$/);
        let rt = rtinit(engine, match![2]);
        rt.action = match![1];

        if(rt.action == "%") {
            rt.fstate = false;
        } else if(rt.action == "&") {
            rt.cstate = {};
        }

        if(rt.name == "rx") {
            rt.success = true;
        }

        match![3].replaceAll(" ", "").split(",").forEach((cname,idx) => {
            let crt = rtinit(engine, cname);
            engine[rt.name].children.push(crt);
        });
    }

    let invs = [];
    for(let rt of Object.values(engine)) {
        if(rt.action == "&") {
            invs.push(rt.name);
        }
    }
    for(let rt of Object.values(engine)) {
        for(let child of rt.children) {
            for(let inv of invs) {
                if(inv == child.name) {
                    engine[inv].cstate![rt.name] = true;
                }
            }
        }
    }

    return engine;
}

interface Pulse {
    from: Router,
    to: Router,
    low: boolean
}

let stoptheworld = false;

function pulse(engine: Record<string,Router>): number[] {
    let stack = [{ from: engine['broadcaster'], to: engine['broadcaster'], low: true }];
    let countl = 0;
    let counth = 0;

    while(stack.length > 0) {
        let pl = stack.shift() as Pulse;
        let rt = pl.to;

        //console.log(`pulse ${pl.from.name} -> ${rt.name} ${(pl.low ? "low" : "high")}`);

        if(pl.low) {
            countl++;

            if(rt.success === true) {
                stoptheworld = true;
            }
        } else {
            counth++;
        }

        if(rt.action == "%") {
            if(!pl.low) {
                continue;
            }

            let low = rt.fstate;
            rt.fstate = !rt.fstate;

            for(let child of pl.to.children) {
                stack.push({ from: rt, to: child, low: low! });
            }
        } else if(rt.action == "&") {
            let low = false;

            rt.cstate![pl.from.name] = pl.low;
            if(Object.values(rt.cstate!).reduce((acc, val) => (val ? acc+1 : acc), 0 ) == 0) {
                low = true;
            }

            for(let child of pl.to.children) {
                stack.push({ from: rt, to: child, low: low });
            }
        } else {
            for(let child of pl.to.children) {
                stack.push({ from: rt, to: child, low: true });
            }
        }
    }

    return [countl,counth];
}

function handleOne(filename: string, check?: Object): void {
    let result = 0;
    let data = parse(al.lines(filename));

    let lresults = [];
    for(let i = 0; i < 1000; i++) {
        lresults.push(pulse(data));
    }

    let countl = lresults.map(x => x[0]).reduce((acc, val) => acc+val, 0);
    let counth = lresults.map(x => x[1]).reduce((acc, val) => acc+val, 0);

    result = countl * counth;

    al.finish(filename, result, check);
}

function asstr(engine: Record<string,Router>, name: string): string {
    return Object.values(engine[name].cstate!).map(x => (x ? "T" : "F")).join("");
}

function handleTwo(filename: string, check?: Object): void {
    let result = 0;
    let data = parse(al.lines(filename));

    let i = 0;
    while(true) {
        console.log(`iteration ${i.toString().padStart(10)}: jc:${asstr(data, 'jc')}`);

        i++;
        pulse(data);


        if(stoptheworld) {
            result = i;
            break;
        }
    }

    al.finish(filename, result, check);
}

//handleOne('sample-1.txt', 32000000);
//handleOne('sample-2.txt', 11687500);
//handleOne('data-1.txt', 0);

//handleTwo('sample-2.txt', 0);
handleTwo('data-1-bv.txt', 0);