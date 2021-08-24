import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabButton, IonButton, IonIcon, IonLabel, IonItem, IonSelect, IonSelectOption, IonText, IonImg } from '@ionic/react';
import './Home.css';
import { WorkoutsSave } from '../services/WorkoutsSave';
import { Workout } from '../services/Workout';

class Home extends React.Component {

  state = {
    selectOptions: [],
    selectedWorkoutID: -1
  }

  constructor(props: {} | Readonly<{}>) {
    super(props);

    console.log("ctor");

    this.setSelectOptions();
    WorkoutsSave.Instance.attachOnWorkoutsModified(() => this.setSelectOptions());

    this.onSelectChange = this.onSelectChange.bind(this);
  }

  setSelectOptions() {
    const workouts = WorkoutsSave.Instance.workouts;
    var selectOptions = [];

    for (var i = 0; i < workouts.length; i++) {
      selectOptions.push(<IonSelectOption key={i} value={i}>{workouts[i].name}</IonSelectOption>)
    }

    this.setState({ selectOptions: selectOptions });
  }

  onSelectChange(e: { detail: { value: string; }; }) {
    this.setState(
      {
        selectedWorkoutID: parseInt(e.detail.value)
      });
    console.log(this.state.selectedWorkoutID);
  }

  render() {
    return (
      <IonPage>

        <IonContent fullscreen>

          <h1 className="ion-text-center">
            Custom Workouts
          </h1>

          <IonItem>
            <IonLabel>Select workout</IonLabel>
            <IonSelect value={this.state.selectedWorkoutID} onIonChange={this.onSelectChange} cancelText="Dismiss" okText="Select" interface="popover" multiple={false} placeholder="Select One">
              {this.state.selectOptions}
            </IonSelect>
          </IonItem>

          <div className="ion-text-center">
            <IonButton routerLink={"/play-exercise/" + this.state.selectedWorkoutID} expand="block" color="primary" className="ion-text-center">
              <IonLabel>Start workout</IonLabel>
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default Home;
