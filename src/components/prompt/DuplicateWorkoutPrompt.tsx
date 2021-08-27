import { IonAlert } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Workout } from "../../services/Workout";
import { WorkoutExamples } from "../../services/WorkoutExamples";
import { WorkoutsSave } from "../../services/WorkoutsSave";
import { Utilities } from "../../utilities/utilities";

interface DuplicateWorkoutPromptProps {
    isOpen: boolean,
    workout: Workout,
    onDismiss: () => void
}

const DuplicateWorkoutPrompt: React.FC<DuplicateWorkoutPromptProps> = ({ isOpen, onDismiss, workout }) => {
    const history = useHistory();

    return (
        <IonAlert
            isOpen={isOpen}
            onDidDismiss={() => onDismiss()}
            header={'Duplicating workout' + Utilities.truncateString(workout.name, 30)}
            inputs={[
                {
                    name: 'Duplicated workout name',
                    label: 'name',
                    type: 'text',
                    value: workout.name
                }
            ]}
            buttons={[
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                },
                {
                    text: 'Duplicate',
                    handler: (data) => {
                        const saveInstance = WorkoutsSave.Instance;

                        const workoutName = Utilities.isBlank(data.name) ? "workout #" + (saveInstance.workouts.length + 1) : data.name;
                        const workout = new Workout(workoutName, [], 90);
                        saveInstance.addWorkout(workout);

                        const workoutIndex = saveInstance.workouts.indexOf(workout);

                        var url = "/edit-workout/" + workoutIndex;
                        history.push(url);
                    }
                }
            ]}
        />
    );
};

export default DuplicateWorkoutPrompt;