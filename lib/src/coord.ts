export class Coord {
    x: number;
    y: number;
    data: any;

    constructor(x = 0, y = 0, data : any = null) {
        this.x = x;
        this.y = y;
        this.data = data;
    }

    public toString(): string {
        return "(" + this.x + "," + this.y + ")";
    }

    add(pos: Coord): Coord {
        this.x += pos.x;
        this.y += pos.y;
        return this;
    }

    sub(pos: Coord): Coord {
        this.x -= pos.x;
        this.y -= pos.y;
        return this;
    }

    bounded(xmin: number, xmax: number, ymin: number, ymax: number): boolean {
        if(this.x >= xmin && this.x <= xmax && this.y >= ymin && this.y <= ymax) {
            return true;
        }

        return false;
    }

    clone(): Coord {
        return new Coord(this.x, this.y, this.data);
    }

    distance(to: Coord): Coord {
        return new Coord(to.x - this.x, to.y - this.y);
    }

    invert(): Coord {
        this.x *= -1;
        this.y *= -1;
        return this;
    }
};

