const { fast_moves } = require('../JSON/fast_moves');
const { charged_moves } = require('../JSON/charged_moves');

class Attack {

    static all_attacks = {};

    constructor(name, moveTypes) {
        if (Attack.all_attacks[name]) {
            return Attack.all_attacks[name];
        }
        this.m_name = name;
        this.m_type = null;
        this.m_power = null;
        this.m_staminaLossScaler = null;
        this.m_duration = null;
        this.m_energyDelta = null;
        this.m_critical_chance = null;
        this.m_isChargedMoves = (moveTypes === "charged_moves") ? true : false;
        this.completeConstructor(name);
        Attack.all_attacks[name] = this;
        return this;
    }

    toString() {
        let criticalChanceString = (this.m_critical_chance !== null) ? `, Critical Chance: ${this.m_critical_chance}` : '';
        return `${this.m_name} (${this.m_type}) - Power: ${this.m_power}, Stamina Loss Scaler: ${this.m_staminaLossScaler}, Duration: ${this.m_duration}, Energy Delta: ${this.m_energyDelta}${criticalChanceString}`;
    }
    

    completeConstructor(name) {
        let data = this.m_isChargedMoves ? charged_moves : fast_moves;
        let move = data.find(moves => moves.name === name);
        if (move) {
            const { type, power, stamina_loss_scaler, duration, energy_delta, critical_chance } = move;
            this.m_type = type;
            this.m_power = power;
            this.m_staminaLossScaler = stamina_loss_scaler;
            this.m_duration = duration;
            this.m_energyDelta = energy_delta;
            if (critical_chance !== undefined) {
                this.m_critical_chance = critical_chance;
            }
        } else {
            console.log("No moovment find");
        }
    }
}
module.exports = Attack;