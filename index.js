/*let data = ""
let kysymykset = []
let otsikko = ""
let paatelmat = []
let vastaukset = []
let kysymyksetPituus = 0
fetch('./data.json') //CORS-policyn vuoksi ei onnistunut
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData
        kysymykset = jsonData.kysymykset
        otsikko = jsonData.otsikko, paatelmat = jsonData.paatelmat
        vastaukset = Array(jsonData.kysymykset.length).fill(null)
        kysymyksetPituus = jsonData.kysymykset.length
        console.log("juu")
    }
    )
    .catch(error => console.error('Error loading data:', error));*/
const kysymykset = [ //Kysymys, pisteet vastuaksesta
  ["Automaattinen päätöksenteko, jolla on oikeusvaikutuksia tai vastaavia merkittäviä vaikutuksia", 2, "Esimerkiksi henkilökohtaisten ominaisuuksien laajamittainen automaattinen profilointi, jota voitaisiin käyttää syrjintään tai muuten rekisteröidyille haitallisesti."],
  ["Järjestelmällinen valvonta", 2, "Esimerkiksi julkisten ja avointen tilojen kameravalvonta, työntekijöiden tai asiakkaiden järjestelmällinen valvonta."],
  ["Erityiset henkilötiedot, salassa pidettävät tiedot ja muut arkaluontoiset tai luonteeltaan hyvin henkilökohtaiset tiedot", 2, "Erityiset henkilötietoryhmät (etninen tausta, poliittiset mielipiteet, vakaumus, ammattiliiton jäsenyys, terveystiedot, seksuaalinen suuntautuminen, geneettiset ja biometriset tunnisteet), tiedot rikkomuksista, rikosrekisteritiedot. Myös esimerkiksi taloustiedot, sanalliset arviot henkilöiden ominaisuuksista, psykologiset testit, yksityiset päiväkirjat, kotirauhan piiriin liittyvät tiedot."],
  ["Uusien teknisten tai organisatoristen ratkaisujen innovatiivinen käyttö tai soveltaminen", 2, "Uusiin ratkaisuihin voi liittyä riskejä, joita ei havaita helposti. Esimerkiksi uuden järjestelmän tai tekoälyn käyttö tavalla, joka ei ole kyseisellä toimialalla yleistä."],
  ["Arviointi tai pisteytys", 1, "Esimerkiksi käyttäytymis- tai markkinointiprofiilien koostaminen."],
  ["Tietojen laajamittainen käsittely", 1, "Esimerkiksi huomattavan suuri määrä tietoja yksittäisistä rekisteröidyistä, rekisteröityjä on runsaasti, kattava osuus tietyn alueen väestöstä, tietojen käsittely useissa maissa, käsittelyn pitkäkestoisuus."],
  ["Tietokokonaisuuksien sovittaminen yhteen tai yhdistäminen", 1, "Eri yhteyksistä kerättyjen tietojen yhdistely, tai kun tietoja yhdistellään rekisteröityjen kohtuullisia odotuksia laajemmin. "],
  ["Heikossa asemassa olevia rekisteröityjä koskevat tiedot", 1, "Esimerkiksi lapset ja työntekijät, rekisteröityjen riippuvuus rekisterinpitäjästä."],
  ["Käsittely voi estää rekisteröityjä käyttämästä oikeutta tai palvelua tai sopimusta", 1, "Esimerkiksi pankin arvio luottokelpoisuudesta. Huomioi myös tilanteet, joissa tietoja saadaan muualta kuin rekisteröidyiltä itseltään ja tietojen käyttö on rekisteröidyille ennakoimatonta läpinäkyvyyden puutteen vuoksi, tai kun rekisteröidyillä on vaikeuksia käyttää tietosuoja-asetuksen mukaisia oikeuksiaan."],
  ["Sijaintitiedot", 2, "Esimerkiksi yksittäisiin ihmisiin liitettävät sijaintitiedot, jotka voivat paljaa arkaluontoisia tai luonteeltaan hyvin henkilökohtaisia tietoja kuten käyttäytymisestä vapaa-ajalla."],
  ["Poikkeaminen rekisteröidyn informoinnista (GDPR:n artiklan 14.5 perusteella)", 2, "Esimerkiksi kun rekisteröityjä ei informoida henkilötietojen käytöstä yleisen edun mukaisia arkistointitarkoituksia, tieteellisiä ja historiallisia tutkimustarkoituksia tai tilastollisia tarkoituksia varten."],
  ["Whistleblowing-/ilmiantojärjestelmä", 2, "Tietosuojavaltuutetun päätöksen mukaan whistleblowing-/ilmiantojärjestelmästä on aina tehtävä tietosuojaa koskeva vaikutustenarviointi."]
]
const paatelmat = [ //Paatelmat tulee asetella pienimmästä suurimpaan. Luku kertoo mikä on suurin pistemäärä, jolla päätelmän saa
  ["Vaikutustenarviointia ei todennäköisesti tarvitse tehdä.", 1],
  ["Tietosuojaa koskeva vaikutustenarviointi on syytä tehdä.", 100],
]
const otsikko = "Liittyykö henkilötietojen käsittelyyn seuraavia piirteitä?"
let vastaukset = Array(kysymykset.length).fill(null)
const kysymyksetPituus = kysymykset.length;
let currentKysymys = 0

const otsikkoTeksti = document.getElementById("otsikko")
const seuraavaButton = document.getElementById("seuraavabutton")
const edellinenButton = document.getElementById("edellinenbutton")
const kysymysTeksti = document.getElementById("kysymysteksti")
const extraTeksti = document.getElementById("extrateksti")
const oikeinInput = document.getElementById("oikeinInput")
const vaarinInput = document.getElementById("vaarinInput")
const pisteTeksti = document.getElementById("pisteteksti")
const formElement = document.getElementById("form")
const kysymysElement = document.getElementById("kysymys")

