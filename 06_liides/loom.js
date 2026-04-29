"use strict";


class Loom {
    liigu() {
        throw new Error("liigu() peab olema implementeeritud");
    }

    heli() {
        throw new Error("heli() peab olema implementeeritud");
    }
}


class Koer extends Loom {
    liigu() {
        return "Koer jookseb neljal jalal ";
    }

    heli() {
        return "Auh auh!";
    }
}

class Kass extends Loom {
    liigu() {
        return "Kass hiilib vaikselt ";
    }

    heli() {
        return "Mjäu!";
    }
}


class Lind extends Loom {
    liigu() {
        return "Lind lendab ";
    }

    heli() {
        return "Tsirp tsirp!";
    }
}


const loomad = [
    new Koer(),
    new Kass(),
    new Lind()
];

for (let loom of loomad) {
    console.log(loom.liigu());
    console.log(loom.heli());
    console.log("-----");
}
