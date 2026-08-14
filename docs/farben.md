# Farben – SGT Rechner

Verbindliche Farbwerte dieser App. Wer Icons, Store-Grafiken oder das Design
anfasst, nimmt die Werte von hier – **nicht** aus einem Bildbetrachter.

## Warum nicht mit der Pipette

Das Logo stammt aus einer KI-Erzeugung, und solche Bilder rauschen: Die
scheinbar einfarbige Olivfläche des SGT-Logos schwankt gemessen zwischen
**#586237 und #5E673C**. Wer mit der Pipette hineinklickt, erwischt einen
Zufallswert aus diesem Band.

Das ist keine Kosmetik: Im Adaptive Icon liegt die Vordergrundebene
(`ic_launcher_foreground.png`, das Logo bei 60 % Größe) **auf** einer
einfarbigen Hintergrundebene (`ic_launcher_background`). Passt die
Hintergrundfarbe nicht zur Fläche des Logos, sieht man auf dem Startbildschirm
eine Kante rund um das Logo.

Richtig ermittelt wird die Flächenfarbe deshalb über den **häufigsten Farbwert
(Modus)** der großen Fläche. Gemessen am Original-Logo (1024 × 1024, 69 % der
Pixel gehören zur Fläche):

| Kennzahl | Wert |
|---|---|
| Modus der Fläche | `#5C653A` |
| Median | `#5C6539` |
| Mittelwert | `#5B653A` |
| Mittelwert der **Randpixel** der Vordergrundebene (die tatsächlich an die Hintergrundfarbe stoßen) | `#5A6338` … `#5B643A` |

Der festgelegte Wert **`#5B653A`** liegt in der Mitte dieser Messungen und
weicht von jeder einzelnen um höchstens zwei Stufen ab – sichtbar ist das
nicht (ΔE < 1). Er bleibt deshalb unverändert.

## Die drei Logofarben

Ein Logo dieser Familie hat drei Farben, mehr nicht.

| Rolle | Hex | Fundstelle im Code |
|---|---|---|
| Fläche (Olivgrün) | `#5B653A` | `android/app/src/main/res/values/ic_launcher_background.xml`, `android/app/src/main/res/drawable/ic_launcher_background.xml` (`fillColor`), Rand der Maskable-Version `icons/icon-maskable-512.png` |
| Piktogramm (Plattenträger) | `#000000` | im Logo-Bild (49 % der dunklen Pixel sind exakt Schwarz) |
| Schriftzug „SGT / Rechner“ | `#F6F3E0` | im Logo-Bild (Modus der hellen Pixel; Median `#F6F3DF`) |

Der Splash-Screen (`android/app/src/main/res/drawable*/splash.png`) wird aus
demselben Logo erzeugt und hat eine Fläche von `#5C673C` – ebenfalls innerhalb
des Rauschbands. Er grenzt an keine gesetzte Farbe, eine Kante kann dort also
nicht entstehen.

## Marken der App (Oberfläche)

| Rolle | Hell | Dunkel |
|---|---|---|
| Akzent | `#4a5d3a` | `#8ba36b` |
| Akzent hell (Links, Hervorhebung) | `#6d8250` | `#a5bd85` |
| Grund (Seitenhintergrund) | `#f5f6f2` | `#171a14` |
| Grund 2 (Fenster, Aufklapper) | `#ffffff` | `#20241c` |
| Grund 3 | `#eceee6` | `#282d22` |
| Karten / Leisten (`--panel`) | `rgba(255,255,255,.93)` | `rgba(24,28,19,.93)` |
| Karten weich (`--panel-soft`) | `rgba(255,255,255,.74)` | `rgba(18,22,14,.60)` |
| Schrift | `#20241c` | `#e8ecdf` |
| Schrift gedämpft | `#5b6152` | `#a2a893` |
| Linien | `#d9dccf` | `#3a4032` |

Ampelfarben: Grün `#558b2f` / `#a5c968`, Gelb `#b58900` / `#d9b544`,
Rot `#c62828` / `#e57373` (jeweils hell / dunkel).

Alles davon steht in `index.html` im `:root`-Block bzw. in den beiden
Dunkel-Blöcken (`html[data-theme="dark"]` und
`@media (prefers-color-scheme: dark)`).

## Gemeinsame Werte der App-Familie

Nur diese vier Werte sind über alle MERCwerk-Apps hinweg gleich – die
**Markenfarbe bleibt je App eigen**. Verbunden sind die Apps über den Aufbau
(große ruhige Fläche, schwarzes Piktogramm, heller Schriftzug davor), nicht
über den Farbton.

| Rolle | Wert | Fundstelle |
|---|---|---|
| Flecktarn-Grundton hell | `#3F4A33` | `--camo-base` im `:root`-Block, `theme_color` in `manifest.webmanifest` |
| Flecktarn-Grundton dunkel | `#232A1C` | `--camo-base` in beiden Dunkel-Blöcken |
| Kartenfläche hell | `rgba(255,255,255,.93)` | `--panel` |
| Kartenfläche dunkel | `rgba(24,28,19,.93)` | `--panel` |

## Formatregeln für Bilddateien

- `icons/icon-192.png`, `icons/icon-512.png`, `icons/icon-maskable-512.png`
  und alle Mipmaps: **32 Bit (RGBA)**. Google Play weist 24-Bit-Icons beim
  Hochladen zurück.
- Produktsymbol eines In-App-Kaufs
  (`docs/store-grafiken/produktsymbol-premium-512.png`): ebenfalls **32 Bit**,
  ohne Text und ohne Branding.
- Feature-Grafik und Screenshots dagegen **ohne Alphakanal** (24 Bit oder
  JPEG) – dort verlangt Play das Gegenteil.

## Wo dasselbe Logo auftauchen muss

Wird das Logo erneuert, sind **alle** diese Stellen zu erneuern (geprüft am
14.08.2026, alle identisch):

- `icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png`
  (sowie die von `npm run cap:sync` erzeugten Kopien unter `www/icons/` und
  `android/app/src/main/assets/public/icons/`)
- `android/app/src/main/res/mipmap-*/ic_launcher.png`,
  `ic_launcher_round.png`, `ic_launcher_foreground.png`
- Favicon und Kopfzeilen-Logo als Data-URI in `index.html`
- Splash-Screens unter `android/app/src/main/res/drawable*/splash.png`
- die Kopie auf der Website: `https://mercwerk.de/assets/apps/sgt.png`
  (byteidentisch mit `icons/icon-192.png`)
- `docs/store-grafiken/feature-grafik-1024x500.png` und Screenshot 6
