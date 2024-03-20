import { Pokemon } from '../data/Pokemon.js'; 

Pokemon.import_pokemon();
let pokemonList = Pokemon.all_pokemons;

const pokemonArray = Object.values(pokemonList);

pokemonArray.forEach(item => {
    ajoutPokemonInTable(item);
});

function getFormatedTypes(type){
    let ul = document.createElement("ul")
    type.forEach(item => {
        let li = document.createElement("li")
        li.textContent = item.m_type;
        ul.appendChild(li)
    });
    return ul
}

function ajoutPokemonInTable(item) {
    var ligne = document.createElement("tr");
    let info = {
        m_id: "ID",
        m_nom: "NOM",
        m_generation: "GEN",
        m_type: "TYPES",
        m_base_stamina: "ENDURANCE",
        m_base_attack: "PTSD",
        m_base_defense: "PTSD",
    };

function formatId(id) {
    const paddedId = String(id).padStart(3, '0'); 
    return paddedId;
}

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
    let img = document.createElement("img");
    img.setAttribute("src", `../webp/thumbnails/${formatId(item.m_id)}.webp`);
    ligne.appendChild(img)
    const tbody = document.querySelector('table > tbody');
    tbody.appendChild(ligne)
}
