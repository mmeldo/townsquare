const CardAction = require('./cardaction.js');
const HandlerGameActionWrapper = require('./GameActions/HandlerGameActionWrapper.js');
const Spell = require('./spell.js');

class SpellAction extends CardAction {
    constructor(game, card, properties) {
        super(game, card, properties);
        this.spell = new Spell(this, properties);
        if(!this.gameAction) {
            this.gameAction = new HandlerGameActionWrapper({ handler: () => true });
        }
    }

    meetsRequirements(context) {
        if(super.meetsRequirements(context)) {
            return this.spell.canBeCasted(context.player);
        }
        return false;
    }

    executeHandler(context) {
        this.spell.executeSpell(context, () => super.executeHandler(context));
    }
}

module.exports = SpellAction;
