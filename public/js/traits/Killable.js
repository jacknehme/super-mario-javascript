import { Sides, Trait } from '../Entity.js';

export default class Killable extends Trait {
    constructor() {
        super('killable');
        this.dead = false;
        this.deadTime = 0;
        this.removeAfter = 2;
    }
    kill() {
        this.dead = true;
    }

    revive() {
        this.dead = false;
        this.deadTime = 0;
    }

    update(entity, delatime, level) {
        if (this.dead) {
            this.deadTime += delatime;
            if (this.deadTime > this.removeAfter) {
                level.entities.delete(entity);
            }
        }
    }
}