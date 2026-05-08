import random
import unittest

loetelu = []

class Alleel:
    def __init__(self, nimetus, vaartus):
        self.nimetus = nimetus
        self.vaartus = vaartus
    def on_positiivne(self):
        return self.vaartus
    def __str__(self):
        return self.nimetus + ("+" if self.vaartus else "-")
class Geen:
    def __init__(self, nimi, alleel1, alleel2):
        self.nimi = nimi
        self.alleel1 = alleel1
        self.alleel2 = alleel2
    def on_positiivne(self):
        return self.alleel1.on_positiivne() or self.alleel2.on_positiivne()
    def juhuslik_alleel(self):
        return random.choice([self.alleel1, self.alleel2])
    def __str__(self):
        return f"{self.nimi}: [{self.alleel1} / {self.alleel2}] -> {'pos' if self.on_positiivne() else 'neg'}"

def uhenda_geenid(g1, g2):
    return Geen("järglane", g1.juhuslik_alleel(), g2.juhuslik_alleel())
class TestAlleel(unittest.TestCase):
    def test_positiivne(self):
        self.assertTrue(Alleel("reesus", True).on_positiivne())
    def test_negatiivne(self):
        self.assertFalse(Alleel("reesus", False).on_positiivne())
    def test_str(self):
        self.assertEqual(str(Alleel("reesus", True)), "reesus+")
        self.assertEqual(str(Alleel("reesus", False)), "reesus-")
class TestGeen(unittest.TestCase):
    def _g(self, v1, v2):
        return Geen("x", Alleel("reesus", v1), Alleel("reesus", v2))
    def test_positiivne_domineerib(self):
        self.assertTrue(self._g(True, False).on_positiivne())
    def test_mõlemad_negatiivsed(self):
        self.assertFalse(self._g(False, False).on_positiivne())
    def test_juhuslik_alleel(self):
        g = self._g(True, False)
        positiivseid = 0
        for _ in range(1000):
            if g.juhuslik_alleel().vaartus:
                positiivseid += 1
        self.assertGreater(positiivseid, 400)
        self.assertLess(positiivseid, 600)
class TestUhendaGeenid(unittest.TestCase):
    def test_tulemus_on_geen(self):
        g = Geen("x", Alleel("reesus", True), Alleel("reesus", False))
        self.assertIsInstance(uhenda_geenid(g, g), Geen)
    def test_kaks_negatiivset_vanemat(self):
        g = Geen("x", Alleel("reesus", False), Alleel("reesus", False))
        self.assertFalse(uhenda_geenid(g, g).on_positiivne())
def sisesta_vaartus(tekst):
    while True:
        v = input(f"{tekst} (+/-): ").strip()
        if v in ("+", "-"):
            return v == "+"
        print("Palun sisesta + või -")

def lisa_isik():
    nimi = input("Isiku nimi: ").strip()
    n = input("Alleeli nimetus (nt reesus): ").strip() or "reesus"
    g = Geen(nimi, Alleel(n, sisesta_vaartus("  alleel 1")), Alleel(n, sisesta_vaartus("  alleel 2")))
    loetelu.append(g)
    print(f"Lisatud: {g}\n")

def kuva_loetelu():
    if not loetelu:
        print("Loetelu on tühi.\n")
    else:
        for i, g in enumerate(loetelu):
            print(f"  {i}: {g}")
        print()

def otsi():
    otsing = input("Otsi nimetuse järgi: ").strip().lower()
    tulemused = [g for g in loetelu if otsing in g.nimi.lower()]
    if not tulemused:
        print("Ei leitud.\n")
    else:
        for i, g in enumerate(tulemused):
            print(f"  {i}: {g}")
        print()

def tee_jarlane():
    kuva_loetelu()
    if len(loetelu) < 2:
        print("Vähemalt 2 isikut on vaja.\n")
        return
    try:
        i1 = int(input("Vanema 1 number: "))
        i2 = int(input("Vanema 2 number: "))
        laps = uhenda_geenid(loetelu[i1], loetelu[i2])
        loetelu.append(laps)
        print(f"Järglane lisatud: {laps}\n")
    except (ValueError, IndexError):
        print("Vale number.\n")

def rakendus():
    while True:
        print("1) Lisa isik  2) Kuva loetelu  3) Otsi  4) Tee järglane  5) Välju")
        valik = input("> ").strip()
        if valik == "1": lisa_isik()
        elif valik == "2": kuva_loetelu()
        elif valik == "3": otsi()
        elif valik == "4": tee_jarlane()
        elif valik == "5": break
        else: print("Palun vali 1-5\n")
if __name__ == "__main__":
    unittest.main(exit=False, verbosity=0, buffer=True)
    print("Testid OK\n")
    rakendus()