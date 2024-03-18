// Import des classes

import { Pokemon } from "./Pokemon.js";

import { Types } from "./Types.js";

import { Attack } from "./Attack.js";
import { pokemon } from "../JSON/pokemon.js";

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
       // On récupère le pokemon
       let pokemon  = lesPokemons[parseInt(key)];
       // On récupère le(s) types(s) du pokemon
       let typeOfPokemon = pokemon.getTypes();
       // On parcourt ses types
       typeOfPokemon.forEach((elementType)=>{
            // Si le type demandé est égale à un des types du Pokemon
            if(elementType.m_type==typeName){
                // On l'ajoute à la liste des résultats
                resultPokemonByType.push(lesPokemons[parseInt(key)])

            }
       })

    });
    // On retourne la liste des pokemons
    return resultPokemonByType;

}
// Test de la question 1 des Tests
// console.log(getPokemonsByType("Poison"))

// 2) Donner la liste des pokemons par attaque

function getPokemonsByAttacks(attackName){
    // Déclaration de la liste des résultat des pokemons par attaque
    let resultPokemonByAttacks = [];
    // On parcout les pokemons
    Object.keys(lesPokemons).forEach(function(key){
        // On récupère le pokemon
        let pokemon = lesPokemons[parseInt(key)];
        // On récupère les attaques
        let attackOfPokemon = pokemon.getAttacks();
        Object.values(attackOfPokemon).forEach(function(elementAttack){
            
            Object.values(elementAttack).forEach((function(elementOneAttack){
                if(elementOneAttack.m_name == attackName ){
                    resultPokemonByAttacks.push(pokemon);
                }

            }))

        })

    })

    return resultPokemonByAttacks;
    

}
// Test de la question 2
//console.log(getPokemonsByAttacks("Tackle"))

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

// 6) Retourner la liste des pokemons pour lesquels l'attaque choisie est la plus efficace

function getWeakestEnemies(attackName){
    let typeName;
    //Liste des Pokemons pour lesquels l'attaque chosie est la plus efficace
    let resultatWeakestEnemies = [];
    // On parcout les pokemons
    Object.keys(lesPokemons).forEach(function(key){
    // On récupère le pokemon
    let pokemon = lesPokemons[parseInt(key)];
    // On récupère les attaques du pokemons
    let attackOfPokemon = pokemon.getAttacks();
    Object.values(attackOfPokemon).forEach(function(elementAttack){
        // On parcout une attaque en particulier
        Object.values(elementAttack).forEach((function(elementOneAttack){
            
            if(elementOneAttack.m_name == attackName ){

                 typeName = elementOneAttack.m_type
                 // Si on trouve l'attaque une première fois on stoppe la recherche avec return 
                 return 
                }

            }))

        })

    }) 
    // Si un type à été trouvé pour l'attaque en argument
    if(typeName){
       
        let lesEfficacites;

        let lesTypes = Types.all_types;
        //On cherche à obtenir le tableau qui contient les efficacités par rapport au typeName
        Object.values(lesTypes).forEach((function(elementType){
            
            if(typeName == elementType.m_type){

                 lesEfficacites = elementType;
                 
            }
        }))
        
        Object.entries(lesEfficacites.m_type_effectiveness).forEach(function(element){
            //console.log(element);

        })
        // Maintenant on parcout les pokemons pour connaitre ceux où cette attaque est la plus efficace
        if(lesEfficacites){
            // On déclare la variable qui compare l'efficacité
            let maxEfficacite = -1;
            Object.keys(lesPokemons).forEach(function(key){
                let lePokemon = lesPokemons[parseInt(key)];
                let typeOfPokemon = lePokemon.getTypes();
                let sommeEfficace=1;
                // Pour chaque pokemon on va tester les efficacités de l'attaque sur lui (en testant les types du pokemons)
                Object.values(typeOfPokemon).forEach(function(elementTypes){
                   
                    // On parcout les efficacités de l'attaque sur le(s) type(s) du pokemon
                    Object.entries(lesEfficacites.m_type_effectiveness).forEach(function(elementEfficace){

                        if(elementTypes.m_type==elementEfficace[0]){
                            // On calculte le multiplicateur de l'attaque
                            sommeEfficace = sommeEfficace * elementEfficace[1];

                        }
                    })
                })
                // Si le multiplicateur est le même que le maximum on ajoute le pokemon
                if(sommeEfficace==maxEfficacite){
                    resultatWeakestEnemies.push(lePokemon);
                }
                // Si on a trouve que l'attaque était plus efficace sur un pokemon
                // On vide le tableau des anciens pokemons et on ajoute ce nouveau pokemon parcouru
                else if(sommeEfficace>maxEfficacite){
                    maxEfficacite = sommeEfficace;
                    resultatWeakestEnemies = [];
                    resultatWeakestEnemies.push(pokemon)
                }
                
                console.log(maxEfficacite)
                
               
            })


        }
        else{
            console.log("Le type n'existe pas");
        }
        
    }
    else{
        console.log("l'attaque n'existe pas");
    }
    // Retoune le résultat
    return resultatWeakestEnemies;
}

// Test de la question 6 pour l'attaque Acide de type Poison
//console.log(getWeakestEnemies("Blizzard"))


// 7) Retourne la liste des types d'attaques les plus efficaces contre un Pokemon donné


function getBestAttackTypesForEnemy(name){
    // Résultat des types d'attaques efficace sur le pokemon
    let resultatAttackTypes = [];
    let pokemon;
    // On cherche à retrouver le type du Pokemon par rapport à son nom
    Object.entries(lesPokemons).forEach(function(elementPokemon){
        
        
        if(elementPokemon[1].m_nom == name){
            pokemon = elementPokemon[1];
            return;
        }
    })
    let typeOfPokemon = pokemon.getTypes();
    
    let maxEfficacite = -1;
    let somme;
    let lesTypes = Types.all_types;
    
    
        Object.entries(lesTypes).forEach(function(elementSecondType){
            somme = 1;
            Object.values(typeOfPokemon).forEach(function(elementType){
               //console.log(elementSecondType[1].m_type_effectiveness)
                somme =  somme * elementSecondType[1].m_type_effectiveness[elementType.m_type];
            })
            console.log(somme)
            if(somme==maxEfficacite){
                resultatAttackTypes.push(elementSecondType[1].m_type);
            }
            else if(somme>maxEfficacite){
                maxEfficacite = somme;
                resultatAttackTypes = [];
                resultatAttackTypes.push(elementSecondType[1].m_type);
            }
            
            
        })

    return resultatAttackTypes
        

        
        

        
    
    

}
// Test de la question 7 avec le pokemon Bruyvern de type vol et dragon
// console.log(getBestAttackTypesForEnemy("Noivern"));








