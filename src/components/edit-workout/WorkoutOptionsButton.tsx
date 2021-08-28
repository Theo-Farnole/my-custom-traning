import { IonItem, IonLabel, IonButton, IonIcon, useIonPopover, IonList, IonListHeader, IonHeader, IonPopover } from "@ionic/react";
import { useState } from "react";
import { Workout } from "../../services/Workout";
import DeleteWorkoutPrompt from "../prompt/DeleteWorkoutPrompt";
import { ellipsisVertical } from "ionicons/icons"
import RenameWorkoutPrompt from "../prompt/RenameWorkoutPrompt";
import DuplicateWorkoutPrompt from "../prompt/DuplicateWorkoutPrompt";
import { RouteComponentProps } from "react-router";

interface WorkoutOptionsButtonProps {
    workout: Workout
}

interface PopoverListProps {
    workout: Workout,
    isOpen: boolean,
    event: undefined
    onHide: () => void,
}

const PopoverList: React.FC<PopoverListProps> = ({ workout, onHide, isOpen, event }) => {

    const [isDeleteOpen, openDeletePrompt] = useState(false);
    const [isRenameOpen, openRenamePrompt] = useState(false);
    const [isDuplicateOpen, openDuplicatePrompt] = useState(false);

    return (
        <>
            <IonPopover isOpen={isOpen} onDidDismiss={() => onHide()} event={event} >
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
            </IonPopover >
        </>
    );
}

const WorkoutOptionsButton: React.FC<WorkoutOptionsButtonProps> = ({ workout }) => {

    const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });


    return (
        <>
            <IonButton onClick={
                (e: any) => {
                    e.persist();
                    setShowPopover({ showPopover: true, event: e })
                }} icon-only fill="clear" color="dark">
                <IonIcon slot="icon-only" icon={ellipsisVertical} />
            </IonButton>

            <PopoverList
                event={popoverState.event}
                isOpen={popoverState.showPopover}
                workout={workout} 
                onHide={() => setShowPopover({ showPopover: false, event: undefined })} />
        </>
    );
};

export default WorkoutOptionsButton;
