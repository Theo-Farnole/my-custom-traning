import { Utilities } from "../utilities/utilities";


export class Set {
    repetitionsPerSet: string;
    setCount: number;
    exercise: string;
    uid: string;

    constructor(exercise: string, repetitionsPerSet: string, setCount: number) {
        this.repetitionsPerSet = repetitionsPerSet;
        this.setCount = setCount;
        this.exercise = exercise;

        this.uid = Utilities.generateUID();
    }

    public static get Empty(): Set {
        return new Set("", "", 1);
    }
}
