import { IonAlert } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Workout } from "../../services/Workout";
import { WorkoutExamples } from "../../services/WorkoutExamples";
import { WorkoutsSave } from "../../services/WorkoutsSave";
import { Utilities } from "../../utilities/utilities";

interface DuplicateWorkoutPromptProps {
    isOpen: boolean,
    workoutToDuplicate: Workout,
    onDismiss: () => void
}

const DuplicateWorkoutPrompt: React.FC<DuplicateWorkoutPromptProps> = ({ isOpen, onDismiss, workoutToDuplicate }) => {
    const history = useHistory();

    return (
        <IonAlert
            isOpen={isOpen}
            onDidDismiss={() => onDismiss()}
            header={'Duplicating workout ' + Utilities.truncateString(workoutToDuplicate.name, 30)}
            inputs={[
                {
                    name: 'Duplicated workout name',
                    label: 'name',
                    type: 'text',
                    placeholder: "Copy of " + workoutToDuplicate.name,
                    value: "Copy of " + workoutToDuplicate.name
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

                        const workoutName = Utilities.isBlank(data.name) ? "Copy of " + workoutToDuplicate.name : data.name;
                        const workout = workoutToDuplicate.getACopy();
                        workout.name = workoutName;
                        saveInstance.addWorkout(workout);

                        const workoutIndex = saveInstance.workouts.indexOf(workout);
                        
                        var url = "/workout/edit/" + workoutIndex;
                        history.replace(url);                        
                    }
                }
            ]}
        />
    );
};

export default DuplicateWorkoutPrompt;