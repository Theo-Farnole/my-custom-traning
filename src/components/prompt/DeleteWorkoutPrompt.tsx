import { IonAlert } from "@ionic/react";
import { useHistory, withRouter } from "react-router-dom";
import { Workout } from "../../services/Workout";
import { WorkoutsSave } from "../../services/WorkoutsSave";
import { Utilities } from "../../utilities/utilities";

interface DeleteWorkoutPromptProps {
    workout: Workout,
    isOpen: boolean,
    onDismiss: () => void
}

const DeleteWorkoutPrompt: React.FC<DeleteWorkoutPromptProps> = ({ workout, isOpen, onDismiss }) => {
    const history = useHistory();

    return (
        <IonAlert
            isOpen={isOpen}
            onDidDismiss={() => onDismiss()}
            header={'Delete ' + Utilities.truncateString(workout.name, 30) + '?'}
            message={'<p>This operation cannot be reverted.</p>Are you sure to delete <strong>' + Utilities.truncateString(workout.name, 30) + '</strong>?'}
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

                        onDismiss();
                        onDismiss = () => { };


                        history.push("/home");
                    }
                }
            ]}
        />
    );
};

export default DeleteWorkoutPrompt;
