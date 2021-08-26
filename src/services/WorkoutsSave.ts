import { Filesystem, Directory, Encoding, ReadFileResult } from '@capacitor/filesystem';
import { EventDispatcher, Handler } from '../utilities/EventDispatcher';
import { Workout } from './Workout';
import { WorkoutExamples } from './WorkoutExamples';
import { Set } from './Set';

const filename = "workouts.json";
const directory = Directory.Data;
const encoding = Encoding.UTF8;
const completePath = directory + "/" + filename;

interface WorkoutsModifiedEvent { }

export class WorkoutsSave {

    private static _instance: WorkoutsSave;
    private _workouts: Workout[] = [];
    private _areWorkoutsLoaded: boolean = false;
    private _workoutsModifiedDispatcher = new EventDispatcher<WorkoutsModifiedEvent>();

    public get workouts(): Workout[] {
        if (this._areWorkoutsLoaded == false)
            throw "Cannot get workout: Workout not loaded.";

        return this._workouts;
    }

    public get areWorkoutsLoaded(): boolean {
        return this._areWorkoutsLoaded;
    }

    public static get Instance(): WorkoutsSave {
        return this._instance || (this._instance = new this());
    }

    public attachOnWorkoutsModified(handler: Handler<WorkoutsModifiedEvent>) {
        this._workoutsModifiedDispatcher.register(handler);
    }

    public dettachOnWorkoutsModified(handler: Handler<WorkoutsModifiedEvent>) {
        this._workoutsModifiedDispatcher.unregister(handler);
    }

    private fireWorkoutsModifiedEvent(event: WorkoutsModifiedEvent) {
        this._workoutsModifiedDispatcher.fire(event);
    }

    loadWorkouts() {
        return Filesystem.readFile(
            {
                path: filename,
                directory: directory,
                encoding: encoding
            }).then((raw_json) => {
                var json = JSON.parse(raw_json.data);
                this._workouts = []

                try {
                    json.forEach((workoutData: Workout) => {

                        const emptyWorkout = new Workout("", [], 0);
                        const fullfilledWorkout = Object.assign(emptyWorkout, workoutData);

                        emptyWorkout.sets = Array<Set>();

                        for (var i = 0; i < workoutData.sets.length; i++) {
                            emptyWorkout.sets.push(Object.assign(new Set("", "", 0), workoutData.sets[i]));
                        }

                        this._workouts.push(fullfilledWorkout);
                    });
                }
                catch (err) {
                    console.error("Error while parsing: " + err);
                }

                this._areWorkoutsLoaded = true;
                this.fireWorkoutsModifiedEvent({});

                console.log("Successfully loaded " + this.workouts.length + " workouts.");
            }).catch((error) => {
                if (error == "Error: File does not exist.") {
                    console.log("Cannot find workouts file. Creating default file...");
                    this.createDefaultConfiguration();

                    this._areWorkoutsLoaded = true;
                    this.fireWorkoutsModifiedEvent({});
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
            data: JSON.stringify(this._workouts)
        }).then(() => {
            console.log("Workouts saved.");
        }).catch((err) => {
            console.log("Workout saving failed: " + err);
        });

        this.fireWorkoutsModifiedEvent({});
    }

    createDefaultConfiguration() {
        this._workouts = WorkoutExamples.getAllExamples();
        this.saveCurrentWorkouts();

        console.log("Default file created.")
    }

    addWorkout(workout: Workout) {
        this.workouts.push(workout);
        this.saveCurrentWorkouts();
    }

    removeWorkout(workout: Workout) {
        const index = this.workouts.indexOf(workout);

        if (index > -1) {
            this.workouts.splice(index, 1);

            console.log("Workout \"" + workout + "\" at index " + index + "deleted.");
        }
        else {
            console.error("Cannot delete workout " + workout.name + ": the workout you are trying to delete doesn't exist.")
        }

        this.saveCurrentWorkouts();
    }

    resetSave() {
        Filesystem.deleteFile({
            path: filename,
            directory: directory
        }).then(() => {
            console.log("File " + filename + " succesfuly deleted.")
            this.createDefaultConfiguration();
        })
        .catch((err) => {
            console.log("Deleting " + filename + " failed: " + err);
        });
    }
}