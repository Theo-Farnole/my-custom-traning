import { IonAlert } from "@ionic/react";
import { Workout } from "../services/Workout";
import { WorkoutExamples } from "../services/WorkoutExamples";
import { WorkoutsSave } from "../services/WorkoutsSave";

interface CreateWorkoutPromptProps {
    isOpen: boolean,
    onDismiss: () => void
}

const CreateWorkoutPrompt: React.FC<CreateWorkoutPromptProps> = ({ isOpen, onDismiss }) => {
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
                        WorkoutsSave.Instance.addWorkout(new Workout(data.name, [], 90));
                    }
                }
            ]}
        />
    );
};

export default CreateWorkoutPrompt;
