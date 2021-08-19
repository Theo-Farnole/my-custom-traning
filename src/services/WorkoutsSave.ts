import { Filesystem, Directory, Encoding, ReadFileResult } from '@capacitor/filesystem';

const filename = "workouts.json";
const directory = Directory.Data;
const encoding = Encoding.UTF8;
const completePath = directory + "/" + filename;

export class WorkoutsSave {

    public workouts: Workout[] = [];
    private static instance: WorkoutsSave;

    private _areWorkoutsLoaded: boolean = false;

    public get areWorkoutsLoaded(): boolean {
        return this._areWorkoutsLoaded;
    }

    public static get Instance(): WorkoutsSave {
        return this.instance || (this.instance = new this());
    }

    loadWorkouts() {
        return Filesystem.readFile(
            {
                path: filename,
                directory: directory,
                encoding: encoding
            }).then((raw_json) => {
                this.workouts = JSON.parse(raw_json.data);

                console.log("Successfully loaded " + this.workouts.length + " workouts.");

                this._areWorkoutsLoaded = true;
            }).catch((error) => {
                if (error == "Error: File does not exist.") {
                    console.log("Cannot find workouts file. Creating default file...");
                    this.createDefaultConfiguration();

                    this._areWorkoutsLoaded = true;
                }
                else {
                    console.log("Failed to load workouts. The following error is " + error + ". For more details, file is located at " + completePath + ".");
                }
            });
    }

    saveCurrentWorkouts() {
        Filesystem.writeFile({
            path: filename,
            directory: directory,
            encoding: encoding,
            data: JSON.stringify(this.workouts)
        });
    }

    createDefaultConfiguration() {

        var defaultWorkouts = [
            Workout.getPullWorkout()
        ];

        this.workouts = defaultWorkouts;
        this.saveCurrentWorkouts();

        console.log("Default file created.")
    }

    resetSave() {
        Filesystem.deleteFile({
            path: filename,
            directory: directory
        }).then(() => {
            console.log("File " + filename + " succesfuly deleted.")
        })
            .catch((err) => {
                console.log("Deleting " + filename + " failed: " + err);
            });
    }
}

export class Workout {
    sets: Set[];
    secondsBetweenSets: number;
    name: string;
    duration: string = "DURATION NOT IMPLEMENTED";

    constructor(name: string, sets: Set[], secondsBetweenSets: number) {
        this.sets = sets;
        this.secondsBetweenSets = secondsBetweenSets;
        this.name = name;
    }

    static getPullWorkout() {
        var sets = [
            new Set("traction pronation", "Max-1", 4),
            new Set("tirage horizontal", "8", 4),
            new Set("tirage focus biceps", "8", 3),
            new Set("relevés de jambes", "12", 4),
            new Set("superset tirage", "max", 3)
        ];

        return new Workout("Pull workout", sets, 90);
    }
}

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