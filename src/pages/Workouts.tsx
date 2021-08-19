import { IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonLoading, IonModal, IonPage, IonRadio, IonReorder, IonReorderGroup, IonTitle, IonToggle, IonToolbar, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { useState } from 'react';
import { Workout, WorkoutsSave } from '../services/WorkoutsSave';
import './Workouts.css';


// source: https://dev.to/bytebodger/constructors-in-functional-components-with-hooks-280m
// this is a custom hook that mimic the constructor for a functional component
const useConstructor = (callBack = () => { }) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
}

const Workouts: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [workouts, setWorkouts] = useState(WorkoutsSave.Instance.workouts);

  const workouts_components: JSX.Element[] = buildWorkoutsComponent(workouts);

  // constructor equivalent
  useConstructor(() => {
    WorkoutsSave.Instance.attachOnWorkoutsModified(event => {
      setWorkouts(WorkoutsSave.Instance.workouts);
    });
  });


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

          <IonButton expand="block" onClick={() => setShowModal(true)}>Create a new workout</IonButton>

          <IonModal isOpen={showModal} cssClass='workout-name'>

            <IonList>
              <IonListHeader>
                <h2 className="ion-text-center">Let's give a name to your new workout!</h2>
              </IonListHeader>

              <IonItem>
                <IonLabel>Workout name</IonLabel>
                <IonInput placeholder="Enter name" clearInput></IonInput>
              </IonItem>

              <IonItem className="ion-text-center">

                <IonButton color="success" onClick={() => setShowModal(false)}>Create</IonButton>
                <IonButton color="danger" onClick={() => setShowModal(false)}>Cancel</IonButton>
              </IonItem>
            </IonList>
          </IonModal>
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Workouts;

function buildWorkoutsComponent(workouts: Workout[]) {
  const output: JSX.Element[] = [];

  workouts.forEach(element => {
    output.push(<IonItem key={element.name}> {/*need key property to avoid this https://sentry.io/answers/unique-key-prop/*/}
      <IonLabel>{element.name}</IonLabel>
      <IonLabel className="ion-text-center">{element.duration}</IonLabel>
      <IonLabel class="ion-text-right">
        <IonButton color="secondary">edit</IonButton>
        <IonButton color="danger">delete</IonButton>
      </IonLabel>
    </IonItem>);
  });

  return output;
}