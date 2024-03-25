import { Pokemon } from '../data/class_pokemon.js'; 
import { handleScreenSizeChange } from "../css/style.js"

Pokemon.import_pokemon();
let pokemonList = Pokemon.all_pokemons;

const pokemonArray = Object.values(pokemonList);

pokemonArray.forEach(item => {
    ajoutPokemonInTable(item);
});

// Get Formated types to insert in the table
function getFormatedTypes(type){
    let ul = document.createElement("ul")
    type.forEach(item => {
        let li = document.createElement("li")
        li.textContent = item.m_type;
        ul.appendChild(li)
    });
    return ul
}

// Get the foramted Id from id to take the img in the folder
function formatId(id) {
    const paddedId = String(id).padStart(3, '0'); 
    return paddedId;
}

// Make the list of statistique
function generateCombinedStatsColumn(stamina, attack, defense) {
    var statColumn = document.createElement("td");
    statColumn.setAttribute("label", "STATS");
    var statsList = document.createElement("ul");
    var staminaItem = document.createElement("li");
    staminaItem.innerHTML = `<span class="chip blue">${stamina}</span>`;
    statsList.appendChild(staminaItem);
    var attackItem = document.createElement("li");
    attackItem.innerHTML = `<span class="chip red">${attack}</span>`;
    statsList.appendChild(attackItem);
    var defenseItem = document.createElement("li");
    defenseItem.innerHTML = `<span class="chip green">${defense}</span>`;
    statsList.appendChild(defenseItem);
    statColumn.appendChild(statsList);
    return statColumn;
}
// Get all item to post it in the table
function ajoutPokemonInTable(item) {
    var ligne = document.createElement("tr");
    let info = {
        m_id: "ID",
        m_nom: "NOM",
        m_generation: "GEN",
        m_type: "TYPES",
        m_base_stamina: "ENDURANCE",
        m_base_attack: "PTSA",
        m_base_defense: "PTSD",
    };

    Object.keys(info).forEach(key => {
        var tableData = document.createElement("td");
        tableData.setAttribute("label", info[key]);
        if (key == "m_type") {
            let formattedTypes = getFormatedTypes(item[key]);
            tableData.appendChild(formattedTypes);
        } else {
            tableData.textContent = item[key];
        }
        ligne.appendChild(tableData);
    });
    
    var combinStat = generateCombinedStatsColumn(item.m_base_stamina, item.m_base_attack, item.m_base_defense);
    ligne.appendChild(combinStat);

    let img = document.createElement("img");
    img.setAttribute("src", `../webp/thumbnails/${formatId(item.m_id)}.webp`);
    ligne.appendChild(img)
    const tbody = document.querySelector('table > tbody');
    tbody.appendChild(ligne)
}

// Définir les variables pour la pagination
const itemsPerPage = 25;
let currentPage = 0;

function updatePaginationButtons() {
    const prevButton = document.getElementById('prec');
    const nextButton = document.getElementById('suiv');
    const maxPage = Math.ceil(pokemonArray.length / itemsPerPage);

    // Désactiver le bouton "Précédent" si nous sommes sur la première page
    if (currentPage === 0) {
        prevButton.disabled = true;
        prevButton.classList.add('disabled');
    } else {
        prevButton.disabled = false;
        prevButton.classList.remove('disabled');
    }

    // Désactiver le bouton "Suivant" si nous sommes sur la dernière page
    if (currentPage === maxPage - 1) {
        nextButton.disabled = true;
        nextButton.classList.add('disabled'); 
    } else {
        nextButton.disabled = false;
        nextButton.classList.remove('disabled');
    }
}

function displayPokemonPerPage(pageIndex) {
    const tbody = document.querySelector('table > tbody');
    tbody.innerHTML = ''; 
    const startIndex = pageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pokemonSubset = pokemonArray.slice(startIndex, endIndex);

    pokemonSubset.forEach(item => {
        ajoutPokemonInTable(item);
    });
    const mediaQuery = window.matchMedia('(max-width: 800px)');
    handleScreenSizeChange(mediaQuery)
    updatePaginationButtons()
}

document.getElementById('prec').addEventListener('click', function() {
    if (currentPage > 0) {
        currentPage--;
        displayPokemonPerPage(currentPage);
    }
});

document.getElementById('suiv').addEventListener('click', function() {
    const maxPage = Math.ceil(pokemonArray.length / itemsPerPage);
    if (currentPage < maxPage - 1) {
        currentPage++;
        displayPokemonPerPage(currentPage);
    }
});

displayPokemonPerPage(currentPage);
