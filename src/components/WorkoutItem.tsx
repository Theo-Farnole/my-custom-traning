import { IonItem, IonLabel, IonButton } from "@ionic/react";
import { useState } from "react";
import { Workout } from "../services/Workout";
import DeleteWorkoutPrompt from "./prompt/DeleteWorkoutPrompt";

interface WorkoutItemProps {
    workout: Workout;
    editID: number;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout, editID }) => {
    const [isDeleteOpen, openDeletePrompt] = useState(false);

    return (
        <div>
            <DeleteWorkoutPrompt isOpen={isDeleteOpen} workout={workout} onDismiss={() => openDeletePrompt(false)} />

            <IonItem key={workout.uid}> {/*need key property to avoid this https://sentry.io/answers/unique-key-prop/*/}
                <IonLabel>{workout.name}</IonLabel>
                <IonLabel className="ion-text-center">{workout.duration}</IonLabel>
                <IonLabel class="ion-text-right">
                    <IonButton routerLink={"/edit-workout/" + editID} color="secondary">edit</IonButton>
                    <IonButton onClick={() => openDeletePrompt(true)} color="danger">delete</IonButton>
                </IonLabel>
            </IonItem>
        </div>
    );
};

export default WorkoutItem;
