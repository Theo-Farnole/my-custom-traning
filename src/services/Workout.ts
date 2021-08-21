import { Set } from "./Set";

export class Workout {
    sets: Set[] = [];
    secondsBetweenSets: number = 0;
    name: string = "";
    duration: string = "DURATION NOT IMPLEMENTED";

    constructor(name: string, sets: Set[], secondsBetweenSets: number) {
        this.sets = sets;
        this.secondsBetweenSets = secondsBetweenSets;
        this.name = name;
    }

    addEmptySet() {
        this.sets.push(Set.Empty)
    }

    removeSet(set: Set) {
        const index = this.sets.indexOf(set);

        if (index > -1) {
            this.sets.splice(index, 1);

            console.log("Set \"" + set + "\" at index " + index + "deleted in workout " + this.name + ".");
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