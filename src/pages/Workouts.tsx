import { IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonModal, IonPage, IonRadio, IonReorder, IonReorderGroup, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { pizza, star } from 'ionicons/icons';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Workouts.css';

const Workouts: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

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

          <IonItem>
            <IonLabel>Morning Workout</IonLabel>
            <IonLabel className="ion-text-center">10m30s</IonLabel>
            <IonLabel class="ion-text-right">
              <IonButton color="secondary">edit</IonButton>
              <IonButton color="danger">delete</IonButton>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>Fast Workout</IonLabel>
            <IonLabel className="ion-text-center">5m00s</IonLabel>
            <IonLabel class="ion-text-right">
              <IonButton color="secondary">edit</IonButton>
              <IonButton color="danger">delete</IonButton>
            </IonLabel>
          </IonItem>

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
