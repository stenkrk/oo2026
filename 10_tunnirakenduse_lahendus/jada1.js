"use strict";
class Resistor {
    constructor(r) {
        this.r = r;
        this.width = Resistor.WIDTH;
        this.height = Resistor.HEIGHT;
    }
    getResistance() { return this.r; }
    getCurrent(u) { return u / this.r; }
    getPotential(i) { return i * this.r; }
    getPower(u) { return u * this.getCurrent(u); }
    draw(ctx, x, y) {
        const w = this.width;
        const h = this.height;
        ctx.beginPath();
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.moveTo(x, y + h / 2);
        ctx.lineTo(x + 10, y + h / 2);
        ctx.moveTo(x + w - 10, y + h / 2);
        ctx.lineTo(x + w, y + h / 2);
        ctx.stroke();
        ctx.fillStyle = "#d4e8ff";
        ctx.strokeStyle = "#2255aa";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(x + 10, y, w - 20, h);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#112244";
        ctx.font = "11px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.r + "Ω", x + w / 2, y + h / 2);
    }
}
Resistor.WIDTH = 60;
Resistor.HEIGHT = 30;
class SeriesCircuit {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.resistors = [];
    }
    push(r) {
        this.resistors.push(r);
        this.draw();
    }
    getTotalResistance() {
        return this.resistors.reduce((sum, r) => sum + r.getResistance(), 0);
    }
    draw() {
        const ctx = this.ctx;
        const totalWidth = this.resistors.reduce((s, r) => s + r.width, 0);
        ctx.clearRect(this.x - 2, this.y - 20, totalWidth + 80, Resistor.HEIGHT + 40);
        ctx.fillStyle = "#444";
        ctx.font = "12px sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        ctx.fillText("R_tot = " + this.getTotalResistance() + " Ω", this.x, this.y - 6);
        let curX = this.x;
        for (const r of this.resistors) {
            r.draw(ctx, curX, this.y);
            curX += r.width;
        }
        ctx.beginPath();
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.moveTo(curX, this.y + Resistor.HEIGHT / 2);
        ctx.lineTo(curX + 10, this.y + Resistor.HEIGHT / 2);
        ctx.stroke();
    }
}