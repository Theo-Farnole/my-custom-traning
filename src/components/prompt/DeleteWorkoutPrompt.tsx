import { IonAlert } from "@ionic/react";
import { Workout } from "../../services/Workout";
import { WorkoutsSave } from "../../services/WorkoutsSave";

interface DeleteWorkoutPromptProps {
    workout: Workout,
    isOpen: boolean,
    onDismiss: () => void
}

const DeleteWorkoutPrompt: React.FC<DeleteWorkoutPromptProps> = ({ workout, isOpen, onDismiss }) => {
    return (
        <IonAlert
            isOpen={isOpen}
            onDidDismiss={onDismiss}
            header={'Delete ' + truncateString(workout.name, 30) + '?'}
            message={'<p>This operation cannot be reverted.</p>Are you sure to delete <strong>' + truncateString(workout.name, 30) + '</strong>?'}
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

function truncateString(str: string, num: number) {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
  }

export default DeleteWorkoutPrompt;
