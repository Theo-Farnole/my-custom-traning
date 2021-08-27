import { IonItem, IonLabel, IonButton, IonIcon, useIonPopover, IonList, IonListHeader } from "@ionic/react";
import { useState } from "react";
import { Workout } from "../services/Workout";
import DeleteWorkoutPrompt from "./prompt/DeleteWorkoutPrompt";
import { ellipsisVertical } from "ionicons/icons"

interface WorkoutItemProps {
    workout: Workout;
    editID: number;
}

interface PopoverListProps {
    workout: Workout;
    onHide: () => void;
}

const PopoverList: React.FC<PopoverListProps> = ({ workout, onHide }) => {

    const [isDeleteOpen, openDeletePrompt] = useState(false);

    return (
        <div>

            <DeleteWorkoutPrompt isOpen={isDeleteOpen} workout={workout} onDismiss={() => {
                openDeletePrompt(false);
                onHide();
            }} />

            <IonList>
                <IonItem button>Rename</IonItem>
                <IonItem button>Duplicate</IonItem>
                <IonItem button color="danger" onClick={() => openDeletePrompt(true)}>Delete</IonItem>
            </IonList>
        </div>
    );
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout, editID }) => {

    const [showPopover, dismiss] = useIonPopover(PopoverList, {
        workout: workout,
        onHide: () => dismiss()
    });

    return (
        <div>
            <IonItem key={workout.uid}> {/*need key property to avoid this https://sentry.io/answers/unique-key-prop/*/}
                <IonLabel>{workout.name}</IonLabel>
                <IonLabel className="ion-text-center">{workout.duration}</IonLabel>
                <IonLabel class="ion-text-right">
                    <IonButton routerLink={"/edit-workout/" + editID}>edit</IonButton>                    
                    <IonButton onClick={() => showPopover()}>
                        <IonIcon slot="icon-only" icon={ellipsisVertical} />
                    </IonButton>
                </IonLabel>
            </IonItem>
        </div>
    );
};

export default WorkoutItem;
