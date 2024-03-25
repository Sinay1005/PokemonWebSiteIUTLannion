import { type_effectiveness}  from './type_effectiveness.js';

 export class Types {
    static all_types = {};

    constructor(type) {
        if (Types.all_types[type]) {
            return Types.all_types[type];
        }
        
        this.m_type = type;
        // Récupération des types effectiveness
        this.m_type_effectiveness = type_effectiveness[type];
        Types.all_types[type] = this;
        return this;
    }

    toString() {
        return `Type : ${this.m_type}, Type effectiveness : ${JSON.stringify(this.m_type_effectiveness)}`;
    }
}
