import { IonReorderGroup, IonListHeader, IonLabel } from "@ionic/react";
import React from "react";
import { Workout } from "../../services/Workout";
import { WorkoutsSave } from "../../services/WorkoutsSave";
import SetItem from "./SetItem";
import { ItemReorderEventDetail } from '@ionic/core';
import "./SetsList.css"

interface SetsListProps {
    workout: Workout
}

class SetsList extends React.Component<SetsListProps> {

    generateWorkoutList() {
        const workout = this.props.workout;
        var components: JSX.Element[] = [];

        workout?.sets.forEach((set) => {
            components.push(
                <SetItem key={set.uid} set={set} workout={workout} />
            );
        });

        return components;
    }

    onReorder(event: CustomEvent<ItemReorderEventDetail>, workout: Workout) {
        event.detail.complete();

        workout.moveSet(event.detail.from - 1, event.detail.to - 1);
        WorkoutsSave.Instance.saveCurrentWorkouts();
    }

    render() {
        const sets_list = this.generateWorkoutList();
        const workout = this.props.workout;

        return (<IonReorderGroup disabled={false} onIonItemReorder={(e) => this.onReorder(e, workout)}>
            <IonListHeader className="set-list-header">
                <IonLabel className="exercice-header"><b>Exercice</b></IonLabel>
                <IonLabel className="rep-header"><b>Rep count</b></IonLabel>
                <IonLabel className="set-header"><b>Set count</b></IonLabel>
            </IonListHeader>

            {sets_list}
        </IonReorderGroup>);
    }
}

export default SetsList;