import { IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonPage, IonRadio, IonReorder, IonReorderGroup, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { pizza, star } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Workouts.css';

const Workouts: React.FC = () => {
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

          <IonButton expand="block">Create a new workout</IonButton>
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Workouts;
