import { IonAlert, IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonLoading, IonModal, IonPage, IonRadio, IonReorder, IonReorderGroup, IonTitle, IonToggle, IonToolbar, useIonAlert, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { useState } from 'react';
import { WorkoutsSave } from '../services/WorkoutsSave';
import { Workout } from "../services/Workout";
import './Workouts.css';
import { useConstructor } from '../services/CustomHooks';
import React from 'react';
import DeleteWorkoutPrompt from '../components/DeleteWorkoutPrompt';


class Workouts extends React.Component {

  state = {
    showModal: false,
    workouts: [] as Workout[],
    isDeletePromptOpen: false,
    deletePromptWorkout: Workout.Empty
  }

  constructor(props: {} | Readonly<{}>) {
    super(props);

    WorkoutsSave.Instance.attachOnWorkoutsModified(event => {
      this.setWorkoutsFromSave();
    });
  }

  setWorkoutsFromSave() {
    this.setState(
      {
        workouts: WorkoutsSave.Instance.workouts
      });
  }

  buildWorkoutsList(workouts: Workout[]) {
    const output: JSX.Element[] = [];

    for (var i = 0; i < workouts.length; i++) {
      const workout = workouts[i];

      output.push(<IonItem key={workout.name}> {/*need key property to avoid this https://sentry.io/answers/unique-key-prop/*/}
        <IonLabel>{workout.name}</IonLabel>
        <IonLabel className="ion-text-center">{workout.duration}</IonLabel>
        <IonLabel class="ion-text-right">
          <IonButton routerLink={"/edit-workout/" + workouts.indexOf(workout)} color="secondary">edit</IonButton>
          <IonButton onClick={() => this.showDeleteWorkoutPrompt(workout)} color="danger">delete</IonButton>
        </IonLabel>
      </IonItem>);
    }

    return output;
  }

  showModal(active: boolean) {
    this.setState({ showModal: active });
  }

  showDeleteWorkoutPrompt(workout: Workout) {
    this.setState({
      isDeletePromptOpen: true,
      deletePromptWorkout: workout
    });
  }

  closeDeleteWorkoutPrompt() {
    this.setState({
      isDeletePromptOpen: false
    });
  }

  render() {
    const workoutsList: JSX.Element[] = this.buildWorkoutsList(this.state.workouts);


    return (
      <IonPage>
        <IonContent fullscreen>
          <h1 className="ion-text-center">
            My workouts
          </h1>

          <IonList>
            <IonListHeader class="list-header">
              <IonLabel><b>Name</b></IonLabel>
              <IonLabel className="ion-text-center"><b>Duration</b></IonLabel>
              <IonLabel class="ion-text-right"><b>Actions</b></IonLabel>
            </IonListHeader>

            {workoutsList}

            <IonButton expand="block" onClick={() => this.showModal(true)}>Create a new workout</IonButton>

            <DeleteWorkoutPrompt isOpen={this.state.isDeletePromptOpen} workout={this.state.deletePromptWorkout} onDismiss={() => this.closeDeleteWorkoutPrompt()} />

            <IonModal isOpen={this.state.showModal} cssClass='workout-name'>

              <IonList>
                <IonListHeader>
                  <h2 className="ion-text-center">Let's give a name to your new workout!</h2>
                </IonListHeader>

                <IonItem>
                  <IonLabel>Workout name</IonLabel>
                  <IonInput placeholder="Enter name" clearInput></IonInput>
                </IonItem>

                <IonItem className="ion-text-center">

                  <IonButton color="success" onClick={() => this.showModal(false)}>Create</IonButton>
                  <IonButton color="danger" onClick={() => this.showModal(false)}>Cancel</IonButton>
                </IonItem>
              </IonList>
            </IonModal>
          </IonList>

        </IonContent>
      </IonPage>
    );
  }
}

export default Workouts;