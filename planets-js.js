let currentPageUrl = "https://swapi.dev/api/planets/";

window.onload = async () => {
    try {
        await loadPlanets(currentPageUrl);
     } catch (error) {
         console.log(error);
         alert('Erro ao carregar cards');
     };

     const nextButton = document.getElementById("next-button")
     const backButton = document.getElementById("back-button")

     nextButton.addEventListener('click', loadNextPage)
     backButton.addEventListener('click', loadPreviousPage)

}

async function loadPlanets(url) {
    const cardsContent = document.getElementById("cards-content");
    cardsContent.innerHTML = "";

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((planet) => {
            const card = document.createElement("div");
            const planetId = planet.url.match(/\d+/)[0];
            card.style.backgroundImage = `url(https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg)`;
            card.className = "planet-cards";

            const planetNameBG = document.createElement("div");
            planetNameBG.className = "character-name-bg";

            const planetName = document.createElement("span");
            planetName.className = "character-name";
            planetName.innerText = planet.name;

            planetNameBG.appendChild(planetName);
            card.appendChild(planetNameBG);
            cardsContent.appendChild(card);

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = '';

                const planetImage = document.createElement("div")
                planetImage.style.backgroundImage = 
                `url(https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg)`
                planetImage.className = "character-image"

                const planetName = document.createElement("span")
                planetName.className = "details"
                planetName.innerText = `Nome: ${convertName(planet.name)}`

                const planetDiameter = document.createElement("span")
                planetDiameter.className = "details"
                planetDiameter.innerText = `Diametro: ${planet.diameter} km`

                const planetClimate = document.createElement("span")
                planetClimate.className = "details"
                planetClimate.innerText = `Clima: ${convertClimate(planet.climate)}`

                const planetGravity = document.createElement("span")
                planetGravity.className = "details"
                planetGravity.innerText = `Gravidade: ${convertGravity(planet.gravity)}`

                const planetPopulation = document.createElement("span")
                planetPopulation.className = "details"
                planetPopulation.innerText = `População: ${convertPopulation(planet.population)}`
                
                modalContent.appendChild(planetImage);
                modalContent.appendChild(planetName);
                modalContent.appendChild(planetDiameter);
                modalContent.appendChild(planetClimate);
                modalContent.appendChild(planetGravity);
                modalContent.appendChild(planetPopulation)

            }
        });

        const nextButton = document.getElementById("next-button");
        const backButton = document.getElementById("back-button");

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous ? "visible" : "hidden";
        nextButton.style.visibility = responseJson.next ? "visible" : "hidden";

        currentPageUrl = url;
    } catch (error) {
        console.log(error);
        alert("Erro ao carregar página");
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try{
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadPlanets(responseJson.next)

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a próxima página');
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try{
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadPlanets(responseJson.previous)

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a página anterior');
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility ="hidden"
}

function toggleMenu() {
    const menuContent = document.getElementById("menu-content");
    if(menuContent.style.left === "-250px"){
        menuContent.style.visibility = "visible";
        menuContent.style.left = "0px";
    } else {
        menuContent.style.left = "-250px";
    }
}

function closeMenu() {
    const menuContent = document.getElementById("menu-content");
    if(menuContent.style.left === "0px"){
        menuContent.style.left = "-250px";
        menuContent.style.visibility = "hidden";
    }
}

function convertClimate(climate) {
    const climates = {
        arid: 'arido',
        tropical: 'Tropical',
        temperate: 'Temperado',
        frozen: 'Congelado',
        murky: 'Turvo',
        windy: 'Ventoso',
        'Artificial Temperate': 'Temperado Artificial',
        frigid: 'Frigido',
        hot: 'Quente',
        humid: 'Umido',
        moist: 'Molhado',
        polluted: 'Poluido',
        unknown: 'Desconhecido',
        superheated: 'Superaquecido',
        subarctic: 'Subartico',
        rocky: 'Rochoso',
        'temperate, tropical': 'temperado, tropical',
        'temperate, arid': 'temperado, arido',
        'temperate, arid, windy': 'temperado, arido, ventoso',
        'artificial temperate': 'temperado artificial',
        'hot, humid': 'quente, umido',
        'temperate, moist': 'temperado, molhado',
        'arid, temperate, tropical': 'arido, temperado, tropical',
        'temperate, arid, subartic': 'temperado, arido, subartico',
        'temperate, artic': 'temperado, artico',
        'tropical, temperate': 'tropical, temperado',
        'arid, rocky, windy': 'arido, rochoso, ventoso'
    }
    return climates[climate.toLowerCase()] || climate;

}

function convertPopulation (population) {
    if (population === "unknown") {
      return "desconhecido";
    }
    
    return `${population}`;
}

function convertName (name) {
    if (name === "unknown") {
      return "desconhecido";
    }
    
    return `${name}`;
}

function convertGravity (gravity) {
    if (gravity === "unknown") {
      return "desconhecido";
    }
    
    return `${gravity}`;
  }
