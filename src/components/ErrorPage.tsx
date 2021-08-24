import { IonButton, IonContent, IonFooter, IonPage } from "@ionic/react";


interface ErrorPageProps {
  err: any;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ err }) => {
  return (<IonPage className="ion-text-center">
    <IonContent className="ion-text-center">
      <h1>An error happened</h1>
      <p>Sorry! Our application has issue a problem.</p>
      <p>Please return home with the button below.</p>
      <IonButton expand="block" routerLink="/home">Return home</IonButton>
    </IonContent>

    <IonFooter>
      <h2>More info 🧐</h2>
      <p><i>{err}</i></p>
    </IonFooter>
  </IonPage>);
};

export default ErrorPage;
