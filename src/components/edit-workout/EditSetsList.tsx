import { IonReorderGroup, IonListHeader, IonLabel, IonCol, IonGrid, IonInput, IonRow } from "@ionic/react";
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

        workout.moveSet(event.detail.from - 1, event.detail.to - 1);
        WorkoutsSave.Instance.saveCurrentWorkouts();
    }

    render() {
        const sets_list = this.generateWorkoutList();
        const workout = this.props.workout;

        return (
            <IonReorderGroup
                className="sets-list-editing"
                onIonItemReorder={(e) => this.onReorder(e, workout)}
                disabled={false} >

                {sets_list}

            </IonReorderGroup >);
    }
}

export default EditSetsList;