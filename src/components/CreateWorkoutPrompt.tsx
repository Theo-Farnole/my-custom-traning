import { IonAlert } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Workout } from "../services/Workout";
import { WorkoutExamples } from "../services/WorkoutExamples";
import { WorkoutsSave } from "../services/WorkoutsSave";

interface CreateWorkoutPromptProps {
    isOpen: boolean,
    onDismiss: () => void
}

const CreateWorkoutPrompt: React.FC<CreateWorkoutPromptProps> = ({ isOpen, onDismiss }) => {
    const history = useHistory();

    return (
        <IonAlert
            isOpen={isOpen}
            onDidDismiss={() => onDismiss()}
            header={'Creating workout!'}
            inputs={[
                {
                    name: 'name',
                    label: 'name',
                    type: 'text',
                    placeholder: 'legz day'
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
                    text: 'Create',
                    handler: (data) => {
                        const saveInstance = WorkoutsSave.Instance;

                        const workout = new Workout(data.name, [], 90);
                        saveInstance.addWorkout(workout);

                        const workoutIndex = saveInstance.workouts.indexOf(workout);

                        if (workoutIndex != -1) {

                            var url = "/edit-workout/" + workoutIndex;
                            history.push(url);
                            // open edit page 
                        }
                        else {

                        }
                    }
                }
            ]}
        />
    );
};

export default CreateWorkoutPrompt;
