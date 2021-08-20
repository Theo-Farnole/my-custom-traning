import { Set } from "./Set";
import { Workout } from "./Workout";


export class WorkoutExamples {
    static getAllExamples() {
        return [
            this.getPushWorkout(),
            this.getPullWorkout(),
            this.getLegsDayWorkout()
        ];
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

    static getPushWorkout() {
        var sets = [
            new Set("Push ups", "8", 3),
            new Set("Dips", "Max Rep - 1", 3),
            new Set("Squats", "10", 4)
        ];

        return new Workout("Push workout", sets, 90);
    }

    static getLegsDayWorkout() {
        var sets = [
            new Set("Squats", "10", 3),
            new Set("Calf raises", "10", 3),
            new Set("Side leg raises", "10 per leg", 3),
            new Set("Side-to-side lunges", "10", 3)
        ];

        return new Workout("Legz day!", sets, 120);
    }
}
