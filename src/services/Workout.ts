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
}