import { IonAlert } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Workout } from "../../services/Workout";
import { WorkoutExamples } from "../../services/WorkoutExamples";
import { WorkoutsSave } from "../../services/WorkoutsSave";
import { Utilities } from "../../utilities/utilities";

interface RenameWorkoutPromptProps {
    isOpen: boolean,
    workout: Workout
    onDismiss: () => void
}

const RenameWorkoutPrompt: React.FC<RenameWorkoutPromptProps> = ({ isOpen, workout, onDismiss }) => {
    return (
        <IonAlert
            isOpen={isOpen}
            onDidDismiss={() => onDismiss()}
            header={'Renaming workout ' + Utilities.truncateString(workout.name, 30)}
            inputs={[
                {
                    name: 'name',
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
                    text: 'Rename',
                    handler: (data) => {

                        if (Utilities.isBlank(data.name) == false) {
                            workout.name = data.name;
                            WorkoutsSave.Instance.saveCurrentWorkouts();
                        }
                        else {
                            console.log("We cannot rename the workout \"" + workout.name + "\" by a blank name.");
                        }
                    }
                }
            ]}
        />
    );
};

export default RenameWorkoutPrompt;
