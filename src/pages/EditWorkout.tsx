import { IonButton, IonButtons, IonContent, IonDatetime, IonFab, IonFabButton, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonReorderGroup, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { Workout } from '../services/Workout';
import { WorkoutsSave } from '../services/WorkoutsSave';
import './EditWorkout.css';
import { add, checkmark, saveOutline, pencilOutline, play } from 'ionicons/icons';
import ErrorPage from '../components/ErrorPage';
import React from 'react';
import HomeButton from '../components/HomeButton';
import SetItem from '../components/edit-workout/SetItem';
import SetsList from '../components/edit-workout/SetsList';
import WorkoutOptionsButton from '../components/edit-workout/WorkoutOptionsButton';


interface EditWorkoutProps extends RouteComponentProps<{
    id: string;
}> { }

class EditWorkout extends React.Component<EditWorkoutProps>{

    private id: number = 0;

    state = {
        ignored: 0,
        workout: Workout.Empty,
        isEditing: false
    }

    constructor(props: EditWorkoutProps | Readonly<EditWorkoutProps>) {
        super(props);

        this.setIDFromURL();
        this.forceUpdate = this.forceUpdate.bind(this);
        this.onWorkoutModified = this.onWorkoutModified.bind(this);
    }

    componentDidMount() {
        WorkoutsSave.Instance.attachOnWorkoutsModified(this.onWorkoutModified);
        this.setWorkoutFromID();
    }

    componentDidUpdate() {
        this.setIDFromURL();
    }

    componentWillUnmount() {
        WorkoutsSave.Instance.dettachOnWorkoutsModified(this.onWorkoutModified);
    }

    onWorkoutModified() {
        this.setWorkoutFromID();
        this.forceUpdate();
    }

    onAddSetClick() {
        const w = this.state.workout;

        if (w == undefined) throw "Add set to an undefined workout";
        if (w == null) throw "Add set to a null workout"

        w.addEmptySet();
        WorkoutsSave.Instance.saveCurrentWorkouts();
    }

    setWorkoutFromID() {
        if (WorkoutsSave.Instance.areWorkoutsLoaded == false) return;

        const newWorkout = WorkoutsSave.Instance.workouts[this.id];

        if (newWorkout == this.state.workout) return;

        this.setState({
            workout: newWorkout
        });
    }

    setIDFromURL() {
        this.id = parseInt(this.props.match.params.id);
        this.setWorkoutFromID();
    }

    startRenaming() {
        this.setState({ isRenamingWorkout: true });
    }

    validateRenaming(newName: string) {
        this.setState({ isRenamingWorkout: false });

        this.state.workout.name = newName;
        WorkoutsSave.Instance.saveCurrentWorkouts();
    }

    toggleIsEditing() {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    render() {
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

                            <IonButtons slot="end">
                                <IonButton color="primary" onClick={() => this.toggleIsEditing()}>
                                    {this.state.isEditing ? "Save" : "Edit"}</IonButton>
                                <WorkoutOptionsButton workout={workout} />
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent fullscreen>

                        <SetsList isEditing={this.state.isEditing} workout={workout} />

                        <IonFab hidden={!this.state.isEditing} vertical="bottom" horizontal="center" slot="fixed">
                            <IonFabButton onClick={() => { this.onAddSetClick(); this.forceUpdate(); }}>
                                <IonIcon icon={add} />
                            </IonFabButton>
                        </IonFab>
                    </IonContent>

                    <IonFooter>
                        <IonList hidden={!this.state.isEditing} lines="none" >
                            <IonListHeader>
                                <IonLabel>Settings</IonLabel>
                            </IonListHeader>

                            <IonItem class="input-pause-seconds" lines="none">
                                <IonLabel>
                                    Pause between sets
                                </IonLabel>

                                <IonDatetime
                                    display-format="mm:ss"
                                    picker-format="mm:ss"
                                    value={"2000-01-01T00:" + workout.secondsBetweenSetsTimeFormat + ".789"}
                                    onIonChange={(e) => {
                                        if (e.detail.value != null) {

                                            var mm = e.detail.value.split(":")[1];
                                            var ss = e.detail.value.split(":")[2].split(".")[0];

                                            workout.secondsBetweenSetsTimeFormat = mm + ":" + ss;
                                            WorkoutsSave.Instance.saveCurrentWorkouts();
                                        }
                                    }}
                                    onChange={(e) => {
                                    }}>
                                </IonDatetime>
                            </IonItem>
                        </IonList>

                        <IonButton hidden={this.state.isEditing} routerLink={"/play-workout/" + this.props.match.params.id} expand="full">start workout</IonButton>
                    </IonFooter>
                </IonPage >

            );
        }
        catch (err) {
            return <ErrorPage err={err} />
        }
    }
}

export default EditWorkout;
