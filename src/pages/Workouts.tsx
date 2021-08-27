import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import CreateWorkoutButton from '../components/CreateWorkoutButton';
import WorkoutsList from '../components/WorkoutsList';


class Workouts extends React.Component {

  render() {
    return (
      <IonPage>
        <IonContent fullscreen>
          <h1 className="ion-text-center">
            My workouts
          </h1>

          <WorkoutsList />

          <CreateWorkoutButton />
        </IonContent>
      </IonPage >
    );
  }
}

export default Workouts;