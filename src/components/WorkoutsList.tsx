import { IonItem, IonLabel, IonButton, IonContent, IonInput, IonList, IonListHeader, IonModal, IonPage } from "@ionic/react";
import { useState } from "react";
import { WorkoutsSave } from "../services/WorkoutsSave";

const WorkoutsList: React.FC = () => {

    const [workouts_list, setWorkouts] = useState<JSX.Element[]>([])

    WorkoutsSave.Instance.loadWorkouts().then(() => {

        var workouts_list_tmp: JSX.Element[] = [];

        
        WorkoutsSave.Instance.workouts.forEach(element => {
            console.log("Generation element " + element.name);

            workouts_list_tmp.push(
                <IonItem key={element.name}> {/*need key property to avoid this https://sentry.io/answers/unique-key-prop/*/}
                    <IonLabel>{element.name}</IonLabel>
                    <IonLabel className="ion-text-center">{element.duration}</IonLabel>
                    <IonLabel class="ion-text-right">
                        <IonButton color="secondary">edit</IonButton>
                        <IonButton color="danger">delete</IonButton>
                    </IonLabel>
                </IonItem>
            );
        });

        setWorkouts(workouts_list_tmp);
    });


    return (
        <div>
            {workouts_list}
        </div>
    );
};

export default WorkoutsList;
