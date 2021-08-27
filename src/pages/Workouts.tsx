import { IonAlert, IonButton, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonLoading, IonModal, IonPage, IonRadio, IonReorder, IonReorderGroup, IonTitle, IonToggle, IonToolbar, useIonAlert, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { useState } from 'react';
import { WorkoutsSave } from '../services/WorkoutsSave';
import { Workout } from "../services/Workout";
import './Workouts.css';
import { useConstructor } from '../services/CustomHooks';
import React from 'react';
import DeleteWorkoutPrompt from '../components/prompt/DeleteWorkoutPrompt';
import CreateWorkoutPrompt from '../components/prompt/CreateWorkoutPrompt';
import WorkoutItem from '../components/WorkoutItem';
import { arrowForwardCircle, add } from 'ionicons/icons';
import CreateWorkoutButton from '../components/CreateWorkoutButton';


class Workouts extends React.Component {

  state = {
    workouts: [] as Workout[]
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

      output.push(<WorkoutItem editID={i} workout={workout} />)
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
              <IonLabel class="ion-text-right"><b>Actions</b></IonLabel>
            </IonListHeader>

            {workoutsList}
          </IonList>

          <CreateWorkoutButton />
        </IonContent>
      </IonPage >
    );
  }
}

export default Workouts;