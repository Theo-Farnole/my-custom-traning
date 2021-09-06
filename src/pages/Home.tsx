import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelectOption, IonButtons, IonMenuButton, IonButton, IonIcon } from '@ionic/react';
import './Home.css';
import { WorkoutsSave } from '../services/WorkoutsSave';
import WorkoutsList from '../components/home/WorkoutsList';
import { AdsPlayer } from '../services/AdsPlayer';
import CreateWorkoutButton from '../components/home/CreateWorkoutButton';
import { settingsOutline, settingsSharp, barbellOutline, barbellSharp } from 'ionicons/icons';
import { AudioPlayer } from '../services/AudioPlayer';

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
            <IonTitle>My Workouts</IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink="/settings/" >
                <IonIcon icon={settingsOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonButton expand="full" onClick={() => AudioPlayer.PlayTimerEnded()}>Play sound</IonButton>

          <WorkoutsList />
          <CreateWorkoutButton />
        </IonContent>
      </IonPage>
    );
  }
}

export default Home;
