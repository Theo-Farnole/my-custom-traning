import { Utilities } from "../utilities/utilities";
import { Set } from "./Set";

export class Workout {
    sets: Set[] = [];
    secondsBetweenSets: number = 0;
    name: string = "";

    private _uid: string;

    public get uid(): string {
        return this._uid;
    }

    public get secondsBetweenSetsTimeFormat(): string {
        return Utilities.SecondsToMMSS(this.secondsBetweenSets);
    }

    public set secondsBetweenSetsTimeFormat(mmss: string) {
        try {
            this.secondsBetweenSets = Utilities.MMSSToSeconds(mmss);
        }
        catch (err) {
            console.error("The format " + mmss + " has an error: " + err + ". It has been handled while setting seconds between set in workout.")
        }
    }

    constructor(name: string, sets: Set[], secondsBetweenSets: number) {
        this.sets = sets;
        this.secondsBetweenSets = secondsBetweenSets;
        this.name = name;
        this._uid = Utilities.generateUID();
    }

    static get Empty() {
        return new Workout("", [], 0);
    }

    getACopy(): Workout {
        var copy: Workout = Object.assign(Workout.Empty, JSON.parse(JSON.stringify(this)));

        for (var i = 0; i < copy.sets.length; i++) {
            copy.sets[i] = Object.assign(Set.Empty, copy.sets[i]);
            copy.sets[i].uid = Utilities.generateUID();
        }

        copy._uid = Utilities.generateUID();
        return copy;
    }

    addEmptySet() {
        this.sets.push(Set.Empty)
    }

    removeSet(set: Set) {
        const index = this.sets.indexOf(set);

        if (index > -1) {
            this.sets.splice(index, 1);

            console.log("Set \"" + set.exercise + "\" at index " + index + " deleted in workout " + this.name + ".");
        }
        else {
            console.error("Cannot delete set in workout " + this.name + ": the set you are trying to delete doesn't exist.")
        }
    }

    moveSet(fromIndex: number, toIndex: number) {

        console.log("Move " + this.sets[fromIndex].exercise + " to " + toIndex + ".");
        this.sets = this.sets.move(fromIndex, toIndex);
    }
}