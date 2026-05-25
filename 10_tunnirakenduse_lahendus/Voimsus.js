"use strict";
class Resistor {
    constructor(r) {
        this.r = r;
    }
    getResistance() { return this.r; }
    getCurrent(u) { return u / this.r; }
    getPower(u) { return u * this.getCurrent(u); }
    draw(ctx, x, y, u) {
        const w = 60;
        const h = 30;
        const i = this.getCurrent(u);
        const p = this.getPower(u);
        // Sildid ülaosas: pinge ja vool
        ctx.fillStyle = "#333";
        ctx.font = "11px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.fillText(`${u.toFixed(1)} V, ${i.toFixed(3)} A`, x + w / 2, y - 6);
        // Vasak ühendusjoon
        ctx.beginPath();
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1.5;
        ctx.moveTo(x, y + h / 2);
        ctx.lineTo(x + 10, y + h / 2);
        ctx.stroke();
        // Takisti keha
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.rect(x + 10, y, w - 20, h);
        ctx.fill();
        ctx.stroke();
        // Takistuse väärtus sees
        ctx.fillStyle = "#222";
        ctx.font = "11px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.r + " Ω", x + w / 2, y + h / 2);
        // Parem ühendusjoon
        ctx.beginPath();
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1.5;
        ctx.moveTo(x + w - 10, y + h / 2);
        ctx.lineTo(x + w, y + h / 2);
        ctx.stroke();
        // Võimsus allosas
        ctx.fillStyle = "#333";
        ctx.font = "11px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(`${p.toFixed(3)} W`, x + w / 2, y + h + 4);
    }
}
let resistor;
let canvas;
let ctx;
let sliderR;
let sliderU;
let labelR;
let labelU;
function update() {
    const r = parseFloat(sliderR.value);
    const u = parseFloat(sliderU.value);
    labelR.textContent = r + " Ω";
    labelU.textContent = u.toFixed(1) + " V";
    resistor = new Resistor(r);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resistor.draw(ctx, canvas.width / 2 - 30, 30, u);
}
function startPage() {
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d");
    sliderR = document.getElementById("sliderR");
    sliderU = document.getElementById("sliderU");
    labelR = document.getElementById("labelR");
    labelU = document.getElementById("labelU");
    sliderR.addEventListener("input", update);
    sliderU.addEventListener("input", update);
    update();
}