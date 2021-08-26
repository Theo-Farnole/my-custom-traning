import { Utilities } from "../utilities/utilities";


export class Set {
    repetitionsPerSet: string;
    exercise: string;
    uid: string;
    private _setCount: number = 1;

    public get setCount(): number {
        return this._setCount;
    }
    public set setCount(value: number) {
        if (value <= 0) {
            value = 1;
        }

        this._setCount = value;
    }

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
