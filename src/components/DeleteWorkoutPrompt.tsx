import { IonAlert } from "@ionic/react";
import { Workout } from "../services/Workout";
import { WorkoutExamples } from "../services/WorkoutExamples";
import { WorkoutsSave } from "../services/WorkoutsSave";

interface DeleteWorkoutPromptProps {
    workout: Workout,
    isOpen: boolean
}

const DeleteWorkoutPrompt: React.FC<DeleteWorkoutPromptProps> = ({ workout, isOpen }) => {

    if ((workout == undefined || workout == null) && isOpen == true)
        throw "Cannot open delete workout prompt. The workout to delete is undefined."

    return (
        <IonAlert
            isOpen={isOpen}
            //   onDidDismiss={() => setShowAlert3(false)}
            header={'Delete ' + workout.name + '?'}
            message={'<p>This operation cannot be reverted.</p>Are you sure to delete <strong>' + workout.name + '</strong>?'}
            buttons={[
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                },
                {
                    text: 'Delete',
                    handler: () => {
                        WorkoutsSave.Instance.removeWorkout(workout);
                    }
                }
            ]}
        />
    );
};

export default DeleteWorkoutPrompt;
