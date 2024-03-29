import { pokemon } from './pokemones.js';
import { pokemon_types } from './pokemon_type.js';
import { pokemon_moves }  from './pokemon_moves.js';
import { generation } from './generation.js';
import  {Types } from './class_type.js';
import {Attack} from './class_attack.js'; 

 export class Pokemon{

    static  all_pokemons = {};
    
    constructor(id,name,form,base_defense,base_attack,base_stamina,type, generation, charged_moves, fast_moves){
        if (Pokemon.all_pokemons[id]) {
            return Pokemon.all_pokemons[id];
        }
        this.m_id = id;
        this.m_nom = name;
        this.m_form = form;
        this.m_generation = generation;
        this.m_base_attack = base_attack;
        this.m_base_defense = base_defense;
        this.m_base_stamina = base_stamina;
        this.m_type = type;
        this.m_charged_moves = charged_moves;
        this.m_fast_moves = fast_moves;
        return this;
    }

    toString() {
        return `Pokemon ID: ${this.m_id}, Name: ${this.m_nom}, Form: ${this.m_form}, Generation: ${this.m_generation}, Base Attack: ${this.m_base_attack}, Base Defense: ${this.m_base_defense}, Base Stamina: ${this.m_base_stamina}, Type: ${this.m_type}, Charged_moves: ${this.m_charged_moves}, Fast_moves: ${this.m_fast_moves}`;
    }

    getTypes() {
        return this.m_type.map(item => item);
    }
    
    getAttacks(){
        return [this.m_fast_moves, this.m_charged_moves];
    }

    // Fonction pour récupérer les types dans le fichier json (Param ID)
    static getTypesIntoFile(id) {
        const typeData = pokemon_types.find(typeData => typeData.pokemon_id === id && typeData.form === "Normal");
        return typeData ? typeData.type : null;
    }

    // Fonction pour réucpérer les attacks dans le fichier json (Param ID)
    static getAttacksIntoFile(id) {
        const attackData = pokemon_moves.find(attackData => attackData.pokemon_id === id && attackData.form === "Normal");
        if (attackData) {
            return {
                charged_moves: attackData.charged_moves,
                fast_moves: attackData.fast_moves
            };
        }
        return null;
    }

    // Fonction pour récupérer la génération d'un pokemon (Param ID)
    static getGenerationIntoFile(id) {
        for (const genData of Object.values(generation)) {
            const pokemon = genData.find(pokemon => pokemon.id === id);
            if (pokemon) {
                return pokemon.generation_number;
            }
        }
        return null;
    }
    
    
    // Fonction général qui permet l'importation des pokémons et la création d'Objet Pokemon
    static import_pokemon() {
        pokemon.forEach(pokemonData => {
            if (pokemonData.form === "Normal") {
                // Récupération des données basiques qui sont dans pokemones.json
                const { pokemon_id, pokemon_name, form, base_attack, base_defense, base_stamina } = pokemonData;
                
                // Récupération des types du pokemons
                let pokemon_types = [];
                Pokemon.getTypesIntoFile(pokemon_id).forEach(typeData => {
                    let type = new Types(typeData);
                    pokemon_types.push(type);
                });
    
                // Récupération des attacjs
                let charged_moves_table = [];
                let moves = Pokemon.getAttacksIntoFile(pokemon_id);
                moves.charged_moves.forEach(move => {
                    let newMove = new Attack(move, "charged_moves");
                    charged_moves_table.push(newMove);
                })
                let fest_moves_table = [];
                moves.fast_moves.forEach(move => {
                    let newMove = new Attack(move, "fast_moves");
                    fest_moves_table.push(newMove);
                })

                // Récupération de la génération
                let generation = Pokemon.getGenerationIntoFile(pokemon_id);

                // Création du Pokemon
                const newPokemon = new Pokemon(pokemon_id, pokemon_name, form, base_defense, base_attack, base_stamina, pokemon_types,generation, charged_moves_table, fest_moves_table);
                Pokemon.all_pokemons[pokemon_id] = newPokemon;
            }
        });
    }
}
/*
Pokemon.import_pokemon();

const pikachu = Pokemon.all_pokemons[25];


console.log(pikachu.toString());
console.log("\n"); 

const types = pikachu.getTypes();
console.log("Types:", types.toString());
console.log("\n"); 

const attacks = pikachu.getAttacks();
console.log("Attacks:", attacks.toString());
console.log("\n"); 


console.log(Pokemon.all_pokemons);
*/