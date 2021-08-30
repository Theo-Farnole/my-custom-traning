import { IonItem, IonLabel, IonButton } from "@ionic/react";
import { Workout } from "../../services/Workout";
import WorkoutOptionsButton from "../edit-workout/WorkoutOptionsButton";
import "./WorkoutItem.css"

interface WorkoutItemProps {
    workout: Workout;
    editID: number;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout, editID }) => {

    return (
        <IonItem routerLink={"/edit-workout/" + editID} key={workout.uid}> {/*need key property to avoid this https://sentry.io/answers/unique-key-prop/*/}
            <IonLabel>{workout.name}</IonLabel>
            {/* IonLabel containing buttons is a hack to get the right order corresponding to list header */}

            {/* <IonButton routerLink={"/play-workout/" + editID}>start routine</IonButton> */}
            <IonButton routerLink={"/edit-workout/" + editID} color="light">edit</IonButton> 
        </IonItem>
    );
};

export default WorkoutItem;
