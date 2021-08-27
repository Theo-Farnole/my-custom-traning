import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabButton, IonButton, IonIcon, IonLabel, IonItem, IonSelect, IonSelectOption, IonText, IonImg, IonButtons, IonMenuButton } from '@ionic/react';
import './Home.css';
import { WorkoutsSave } from '../services/WorkoutsSave';
import { Workout } from '../services/Workout';
import WorkoutsList from '../components/WorkoutsList';
import CreateWorkoutPrompt from '../components/prompt/CreateWorkoutPrompt';
import CreateWorkoutButton from '../components/CreateWorkoutButton';

class Home extends React.Component {

  state = {
    selectOptions: [],
    selectedWorkoutID: -1
  }

  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.onSelectChange = this.onSelectChange.bind(this);
    this.setSelectOptions = this.setSelectOptions.bind(this);

    this.setSelectOptions();

  }

  componentDidMount() {
    if (WorkoutsSave.Instance.areWorkoutsLoaded) {
      this.setSelectOptions();
    }

    WorkoutsSave.Instance.attachOnWorkoutsModified(this.setSelectOptions);
  }

  componentWillUnmount() {
    WorkoutsSave.Instance.dettachOnWorkoutsModified(this.setSelectOptions);
  }

  setSelectOptions() {
    var selectOptions = [];

    try {

      const workouts = WorkoutsSave.Instance.workouts;

      for (var i = 0; i < workouts.length; i++) {
        selectOptions.push(<IonSelectOption key={i} value={i}>{workouts[i].name}</IonSelectOption>)
      }

    }
    catch (err) {
      // TODO: modify the layout to show a warning + disable selectOptions
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

        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Custom Workouts</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>


          <WorkoutsList />
          <CreateWorkoutButton />
        </IonContent>
      </IonPage>
    );
  }
}

export default Home;
