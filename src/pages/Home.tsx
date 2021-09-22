import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelectOption, IonButton, IonLabel } from '@ionic/react';
import './Home.css';
import { WorkoutsSave } from '../services/WorkoutsSave';
import WorkoutsList from '../components/home/WorkoutsList';
import CreateWorkoutButton from '../components/home/CreateWorkoutButton';
import { Insomnia } from '@ionic-native/insomnia';

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
            {/* <IonButtons slot="end">
              <IonButton routerLink="/settings/" >
                <IonIcon icon={settingsOutline} />
              </IonButton>
            </IonButtons> */}
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <div className="home-content">
            <WorkoutsList />
          </div>


          {/* <IonButton onclick="window.plugins.insomnia.allowSleepAgain()">allow sleep again</IonButton> */}

          <IonLabel hidden={(WorkoutsSave.Instance.areWorkoutsLoaded && WorkoutsSave.Instance.workouts.length > 0)} className="center ion-text-center">
            There is no workout routines 😢<br />
          </IonLabel>

          <CreateWorkoutButton />
        </IonContent>
      </IonPage>
    );
  }
}

export default Home;
