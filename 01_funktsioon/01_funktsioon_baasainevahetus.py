def baasainevahetus():
    print("Baasainevahetuse kalkulaator")

    sugu = input("Olete mees või naine? ").strip().lower()
    pikkus = float(input("Kui pikk olete? "))
    kaal = float(input("Mitu kg kaalute? "))
    vanus = int(input("Kui vana olete? "))
    
    if sugu == "mees":
      bmr = 10 * kaal + 6.25 * pikkus - 5 * vanus + 5
    else:
      bmr = 10 * kaal + 6.25 * pikkus - 5 * vanus - 161
    
    print(f"\nSinu kulutad päevas {round(bmr)} kalorit, lihtsalt elades")

baasainevahetus()