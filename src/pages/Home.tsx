import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import PointsCounterHome from "../components/PointsCounterHome";
import PointsProgress from "../components/PointsProgress";

const App = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PointsCounterHome />
        <PointsProgress />
        
      </IonContent>
    </IonPage>
  );
};

export default App;
