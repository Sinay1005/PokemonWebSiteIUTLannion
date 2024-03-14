// Import des classes

import { Pokemon } from "./Pokemon.js";

import { Types } from "./Types.js";

import { Attack } from "./Attack.js";

 // Import des pokemons
Pokemon.import_pokemon();
 // On récupère les pokemons
const lesPokemons = Pokemon.all_pokemons;


// 1) Donner la liste des pokemons par type

/**
 * Fonction qui retourne la liste des pokemons avec un certain type
 * 
 * @param {string} typeName 
 * 
 * @returns {Array}
 */
function getPokemonsByType(typeName){
    // Déclaration de la liste des résultats
    let resultPokemonByType=[];
    // On parcourt les Pokemons avec le type typeName
    Object.keys(lesPokemons).forEach(function(key){
       // On récupère le(s) type(s) du pokemon
       let typeOfPokemon = Pokemon.getTypesIntoFile(parseInt(key));
       // On parcourt ses types
       typeOfPokemon.forEach((elementType)=>{
            // Si le type demandé est égale à un des types du Pokemon
            if(elementType==typeName){
                // On l'ajoute à la liste des résultats
                resultPokemonByType.push(lesPokemons[parseInt(key)])

            }
       })

    });
    // On retourne la liste des pokemons
    return resultPokemonByType;

}
// Test de la question 1 des Tests
// console.log(getPokemonsByType("Poison"));


// 3) Lister les attaques par un type


/**
 * Fonction qui retourne la liste des attaques qui ont le typeName
 * 
 * @param {string} typeName 
 * 
 * @returns {Array}
 */
function  getAttacksByType(typeName){
   // Déclaration du résultat des attaques par type
   let resultatAttackByType = [];
   // On parcout les attaques des Pokemons 
   Object.keys(lesPokemons).forEach(function(key){
        // On récupère les attaques du pokemons
        let pokemon = lesPokemons[parseInt(key)];
        // On obtient les attaques du pokemonss
        let attackOfPokemon = pokemon.getAttacks();
        // On parcour les attaques
        
        attackOfPokemon.forEach((elementAttack)=>{
            // On vérifie si l'attaque à le type qu'on cherche et qu'elle n'est pas présente dans les resultats
            if(elementAttack.m_type==typeName && resultatAttackByType.indexOf(elementAttack)==-1){
                // Si vraie on ajoute à la liste des résultats
                resultatAttackByType.push(elementAttack)
            }
        })

   })
   // Retourne les attaques avec le type cherché
   return resultatAttackByType;
}
// Test de la question 3
// console.log(getAttacksByType("Water"))

// 4) Donner la liste des Pokemons triés par nom dans l'ordre alphabétique

/**
 *  Fonction qui trie les Pokemons par nom dans l'ordre alphabétique
 * 
 * @returns { Array }
 * 
 */
function sortPokemonByNames(){
    // Liste des pokemons triés par nom
    let resultatSortNamePokemon = Object.values(lesPokemons).sort(function(p1,p2){
        // si le nom du pokemon1 est plus petit que le pokemon2 on le place avant
        if(p1.m_nom < p2.m_nom){
            return -1;
        }
        // Sinon l'inverse
        if(p1.m_nom> p2.m_nom){
            return 1;
        }
        // Sinon ils ont le même nom
        return 0;

    })
    // Retourne la liste des Pokemons triés par nom
    return resultatSortNamePokemon;
    
}
// Test de la question 4
//console.log(sortPokemonByNames())

// 5) Donner la liste des Pokemons triés dans l'ordre décroissant d'endurance

function sortPokemonByStamina(){
    // Liste des Pokemons triés par Stamina dans l'ordre décroissant
    let resultatSortStaminaPokemon = Object.values(lesPokemons).sort(function(p1,p2){
        // Si la stamina du pokemon 1 est plus grande que le pokemon 2 on le place avant
        if(p1.m_base_stamina > p2.m_base_stamina){
            return -1;
        }
        // Sinon l'inverse
        if(p2.m_base_stamina < p2.m_base_stamina){
            return 1;
        }
        // Sinon ils ont la même stamina
        return 0;
    })
    // Retourne la liste des Pokemons triés par stamina dans l'ordre décroissant
    return resultatSortStaminaPokemon;

}
// Test de la question5
//console.log(sortPokemonByStamina());


