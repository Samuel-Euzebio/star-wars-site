let currentPageUrl = "https://swapi.dev/api/starships/";

window.onload = async () => {
    try {
        await loadStarships(currentPageUrl);
     } catch (error) {
         console.log(error);
         alert('Erro ao carregar cards');
     };

     const nextButton = document.getElementById("next-button")
     const backButton = document.getElementById("back-button")

     nextButton.addEventListener('click', loadNextPage)
     backButton.addEventListener('click', loadPreviousPage)

}

async function loadStarships(url) {
    const cardsContent = document.getElementById("cards-content");
    cardsContent.innerHTML = "";

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((starship) => {
            const card = document.createElement("div");
            const starshipId = starship.url.match(/\d+/)[0];
            card.style.backgroundImage = `url(https://starwars-visualguide.com/assets/img/starships/${starshipId}.jpg)`;
            card.className = "planet-cards";

            const starshipNameBG = document.createElement("div");
            starshipNameBG.className = "character-name-bg";

            const starshipName = document.createElement("span");
            starshipName.className = "character-name";
            starshipName.innerText = starship.name;

            starshipNameBG.appendChild(starshipName);
            card.appendChild(starshipNameBG);
            cardsContent.appendChild(card);

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = '';

                const starshipImage = document.createElement("div")
                starshipImage.style.backgroundImage = 
                `url(https://starwars-visualguide.com/assets/img/starships/${starshipId}.jpg)`
                starshipImage.className = "character-image"

                const starshipName = document.createElement("span")
                starshipName.className = "details"
                starshipName.innerText = `Nome: ${starship.name}`

                const planetLength = document.createElement("span")
                planetLength.className = "details"
                planetLength.innerText = `Comprimento: ${starship.length} m`

                const planetStarshipClass = document.createElement("span")
                planetStarshipClass.className = "details"
                planetStarshipClass.innerText = `Classe: ${starship.starship_class}`

                const planetPassengers = document.createElement("span")
                planetPassengers.className = "details"
                planetPassengers.innerText = `Passageiros: ${starship.passengers}`
                
                modalContent.appendChild(starshipImage);
                modalContent.appendChild(starshipName);
                modalContent.appendChild(planetLength);
                modalContent.appendChild(planetStarshipClass);
                modalContent.appendChild(planetPassengers);

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

        await loadStarships(responseJson.next)

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

        await loadStarships(responseJson.previous)

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