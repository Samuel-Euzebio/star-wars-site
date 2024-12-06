let currentPageUrl = 'https://swapi.dev/api/people/'

window.onload = async () => {
    try {
       await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    };

    const nextButton = document.getElementById("next-button")
    const backButton = document.getElementById("back-button")

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
}

async function loadCharacters(url) {
    const cardsContent = document.getElementById('cards-content');
    cardsContent.innerHTML = ''; //Limpar resultados anteriores

    try{

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div")
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}`
            
            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility ="visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = '';


                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = "character-image"

                const characterName = document.createElement("span")
                characterName.className = "details"
                characterName.innerText = `Nome: ${character.name}`

                const characterHeight = document.createElement("span")
                characterHeight.className = "details"
                characterHeight.innerText = `Altura: ${convertHeight(character.height)}m`

                const characterMass = document.createElement("span")
                characterMass.className = "details"
                characterMass.innerText = `Peso: ${convertMass(character.mass)}`

                const characterEyeColor = document.createElement("span")
                characterEyeColor.className = "details"
                characterEyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`

                const characterBirthYear = document.createElement("span")
                characterBirthYear.className = "details"
                characterBirthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`

                const characterGender = document.createElement("span")
                characterGender.className = "details"
                characterGender.innerText = `Gênero: ${convertGender(character.gender)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(characterName)
                modalContent.appendChild(characterHeight)
                modalContent.appendChild(characterMass)
                modalContent.appendChild(characterEyeColor)
                modalContent.appendChild(characterBirthYear)
                modalContent.appendChild(characterGender)
                   
            }

            cardsContent.appendChild(card)
        });

        const nextButton = document.getElementById("next-button")
        const backButton = document.getElementById("back-button")

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.next;

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"
        nextButton.style.visibility = responseJson.next? "visible" : "hidden"

        currentPageUrl = url

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar os personagens');
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try{
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

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

        await loadCharacters(responseJson.previous)

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a página anterior');
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility ="hidden"
}

function convertEyeColor(eyeColor) {
    const cores = {
        blue: "azul",
        brown: "marrom",
        grenn: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        'blue-gray': "cinza azulado",
        'blue-gray': "cinza azulado", 
        'red, blue': "vermelho, azul", 
        gold: "dourado", 
        'green, yellow':"verde, amarelo", 
        white: "branco",
        unknown: "desconhecida"
    };

    return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height) {
    if (height === "unknown") {
      return "desconhecida";
    }
    
    return (height / 100).toFixed(2);
  }
  
function convertMass(mass) {
    if (mass === "unknown") {
      return "desconhecido";
    }
    
    return `${mass} kg`;
  }
  
function convertBirthYear(birthYear) {
    if (birthYear === "unknown") {
      return "desconhecido";
    }
    
    return birthYear;
  }

function convertGender(gender) {
    const characterGender ={ 
    unknown: "desconhecido",
    male: "masculino",
    female: "feminino"
    }

    return characterGender[gender.toLowerCase()] || gender;
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
