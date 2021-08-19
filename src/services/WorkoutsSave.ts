import { Filesystem, Directory, Encoding, ReadFileResult } from '@capacitor/filesystem';
import { EventDispatcher, Handler } from '../utilities/EventEmitter';
import { Workout } from './Workout';
import { WorkoutExamples } from './WorkoutExamples';

const filename = "workouts.json";
const directory = Directory.Data;
const encoding = Encoding.UTF8;
const completePath = directory + "/" + filename;

interface WorkoutsModifiedEvent { }

export class WorkoutsSave {

    public workouts: Workout[] = [];
    private static instance: WorkoutsSave;

    private _areWorkoutsLoaded: boolean = false;

    private workoutsModifiedDispatcher = new EventDispatcher<WorkoutsModifiedEvent>();

    public attachOnWorkoutsModified(handler: Handler<WorkoutsModifiedEvent>) {
        this.workoutsModifiedDispatcher.register(handler);
    }

    private fireWorkoutsModifiedEvent(event: WorkoutsModifiedEvent) {
        this.workoutsModifiedDispatcher.fire(event);
    }

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
                this.fireWorkoutsModifiedEvent({});
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
            data: JSON.stringify(this.workouts)
        });
    }

    createDefaultConfiguration() {
        this.workouts = WorkoutExamples.getAllExamples();
        this.saveCurrentWorkouts();

        console.log("Default file created.")
    }

    resetSave() {
        Filesystem.deleteFile({
            path: filename,
            directory: directory
        }).then(() => {
            console.log("File " + filename + " succesfuly deleted.")
            this.fireWorkoutsModifiedEvent({});
        })
            .catch((err) => {
                console.log("Deleting " + filename + " failed: " + err);
            });
    }
}