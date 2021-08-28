import { IonItem, IonLabel, IonButton, IonIcon, useIonPopover, IonList, IonListHeader, IonHeader } from "@ionic/react";
import { useState } from "react";
import { Workout } from "../../services/Workout";
import DeleteWorkoutPrompt from "../prompt/DeleteWorkoutPrompt";
import { ellipsisVertical } from "ionicons/icons"
import RenameWorkoutPrompt from "../prompt/RenameWorkoutPrompt";
import DuplicateWorkoutPrompt from "../prompt/DuplicateWorkoutPrompt";

interface WorkoutOptionsButtonProps {
    workout: Workout
}

interface PopoverListProps {
    workout: Workout;
    onHide: () => void;
}

const PopoverList: React.FC<PopoverListProps> = ({ workout, onHide }) => {

    const [isDeleteOpen, openDeletePrompt] = useState(false);
    const [isRenameOpen, openRenamePrompt] = useState(false);
    const [isDuplicateOpen, openDuplicatePrompt] = useState(false);

    return (
        <div>

            <RenameWorkoutPrompt isOpen={isRenameOpen} workout={workout} onDismiss={() => {
                openRenamePrompt(false);
                onHide();
            }} />

            <DuplicateWorkoutPrompt isOpen={isDuplicateOpen} workoutToDuplicate={workout} onDismiss={() => {
                openDuplicatePrompt(false);
                onHide();
            }} />

            <DeleteWorkoutPrompt isOpen={isDeleteOpen} workout={workout} onDismiss={() => {
                openDeletePrompt(false);
                onHide();
            }} />

            <IonList>
                <IonListHeader>Options</IonListHeader>
                <IonItem button onClick={() => openRenamePrompt(true)}>Rename</IonItem>
                <IonItem button onClick={() => openDuplicatePrompt(true)}>Duplicate</IonItem>
                <IonItem button color="danger" onClick={() => openDeletePrompt(true)}>Delete</IonItem>
            </IonList>
        </div>
    );
}

const WorkoutOptionsButton: React.FC<WorkoutOptionsButtonProps> = ({ workout }) => {

    const [showPopover, dismiss] = useIonPopover(PopoverList, {
        workout: workout,
        onHide: () => dismiss()
    });

    return (
        <IonButton onClick={(e) => showPopover({ event: e.nativeEvent })} icon-only fill="clear" color="dark">
            <IonIcon slot="icon-only" icon={ellipsisVertical} />
        </IonButton>
    );
};

export default WorkoutOptionsButton;
