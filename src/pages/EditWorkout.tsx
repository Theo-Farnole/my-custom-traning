import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonListHeader, IonMenuButton, IonPage, IonReorder, IonReorderGroup, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { Workout } from '../services/Workout';
import { WorkoutsSave } from '../services/WorkoutsSave';
import './EditWorkout.css';
import { ItemReorderEventDetail } from '@ionic/core';
import { checkmark } from 'ionicons/icons';
import { Set } from '../services/Set';
import ErrorPage from '../components/ErrorPage';
import React from 'react';
import { pencil } from 'ionicons/icons'


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
        this.onDeleteSetClick = this.onDeleteSetClick.bind(this);
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
                <IonItem key={set.uid} className="set-input">
                    <IonButton onClick={() => { this.onDeleteSetClick(set); this.forceUpdate(); }} color="danger">delete</IonButton>

                    <div className="exercice-input ion-input">
                        <IonInput placeholder="exercise" onIonChange={e => { set.exercise = e.detail.value as string; WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.exercise}></IonInput>
                    </div>

                    <div className="rep-input ion-input">
                        <IonInput placeholder="1" onIonChange={e => { set.repetitionsPerSet = e.detail.value as string; WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.repetitionsPerSet}></IonInput>
                    </div>

                    <div className="set-count-input ion-input">
                        <IonInput placeholder="1" type="number" onIonChange={e => { set.setCount = parseInt(e.detail.value as string); WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.setCount}></IonInput>
                    </div>

                    <IonReorder slot="end" />
                </IonItem >
            );
        });

        return components;
    }

    onDeleteSetClick(s: Set) {
        this.state.workout.removeSet(s);
        WorkoutsSave.Instance.saveCurrentWorkouts();
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
                                <IonBackButton />
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

                        <IonButton onClick={() => { this.addSetClicked(workout); this.forceUpdate(); }} expand="block">
                            Add a set
                        </IonButton>

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
