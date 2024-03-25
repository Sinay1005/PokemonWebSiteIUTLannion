// Import des classes
import { Pokemon } from "../data/class_pokemon.js";

import { Types } from "../data/class_type.js";

 // Import des pokemons
Pokemon.import_pokemon();

 // On récupère les pokemons
const lesPokemons = Pokemon.all_pokemons;


/**
 * 1) Fonction qui retourne la liste des pokemons avec un certain type
 * @param {string} typeName 
 * @returns {Array}
 */
function getPokemonsByType(typeName){
    //Filtrer la liste pour les Pokémon qui respectent la condition
    let pokemonTypeListe = Object.values(lesPokemons).filter(item => item.getTypes().some(types => types.m_type === typeName));
    if(pokemonTypeListe.length==0) return null
    else{
    console.table(pokemonTypeListe)
    return pokemonTypeListe;
    }
}


/**
 * 2) Fonction qui Donne la liste des pokemons qui possède l'attaque passé en paramètre
 * @param {string} attackName 
 * @returns {Array}
 */
function getPokemonsByAttacks(attackName){
    //.flat important pour concaténer charged_moves et fast_moves return par getAttacks
    //.some renvoit true si au moins un élément satisfait la condition donc si filter(true) ==> ajouter à la liste
    let pokemonAttaqueList = Object.values(lesPokemons).filter(pokemon => pokemon.getAttacks().flat().some(attack => attack.m_name == attackName));
    if(pokemonAttaqueList.length==0) null
    else{
        console.table(pokemonAttaqueList)
        return pokemonAttaqueList;
    }
}


