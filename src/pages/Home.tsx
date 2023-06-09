import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import PointsCounterHome from "../components/PointsCounterHome";
import PointsProgress from "../components/PointsProgress";
import { usePoints } from "../context/PointsContext";

const App = () => {
  const { state } = usePoints();
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
        <pre><code>{JSON.stringify(state, null, 2)}</code></pre>
      </IonContent>
    </IonPage>
  );
};

export default App;
