interface Mereloom {
    nimi: string;
    liigu(): string;
    haalitse(): string;
}

class Kala implements Mereloom {
    nimi: string;

    constructor(nimi: string) {
        this.nimi = nimi;
    }

    liigu(): string {
        return this.nimi + " ujub vees ";
    }

    haalitse(): string {
        return this.nimi + " teeb mull-mull";
    }
}

function testiMereloom() {
    const kala = new Kala("Nemo");

    console.assert(kala.liigu() === "Nemo ujub vees ", "liikumine vale");
    console.assert(kala.haalitse() === "Nemo teeb mull-mull", "hääl vale");

    console.log("Testid läbitud ");
}


function kuvaLehel() {
    const kala = new Kala("Dory");

    const output = document.getElementById("output");
    if (output) {
        output.innerHTML =
            "<p>" + kala.liigu() + "</p>" +
            "<p>" + kala.haalitse() + "</p>";
    }
}


testiMereloom();
window.onload = kuvaLehel;
