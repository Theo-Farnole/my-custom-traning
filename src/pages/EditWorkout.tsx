import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonLabel, IonListHeader, IonPage, IonReorderGroup, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { Workout } from '../services/Workout';
import { WorkoutsSave } from '../services/WorkoutsSave';
import './EditWorkout.css';
import { ItemReorderEventDetail } from '@ionic/core';
import { add, checkmark } from 'ionicons/icons';
import ErrorPage from '../components/ErrorPage';
import React from 'react';
import { pencil } from 'ionicons/icons'
import HomeButton from '../components/HomeButton';
import SetItem from '../components/edit-workout/SetItem';


interface EditWorkoutProps extends RouteComponentProps<{
    id: string;
}> { }

class EditWorkout extends React.Component<EditWorkoutProps>{

    private id: number;

    state = {
        ignored: 0,
        workout: Workout.Empty,
        isRenamingWorkout: false
    }

    constructor(props: EditWorkoutProps | Readonly<EditWorkoutProps>) {
        super(props);

        this.id = parseInt(props.match.params.id);
        this.forceUpdate = this.forceUpdate.bind(this);
        this.onWorkoutModified = this.onWorkoutModified.bind(this);
    }

    componentDidMount() {
        WorkoutsSave.Instance.attachOnWorkoutsModified(this.onWorkoutModified);

        if (WorkoutsSave.Instance.areWorkoutsLoaded == true && WorkoutsSave.Instance.workouts[this.id] != this.state.workout) {
            this.setWorkout(WorkoutsSave.Instance.workouts[this.id]);
        }
    }

    componentWillUnmount() {
        WorkoutsSave.Instance.dettachOnWorkoutsModified(this.onWorkoutModified);
    }

    onWorkoutModified() {
        this.setWorkout(WorkoutsSave.Instance.workouts[this.id]);
    }

    setWorkout(workout: Workout) {
        this.setState({
            workout: workout
        });
    }

    doReorder(event: CustomEvent<ItemReorderEventDetail>, workout: Workout) {
        event.detail.complete();

        workout.moveSet(event.detail.from - 1, event.detail.to - 1);
        WorkoutsSave.Instance.saveCurrentWorkouts();
    }

    addSetClicked(w: Workout) {
        if (w == undefined) throw "Add set to an undefined workout";
        if (w == null) throw "Add set to a null workout"

        w.addEmptySet();
        WorkoutsSave.Instance.saveCurrentWorkouts();
    }

    generateWorkoutList() {
        var components: JSX.Element[] = [];

        this.state.workout?.sets.forEach((set) => {
            components.push(
                <SetItem key={set.uid} set={set} workout={this.state.workout} />
            );
        });

        return components;
    }

    startRenaming() {
        this.setState({ isRenamingWorkout: true });
    }

    validateRenaming(newName: string) {
        this.setState({ isRenamingWorkout: false });

        this.state.workout.name = newName;
        WorkoutsSave.Instance.saveCurrentWorkouts();
    }

    render() {
        const sets_list = this.generateWorkoutList();
        const workout = this.state.workout;

        try {
            if (workout == undefined)
                throw "Workout in array is undefined.";

            return (
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <HomeButton />
                            </IonButtons>
                            <IonTitle>{workout.name}</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent fullscreen>

                        <IonReorderGroup disabled={false} onIonItemReorder={(e) => this.doReorder(e, workout)}>
                            <IonListHeader className="set-list-header">
                                <IonLabel className="exercice-header"><b>Exercice</b></IonLabel>
                                <IonLabel className="rep-header"><b>Rep count</b></IonLabel>
                                <IonLabel className="set-header"><b>Set count</b></IonLabel>
                            </IonListHeader>

                            {sets_list}
                        </IonReorderGroup>

                        <IonFab vertical="bottom" horizontal="end" slot="fixed">
                            <IonFabButton onClick={() => { this.addSetClicked(workout); this.forceUpdate(); }}>
                                <IonIcon icon={add} />
                            </IonFabButton>
                        </IonFab>

                    </IonContent>
                </IonPage >

            );
        }
        catch (err) {
            return <ErrorPage err={err} />
        }
    }

    private buildRenameButton() {
        if (this.state.isRenamingWorkout == true) {
            return (
                <IonButton color="light" className="validate-rename-button" onClick={(e) => this.validateRenaming(this.state.workout.name)}>
                    <IonIcon icon={checkmark}></IonIcon>
                </IonButton>
            );
        }
        else {
            return (
                <IonButton color="light" className="rename-button" onClick={() => {
                    console.log("click on rename button");
                    this.startRenaming()
                }} >
                    rename
                    <IonIcon icon={pencil}></IonIcon>
                </IonButton>
            );
        }
    }
}

export default EditWorkout;
