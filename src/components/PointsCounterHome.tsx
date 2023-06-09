// App.tsx
import { useQuery } from "@tanstack/react-query";
import PointsCounter from "../components/PointsCounter";
import CongratulationsModal from "../components/CongratulationsModal";
import { useEffect } from "react";
import {
  IonButton,
} from "@ionic/react";
import { confetti } from "tsparticles-confetti";
import { usePoints } from "../context/PointsContext";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const fetchPoints = async () => {
  return getRandomInt(0, 10000);
};

const PointsCounterHome = () => {
  const { data, refetch } = useQuery(["points"], fetchPoints);
  const { state, send } = usePoints();

  useEffect(() => {
    if (data) {
      send({ type: "UPDATE_POINTS", points: data });
    }
  }, [data, send]);

  const handleDismiss = () => {
    send("DISMISS");
  };

  const handleAnimationCompleted = () => {
    send("ANIMATION_COMPLETE");
    // Only show confetti if we counted up
    if ((state.context.currNumber || 0) > (state.context.prevNumber || 0)) {
      confetti({
        particleCount: 250,
        angle: 120,
        spread: 55,
        startVelocity: 55,
        disableForReducedMotion: true,
        origin: { x: 1, y: 1 },
        colors: ["#FCBC05", "#13A538", "#FCBC05", "#13A538"],
      });
      confetti({
        particleCount: 250,
        angle: 60,
        spread: 55,
        startVelocity: 55,
        disableForReducedMotion: true,
        origin: { x: 0, y: 1 },
        colors: ["#FCBC05", "#13A538", "#FCBC05", "#13A538"],
      });
    }
  };

  return (
    <>
      <PointsCounter
        from={state.context.prevNumber || 0}
        to={state.context.currNumber || 0}
        play={state.matches("animation")}
        onAnimationComplete={handleAnimationCompleted}
      />
      <CongratulationsModal
        showModal={state.matches("congrats")}
        onDismiss={handleDismiss}
        points={
          (state.context.currNumber || 0) - (state.context.prevNumber || 0)
        }
      />
      <IonButton onClick={() => refetch()} size='small' expand="full">Re-fetch Points</IonButton>
    </>
  );
};

export default PointsCounterHome;