/**
 * 3) Fonction qui retourne la liste des attaques qui ont le typeName
 * @param {string} typeName 
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
            
            Object.values(elementAttack).forEach(function(element){
                if(element.m_type==typeName && resultatAttackByType.indexOf(element)==-1){
                    // Si vraie on ajoute à la liste des résultats
                    resultatAttackByType.push(element)
                }
            })
        })

   })
   if(resultatAttackByType.length==0){
        return null;
   }
   else{
   console.table(resultatAttackByType)
   // Retourne les attaques avec le type cherché
   return resultatAttackByType;
   }
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
    console.table(resultatSortNamePokemon);
    return resultatSortNamePokemon;
    
}
// Test de la question 4
//console.log(sortPokemonByNames())

// 5) Donner la liste des Pokemons triés dans l'ordre décroissant d'endurance

function sortPokemonByStamina(){
    // Liste des Pokemons triés par Stamina dans l'ordre décroissant
    let resultatSortStaminaPokemon = Object.values(lesPokemons).sort(function(p1,p2){
        // Si la stamina du pokemon 1 est plus grande que le pokemon 2 on le place avant
        return p1.m_base_stamina - p2.m_base_stamina;
        
    })
    console.table(resultatSortStaminaPokemon)
    // Retourne la liste des Pokemons triés par stamina dans l'ordre décroissant
    return resultatSortStaminaPokemon;

}
// Test de la question5
//console.log(sortPokemonByStamina());

// 6) Retourner la liste des pokemons pour lesquels l'attaque choisie est la plus efficace

function getWeakestEnemies(attackName){
    console.log(attackName)
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
        
        
        // Maintenant on parcout les pokemons pour connaitre ceux où cette attaque est la plus efficace
        if(lesEfficacites){
            // On déclare la variable qui compare l'efficacité
            let maxEfficacite = -1;
            Object.keys(lesPokemons).forEach(function(key){
                let pokemon = lesPokemons[parseInt(key)];
                let typeOfPokemon = pokemon.getTypes();
                let sommeEfficace=1;
                // Pour chaque pokemon on va tester les efficacités de l'attaque sur lui (en testant les types du pokemons)
                Object.values(typeOfPokemon).forEach(function(elementTypes){
                   
                    // On parcout les efficacités de l'attaque sur le(s) type(s) du pokemon
                    Object.entries(lesEfficacites.m_type_effectiveness).forEach(function(elementEfficace){
                       // console.log(elementTypes.m_type)
                        if(elementTypes.m_type==elementEfficace[0]){
                            // On calculte le multiplicateur de l'attaque
                            sommeEfficace = sommeEfficace * elementEfficace[1];

                        }
                    })
                })
                // Si le multiplicateur est le même que le maximum on ajoute le pokemon
                if(sommeEfficace==maxEfficacite){
                    resultatWeakestEnemies.push(pokemon);
                }
                // Si on a trouve que l'attaque était plus efficace sur un pokemon
                // On vide le tableau des anciens pokemons et on ajoute ce nouveau pokemon parcouru
                else if(sommeEfficace>maxEfficacite){
                    maxEfficacite = sommeEfficace;
                    resultatWeakestEnemies = [];
                    resultatWeakestEnemies.push(pokemon)
                }
                
                
               
            })


        }
        else{
            console.log("Le type n'existe pas");
            return null;
        }
        
    }
    else{
        console.log("l'attaque n'existe pas");
        return null;
    }
    // Retoune le résultat
    console.table(resultatWeakestEnemies)
    return resultatWeakestEnemies;
}

// Test de la question 6 pour l'attaque Acide de type Poison


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
    // Si le pokemon saisie n'existe pas on stoppe la suite
    if(pokemon==null){
        return null;
    }
    else{
    // Type(s) du pokemon, cherché par son nom
    let typeOfPokemon = pokemon.getTypes();
    // Variabe qui calcule l'efficacité et le max pour savoir quel type d'attaque
    // est le plus efficace
    let maxEfficacite = -1;
    let somme;
    let lesTypes = Types.all_types;
    
        // On parcout les types et leurs efficacictés
        Object.entries(lesTypes).forEach(function(elementSecondType){
            somme = 1;
            // On parcout à chaque efficacité les types du pokemon pour comparer les efficacités
            Object.values(typeOfPokemon).forEach(function(elementType){
               //console.log(elementSecondType[1].m_type_effectiveness)
                somme =  somme * elementSecondType[1].m_type_effectiveness[elementType.m_type];
            })
            // Si le type est aussi efficace que le max on l'ajoute aux types les plus efficaces
            if(somme==maxEfficacite){
                resultatAttackTypes.push(elementSecondType[1]);
            }
            // Si on trouve un type plus efficace que les autres on supprime les autres
            // et on garde le nouveau qui est encore plus efficace
            else if(somme>maxEfficacite){
                maxEfficacite = somme;
                resultatAttackTypes = [];
                resultatAttackTypes.push(elementSecondType[1]);
            }
            
            
        })
        // Retourne la liste des types
    console.table(resultatAttackTypes);
    return resultatAttackTypes
    }

}
// Test de la question 7 avec le pokemon Bruyvern de type vol et dragon
//console.table(getBestAttackTypesForEnemy("Noivern"));



// Evenements balisa a test


// On attend que tous les elements de la page soit chargés
document.addEventListener('DOMContentLoaded',function(){
    // Liste des tests
    const lesTest = [
    {id : "test1",func:getPokemonsByType,result:null,param:true},
    {id :"test2",func:getPokemonsByAttacks,result:null,param:true},
    {id:"test3",func:getAttacksByType,result:null,param:true},
    {id:"test4",func:sortPokemonByNames,result:sortPokemonByNames(),param:false},
    {id:"test5",func:sortPokemonByStamina,result:sortPokemonByStamina(),param:false},
    {id:"test6",func:getWeakestEnemies,result:null,param:true},
    {id:"test7",func:getBestAttackTypesForEnemy,result:null,param:true}
]
    // Pour chaque bouton de test on applique la fonction correspondante
    lesTest.forEach(test=>{
        const  elem = document.getElementById(test.id);
        
        elem.addEventListener('click',function(){
            // Ici on s'occupe de rendre propre la page
            // à chaque click sur un test pour faire apparaître
            // les donnés adéquates (erreur ou tableau)
            let erreur = document.getElementById("erreur");
            erreur.style.display='none'
            let table = document.getElementById("table");
            let enTete = document.getElementById("entete");
            let tbdoy = document.getElementById("tbody");
            enTete.innerHTML='';
            tbdoy.innerHTML='';
            // On récupère la saisie
            let saisie = document.getElementById("parametre")
            if(test.param==false){

                //test.func.apply(null)
                
                afficheTableau(table,test.result);

                
                
                
            }
            else{
               // test.func.apply(null,test.param)
                test.result = test.func(saisie.value);
                console.log(saisie.value)
                // Si le résultat de la fonction est vide (Saisie d'une donnée non existante)
                // On affiche un message d'erreur
                if(test.result==null){
                    
                    erreur.style.display = "flex"
                    let texteErreur = document.getElementById("text_erreur");
                    texteErreur.innerText = "L'élément "+saisie.value+" en paramètre de test est introuvable dans les donnés Pokemon";

                }
                else{
                    
                    afficheTableau(table,test.result)

                }

            }
        })     
    })
    
})

/**
 * Fonction qui affiche un tableau de données selon le test selectionné
 * 
 * @param {Object} tableau 
 * @param {Array} data 
 */
function afficheTableau(tableau,data){
    let row = document.createElement("tr");
    let enTete = document.getElementById("entete");
    let tbdoy = document.getElementById("tbody");
    enTete.innerHTML='';
    tbdoy.innerHTML='';
    tableau.style.visibility = "visible"
    let headerCreated = false;
    // l'en tête du tableau qui apparait
    Object.values(data).forEach(function(element){
        if(!headerCreated)
        Object.keys(element).forEach(function(elem){
            let th = document.createElement("th");
            th.textContent = elem;
            enTete.appendChild(th);
            
            
            
        })
        headerCreated=true
        
    })
    Object.values(data).forEach(function(elem){
        let ligne = document.createElement("tr");
        Object.entries(elem).forEach(function(element){
            let td = document.createElement("td");
            if(Array.isArray(element[1]) || element[1] instanceof Object){
                td.textContent = JSON.stringify(element[1])
            
            } 
            else {
                td.textContent = element[1];
            }
            ligne.appendChild(td);
        })
        tbdoy.appendChild(ligne);
    })
}





