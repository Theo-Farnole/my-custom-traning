import { IonAlert, IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonFab, IonFabButton, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonReorderGroup, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { Workout } from '../services/Workout';
import { WorkoutsSave } from '../services/WorkoutsSave';
import './EditWorkout.css';
import { add, checkmark, saveOutline, pencilOutline, play, arrowForwardCircle, arrowForward } from 'ionicons/icons';
import ErrorPage from '../components/ErrorPage';
import React from 'react';
import HomeButton from '../components/HomeButton';
import SetItem from '../components/edit-workout/SetItem';
import SetsList from '../components/edit-workout/SetsList';
import WorkoutOptionsButton from '../components/edit-workout/WorkoutOptionsButton';
import { timeStamp } from 'console';
import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";

interface WorkoutDetailsProps extends RouteComponentProps<{
    id: string;
}> { }

class WorkoutDetails extends React.Component<WorkoutDetailsProps>{

    private id: number = 0;

    state = {
        ignored: 0,
        workout: Workout.Empty,
        isCannotPlayWorkoutOpen: false
    }

    constructor(props: WorkoutDetailsProps | Readonly<WorkoutDetailsProps>) {
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

    openCannotPlayWorkout(open: boolean) {
        this.setState({
            isCannotPlayWorkoutOpen: open
        });
    }

    private tryStartWorkout() {
        if (this.state.workout.sets.length == 0) {
            this.openCannotPlayWorkout(true);
        }
        else {

            FirebaseAnalytics.logEvent({
                name: "start_workout",
                params: {}
            });

            console.log("event start_workout");

            var url = "/workout/play/" + this.id;
            this.props.history.push(url);
        }
    }

    private startEdit() {
        var url = "/workout/edit/" + this.id;
        this.props.history.push(url);
    }

    private isWorkoutEmpty() {
        return this.state.workout.sets.length == 0
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
                            <IonTitle>Details of {workout.name}</IonTitle>

                            <IonButtons slot="end">
                                <IonButton color="light" routerLink={"/workout/edit/" + this.props.match.params.id}>
                                    Edit
                                </IonButton>
                                <WorkoutOptionsButton workout={workout} />
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent fullscreen>

                        <IonAlert
                            isOpen={this.state.isCannotPlayWorkoutOpen}
                            onDidDismiss={() => this.openCannotPlayWorkout(false)}
                            header={'Cannot start this workout'}
                            message={'Cannot start this workout because it has no sets to play. Please add one by click on Edit, then the + button.'}
                            buttons={['OK']}
                        />

                        <div className="center ion-text-center" >
                            <IonLabel onClick={() => this.startEdit()} hidden={!this.isWorkoutEmpty()}>
                                No exercice created yet.<br />
                                Enter in <a href={"/workout/edit/" + this.props.match.params.id}>edit mode</a> to add new exercise
                            </IonLabel>
                        </div>

                        <SetsList isEditing={false} workout={workout} />

                        <IonFab vertical="bottom" horizontal="center" slot="fixed">
                            <IonFabButton onClick={() => this.tryStartWorkout()}>
                                <IonIcon icon={play} />
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
}

export default WorkoutDetails;

