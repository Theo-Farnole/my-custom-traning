import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabButton, IonButton, IonIcon, IonLabel, IonItem, IonSelect, IonSelectOption, IonText, IonImg } from '@ionic/react';
import './Home.css';
import { WorkoutsSave } from '../services/WorkoutsSave';
import { Workout } from '../services/Workout';

class Home extends React.Component {

  state = {
    selectOptions: []
  }

  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.setSelectOptions();
    WorkoutsSave.Instance.attachOnWorkoutsModified(() => this.setSelectOptions());
  }

  setSelectOptions() {
    const workouts = WorkoutsSave.Instance.workouts;
    var selectOptions = [];

    for (var i = 0; i < workouts.length; i++) {
      selectOptions.push(<IonSelectOption key={i} value={i}>{workouts[i].name}</IonSelectOption>)
    }

    this.setState({ selectOptions: selectOptions });

    console.log(selectOptions);
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
            <IonSelect value="Select" placeholder="Select One">
              {this.state.selectOptions}
            </IonSelect>
          </IonItem>

          <div className="ion-text-center">
            <IonButton expand="block" color="primary" className="ion-text-center">
              <IonLabel>Start workout</IonLabel>
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default Home;
