import PointsCounter from "../components/PointsCounter";
import { usePoints } from "../context/PointsContext";

const PointsCounterFivers = () => {
  const { state } = usePoints();
  return (

      <PointsCounter
        from={state.context.prevNumber || 0}
        to={state.context.currNumber || 0}
        play={state.matches("animation")}
      />

  );
};

export default PointsCounterFivers;
