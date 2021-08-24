import { IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonLoading, IonModal, IonPage, IonRadio, IonReorder, IonReorderGroup, IonTitle, IonToggle, IonToolbar, useIonAlert, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { useState } from 'react';
import { WorkoutsSave } from '../services/WorkoutsSave';
import { Workout } from "../services/Workout";
import './Workouts.css';
import { useConstructor } from '../services/CustomHooks';
import React from 'react';


class Workouts extends React.Component {

  state = {
    showModal: false,
    workouts: [] as Workout[]
  }

  constructor(props: {} | Readonly<{}>) {
    super(props);

    WorkoutsSave.Instance.attachOnWorkoutsModified(event => {
      this.setState(
        { workouts: WorkoutsSave.Instance.workouts });
    });
  }

  buildWorkoutsComponent(workouts: Workout[]) {
    const output: JSX.Element[] = [];

    workouts.forEach(element => {
      output.push(<IonItem key={element.name}> {/*need key property to avoid this https://sentry.io/answers/unique-key-prop/*/}
        <IonLabel>{element.name}</IonLabel>
        <IonLabel className="ion-text-center">{element.duration}</IonLabel>
        <IonLabel class="ion-text-right">
          <IonButton routerLink={"/edit-workout/" + workouts.indexOf(element)} color="secondary">edit</IonButton>
          <IonButton color="danger" >delete</IonButton>
        </IonLabel>
      </IonItem>);
    });

    return output;
  }

  showModal(active: boolean) {
    this.setState({ showModal: active });
  }

  render() {
    const workouts_components: JSX.Element[] = this.buildWorkoutsComponent(this.state.workouts);

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

            {workouts_components}

            <IonButton expand="block" onClick={() => this.showModal(true)}>Create a new workout</IonButton>

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

