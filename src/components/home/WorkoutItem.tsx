import { IonItem, IonLabel, IonButton, IonItemDivider, IonGrid, IonRow, IonCol } from "@ionic/react";
import { Workout } from "../../services/Workout";
import WorkoutOptionsButton from "../edit-workout/WorkoutOptionsButton";
import "./WorkoutItem.css"

interface WorkoutItemProps {
    workout: Workout;
    editID: number;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout, editID }) => {

    return (
        <>
            <IonItem class="workout-item elevationFirstLevel flex-container" routerLink={"/edit-workout/" + editID} lines="none" key={workout.uid}> {/*need key property to avoid this https://sentry.io/answers/unique-key-prop/*/}

                <IonGrid>
                    <IonRow>
                        <IonLabel class="workout-name">{workout.name}</IonLabel>
                    </IonRow>

                    <hr />

                    <IonRow>
                        <IonCol>
                            <IonLabel className="stat">{workout.sets.length} exercices</IonLabel>
                        </IonCol>

                        <IonCol>
                            <IonLabel className="stat">{workout.totalSetCount} sets</IonLabel>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonItem>
        </>
    );
};

export default WorkoutItem;