const paatelmatPituus = paatelmat.length;
/*if (kysymyksetPituus === 0) {
    //return <div><h1>Kysely Component</h1><p>Ei kysymyksiä saatavilla.</p></div>
}*/
function initialization () {
    otsikkoTeksti.textContent = otsikko
    kysymysTeksti.textContent = `${currentKysymys + 1}. ${kysymykset[currentKysymys][0]}`
    extraTeksti.textContent = `${kysymykset[currentKysymys][2]}`
    oikeinInput.setAttribute("name", currentKysymys)
    oikeinInput.setAttribute("value", kysymykset[currentKysymys][1])
    vaarinInput.setAttribute("name", currentKysymys)
    pisteTeksti.textContent = `${kysymykset[currentKysymys][1]}`
}
initialization()

const handleVastausChange = (event) => {
    const index = parseInt(event.target.name, 10);
    const value = parseInt(event.target.value, 10);
    const newVastaukset = [...vastaukset];
    newVastaukset[index] = value;
    vastaukset = newVastaukset;
    //console.log(newVastaukset);
    if(!vastaukset.includes(null)) {
        document.getElementById("submitbutton").removeAttribute("disabled")
    }
}


const handleSeuraava = (event) => {
    if (currentKysymys === 0) {
        edellinenButton.removeAttribute("disabled")
    }
    currentKysymys = currentKysymys + 1
    if (currentKysymys === kysymyksetPituus - 1) {
        seuraavaButton.setAttribute("disabled", true)
    }
    kysymyksenVaihto()
}

const handleEdellinen = (event) => {
    if (currentKysymys === kysymyksetPituus - 1) {
        seuraavaButton.removeAttribute("disabled")
    }
    currentKysymys = currentKysymys - 1
    if (currentKysymys === 0) {
        edellinenButton.setAttribute("disabled", true)
    }
    kysymyksenVaihto()
}
function kysymyksenVaihto () {
    $(".kysymys").attr("key", currentKysymys);
    kysymysTeksti.textContent = `${currentKysymys + 1}. ${kysymykset[currentKysymys][0]}`
    extraTeksti.textContent = `${kysymykset[currentKysymys][2]}`
    oikeinInput.setAttribute("name", currentKysymys)
    oikeinInput.setAttribute("value", kysymykset[currentKysymys][1])
    vaarinInput.setAttribute("name", currentKysymys)
    oikeinInput.checked = false
    vaarinInput.checked = false
    switch(vastaukset[currentKysymys]) {
        case 0:
            vaarinInput.checked = true
        case null:
            return;
        default:
            oikeinInput.checked = true
    }
    pisteTeksti.textContent = `${kysymykset[currentKysymys][1]}`
    kysymysElement.classList.remove("fade")
    void kysymysElement.offsetWidth;
    kysymysElement.classList.add("fade")
}


const handleSubmit = (event) => {
    event.preventDefault();
    //console.log('Lähetetyt vastaukset:', vastaukset);
    const tulos = vastaukset.reduce((acc, curr) => acc + curr, 0);
    const tulosMax = kysymykset.reduce((acc, curr) => acc + curr[1], 0);
    const tulosTeksti = `Kyselyn tulos: ${tulos} / ${tulosMax}`;
    document.getElementById('tulosteksti').innerText = tulosTeksti;
    if (paatelmatPituus > 0) {
        for (let i = 0; i < paatelmatPituus; i++) {
            if (tulos <= paatelmat[i][1]) {
                document.getElementById("paatelmateksti").innerText = paatelmat[i][0];
                i = paatelmatPituus;
            }
        }
    }
    document.getElementById('tulos').style.display = "flex";
    showAllQuestions()
}
formElement.addEventListener('submit', handleSubmit)

function showAllQuestions() {
    seuraavaButton.setAttribute("disabled", true)
    edellinenButton.setAttribute("disabled", true)
    $(".rivi").remove();
    console.log(vastaukset)
    const kysymyysRivit = kysymykset.map((kysymys, index) => [
        (vastaukset[index] > 0) ?
    `<div class="rivi" key=${index}>
        <div class='kysymys'>
            <p id='kysymysteksti'>${index + 1}. ${kysymys[0]}</p>
            <p id="extrateksti">${kysymys[2]}</p>
        </div>
        <div class='vaihtoehdot2'>
            <label>
                <input class='oikeinInput' type="radio" name=${index} value=${kysymys[1]} checked onchange="handleVastausChange(event)" />
                <span class='checkmark'></span>
            </label>
            <label>
                <input class='vaarinInput' type="radio" name=${index} value=${0} onchange="handleVastausChange(event)" />
                <span class='checkmark'></span>
                <p id='pisteteksti'>${kysymys[1]}</p>
            </label>
        </div>
    </div>` :
    `<div class="rivi" key=${index}>
        <div class='kysymys'>
            <p id='kysymysteksti'>${index + 1}. ${kysymys[0]}</p>
            <p id="extrateksti">${kysymys[2]}</p>
        </div>
        <div class='vaihtoehdot2'>
            <label>
                <input class='oikeinInput' type="radio" name=${index} value=${kysymys[1]} onchange="handleVastausChange(event)" />
                <span class='checkmark'></span>
            </label>
            <label>
                <input class='vaarinInput' type="radio" name=${index} value=${0} checked onchange="handleVastausChange(event)" />
                <span class='checkmark'></span>
                <p id='pisteteksti'>${kysymys[1]}</p>
            </label>
        </div>
    </div>`
])
$("#form").prepend(kysymyysRivit)
}