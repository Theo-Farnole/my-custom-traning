import { Utilities } from "../utilities/utilities";


export class Set {
    private _repetitionsPerSet: string = "";

    public get repetitionsPerSet(): string {
        if (Utilities.isBlank(this._repetitionsPerSet)) {
            return "1"
        }
        else {
            return this._repetitionsPerSet;
        }
    }
    public set repetitionsPerSet(value: string) {
        this._repetitionsPerSet = value;
    }
    private _exercise: string = "";

    public get exercise(): string {
        if (Utilities.isBlank(this._exercise)) {
            return "unnamed"
        }
        else {
            return this._exercise;
        }
    }
    public set exercise(value: string) {
        this._exercise = value;
    }
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
