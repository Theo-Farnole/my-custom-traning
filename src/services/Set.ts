
export class Set {
    repetitionsPerSet: string;
    setCount: number;
    exercise: string;

    constructor(exercise: string, repetitionsPerSet: string, setCount: number) {
        this.repetitionsPerSet = repetitionsPerSet;
        this.setCount = setCount;
        this.exercise = exercise;
    }
}
