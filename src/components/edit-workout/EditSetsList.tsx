import { IonReorderGroup, IonListHeader, IonLabel, IonCol, IonGrid, IonInput, IonRow, IonReorder } from "@ionic/react";
import React from "react";
import { Workout } from "../../services/Workout";
import { WorkoutsSave } from "../../services/WorkoutsSave";
import EditSetItem from "./EditSetItem";
import { ItemReorderEventDetail } from '@ionic/core';
import "./EditSetsList.css"

interface SetsListProps {
    workout: Workout
}

class EditSetsList extends React.Component<SetsListProps> {

    generateWorkoutList() {
        const workout = this.props.workout;
        var components: JSX.Element[] = [];

        workout?.sets.forEach((set) => {
            components.push(
                <EditSetItem key={set.uid} set={set} workout={workout} />
            );
        });

        return components;
    }

    onReorder(event: CustomEvent<ItemReorderEventDetail>, workout: Workout) {
        event.detail.complete();

        workout.moveSet(event.detail.from, event.detail.to);
        WorkoutsSave.Instance.saveCurrentWorkouts();
    }

    render() {
        const sets_list = this.generateWorkoutList();
        const workout = this.props.workout;

        return (


            <IonGrid className="sets-list-editing-grid" hidden={workout.sets.length == 0}>
                <IonRow class="gridHeader" >
    
                    <IonCol>
                        <IonLabel><b>Exercise</b></IonLabel>
                    </IonCol>

                    <IonCol size="2">
                        <IonLabel><b>Set</b></IonLabel>
                    </IonCol>

                    <IonCol size="2">
                        <IonLabel><b>Rep</b></IonLabel>
                    </IonCol>

                    <IonCol className="action" size="2">
                        <IonLabel><b>Actions</b></IonLabel>                        
                    </IonCol>
                </IonRow>


                <IonReorderGroup
                    className="sets-list-editing"
                    onIonItemReorder={(e) => this.onReorder(e, workout)}
                    disabled={false} >
                    {sets_list}
                </IonReorderGroup >
            </IonGrid>

        );
    }
}

export default EditSetsList;