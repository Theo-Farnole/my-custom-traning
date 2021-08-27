import { IonAlert, IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonLoading, IonModal, IonPage, IonRadio, IonReorder, IonReorderGroup, IonTitle, IonToggle, IonToolbar, useIonAlert, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { useState } from 'react';
import { WorkoutsSave } from '../services/WorkoutsSave';
import { Workout } from "../services/Workout";
import './Workouts.css';
import { useConstructor } from '../services/CustomHooks';
import React from 'react';
import DeleteWorkoutPrompt from '../components/prompt/DeleteWorkoutPrompt';
import CreateWorkoutPrompt from '../components/prompt/CreateWorkoutPrompt';
import WorkoutItem from '../components/WorkoutItem';


class Workouts extends React.Component {

  state = {
    showModal: false,
    workouts: [] as Workout[],
    isDeletePromptOpen: false,
    deletePromptWorkout: Workout.Empty
  }

  isComponentedMounted: boolean = false;
  reloadWorkoutOnMounted: boolean = false;

  constructor(props: {} | Readonly<{}>) {
    super(props);

    WorkoutsSave.Instance.attachOnWorkoutsModified(event => {
      this.setWorkoutsFromSave();
    });
  }

  setWorkoutsFromSave() {
    if (this.isComponentedMounted == true) {
      this.setState(
        {
          workouts: WorkoutsSave.Instance.workouts
        });
    }
    else {
      this.reloadWorkoutOnMounted = true;
    }
  }

  buildWorkoutsList(workouts: Workout[]) {
    const output: JSX.Element[] = [];

    for (var i = 0; i < workouts.length; i++) {
      const workout = workouts[i];      

      output.push(<WorkoutItem editID={i} workout={workout}/>)
    }

    return output;
  }

  componentDidMount() {
    this.isComponentedMounted = true;

    if (this.reloadWorkoutOnMounted == true) {
      this.reloadWorkoutOnMounted = false;
      this.setWorkoutsFromSave();
    }

    if (WorkoutsSave.Instance.areWorkoutsLoaded) {
      this.setWorkoutsFromSave();
    }
  }

  componentWillUnmount() {
    this.isComponentedMounted = false;
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

  closeCreateNewWorkoutPrompt() {
    // close can be called when leaving this page, so we must add this security
    if (this.isComponentedMounted == true) {
      this.setState({
        showModal: false
      });
    }
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
            <CreateWorkoutPrompt isOpen={this.state.showModal} onDismiss={() => {
              this.closeCreateNewWorkoutPrompt()
            }} />
          </IonList>

        </IonContent>
      </IonPage >
    );
  }
}

export default Workouts;