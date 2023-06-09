import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import PointsCounterFivers from "../components/PointsCounterFivers";

const App = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fivers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Fivers</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PointsCounterFivers />
      </IonContent>
    </IonPage>
  );
};

export default App;
