# Veröffentlichung Schritt für Schritt (SGT Rechner)

Einfache Checkliste für alle Schritte außerhalb des Codes. Reihenfolge einhalten –
jeder Block ist unabhängig abhakbar.

## 1. GitHub Pages aktivieren (Web-Version + Datenschutz-URL)

1. Im Browser das Repo öffnen: `github.com/MarqEwi/sgt-rechner`
2. Oben auf **Settings** → links auf **Pages**
3. Bei „Build and deployment“: **Deploy from a branch** wählen,
   Branch **main**, Ordner **/ (root)** → **Save**
4. Nach 1–2 Minuten ist die App unter `https://marqewi.github.io/sgt-rechner/`
   erreichbar – und die Datenschutzerklärung unter
   `https://marqewi.github.io/sgt-rechner/datenschutz.html`
   (diese URL brauchst du später in der Play Console)

## 2. AdMob: neue App + Banner anlegen

1. Auf [admob.google.com](https://admob.google.com) anmelden (gleiches Konto wie BFT/PFT)
2. **Apps → App hinzufügen** → Plattform **Android** →
   „Ist die App bei Google Play gelistet?“ → **Nein** (sie ist ja noch nicht veröffentlicht)
3. App-Name: **SGT Rechner** → anlegen
4. Die neue **App-ID** kopieren (Format `ca-app-pub-…~…`) →
   in `android/app/src/main/AndroidManifest.xml` die Test-ID ersetzen
5. In der neuen App: **Anzeigenblöcke → Anzeigenblock hinzufügen → Banner**,
   Name z. B. „SGT Banner unten“ → anlegen
6. Die **Banner-Block-ID** kopieren (Format `ca-app-pub-…/…`) →
   in `index.html` bei `ADS_CONF` eintragen und `TESTING: false` setzen
7. **Datenschutz & Mitteilungen** → DSGVO-Meldung für die neue App aktivieren,
   Option „Nicht einwilligen“ einschalten
8. Wichtig: Neue AdMob-Apps liefern anfangs oft „code 3 / not approved“ –
   das ist die normale Prüfzeit (Stunden bis wenige Tage). Solange laufen
   keine echten Anzeigen; die App funktioniert trotzdem.

## 3. Play Console: App anlegen

1. [play.google.com/console](https://play.google.com/console) → **App erstellen**
2. Name: **SGT Soldaten-Grundfitness-Tool** (exakt 30 Zeichen) ·
   Sprache Deutsch · **App** · **Kostenlos**
3. Store-Eintrag: Texte aus `docs/store-texte.md` einfügen,
   Icon `icons/icon-512.png`, Feature-Grafik 1024×500 mit Hintergrund **#5C663B**
4. **Data Safety** ausfüllen (siehe Kurzreferenz in `docs/store-texte.md`);
   „Gesundheit und Fitness“ NICHT ankreuzen
5. Anzeigen: **Ja** · Werbe-ID: **Ja** · Zielgruppe: **18+**
6. Datenschutz-URL: `https://marqewi.github.io/sgt-rechner/datenschutz.html`

## 4. Einmalkauf-Produkt anlegen

1. Play Console → deine App → **Monetarisieren → Produkte → In-App-Produkte**
2. **Produkt erstellen** · Produkt-ID: `premium_unlock`
3. Name: „Premium freischalten“ · Typ: einmaliger Kauf (nicht Abo) ·
   Kategorie „Digitale Inhalte“
4. Kaufoption anlegen mit ID `premium-unlock` · Preis **2,99 €** → aktivieren

## 5. Signieren & hochladen (Android Studio)

1. Die Datei `android/keystore.properties.example` kopieren zu
   `android/keystore.properties` und die Werte des **vorhandenen** Keystores
   eintragen (derselbe Keystore signiert auch BFT und PFT – nicht neu erzeugen!)
2. Vor jedem Build: `npm run cap:sync`
3. Android Studio: **Build → Generate Signed App Bundle → release**
4. Das `.aab` in der Play Console hochladen (erst interner Test, dann Produktion)
5. Bei jedem weiteren Upload in `android/app/build.gradle` den `versionCode`
   um 1 erhöhen

## 6. Nach der AdMob-Freigabe

1. Prüfen, dass in `index.html` `TESTING: false` und die echte Banner-ID stehen
2. Prüfen, dass im `AndroidManifest.xml` die echte AdMob-App-ID steht
   (fehlt sie, stürzt die App beim Start ab!)
3. `npm run cap:sync` → neu bauen → mit erhöhtem versionCode hochladen
