import { IonAlert } from "@ionic/react";
import { Workout } from "../services/Workout";
import { WorkoutExamples } from "../services/WorkoutExamples";
import { WorkoutsSave } from "../services/WorkoutsSave";

interface EraseAllWorkoutsPromptProps {    
    isOpen: boolean,
    onDismiss: () => void
}

const EraseAllWorkoutsPrompt: React.FC<EraseAllWorkoutsPromptProps> = ({ isOpen, onDismiss }) => {
    return (
        <IonAlert
            isOpen={isOpen}
            onDidDismiss={onDismiss}
            header={'Erase all workouts?'}
            message={'<p>This operation cannot be reverted.</p>Are you sure to delete <strong>EVERY workouts</strong>?'}
            buttons={[
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                },
                {
                    text: 'Delete',
                    handler: () => {
                        WorkoutsSave.Instance.resetSave();
                    }
                }
            ]}
        />
    );
};

export default EraseAllWorkoutsPrompt;
