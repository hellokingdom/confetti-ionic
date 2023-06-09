import { useEffect, useRef } from "react";
import { usePoints } from "../context/PointsContext";
import { useMotionValue, useTransform, animate, motion } from "framer-motion";
import PointsCounter from "./PointsCounter";

type CircularProgressProps = {
  value: number;
  animateFrom?: number; // Value to animate from
  play?: boolean; // Delays animation until play is true
};

const radius = 60;
const strokeWidth = 10;
const circumference = radius * 2 * Math.PI;
const totalDistance = (circumference * 2) / 3;
const threshold = 5000;

function CircularProgress({
  value,
  animateFrom = 0,
  play = true,
}: CircularProgressProps) {
  const ref = useRef<SVGCircleElement>(null);
  // Motion value with range [0,totalDistance]. Defaults to 0
  const distanceMotionValue = useMotionValue(
    totalDistance * (animateFrom / threshold)
  );
  // Motion value mapped to strokeDashOffset of the ring
  const dashOffset = useTransform(distanceMotionValue, (value) =>
    value >= circumference ? 0 : circumference - value
  );

  const data = totalDistance * (value / threshold);

  useEffect(() => {
    if (!play) return;
    if (ref.current) {
      animate(distanceMotionValue, data, { duration: 1 });
    }
  }, [distanceMotionValue, data, play]);

  return (
    <div style={{ transform: "rotate(140deg)" }}>
      <svg
        viewBox={`0 0 ${radius * 2} ${radius * 2} `}
        fill="green"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          stroke="black"
          strokeOpacity={0.3}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          r={radius - strokeWidth / 2}
          cx={radius}
          cy={radius}
          strokeDashoffset={circumference - totalDistance}
        />
        <motion.circle
          ref={ref}
          stroke="black"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference + " " + circumference}
          r={radius - strokeWidth / 2}
          cx={radius}
          cy={radius}
          strokeDashoffset={dashOffset}
        />
      </svg>
    </div>
  );
}

function getPointsUntilNextFiver(value: number | null) {
  return threshold - ((value || 0) % threshold);
}

function PointsProgress() {
  const { state, send } = usePoints();
  return (
    <>
      <div
        style={{
          overflow: "hidden",
          width: "100px",
          height: "100px",
          padding: "10px",
        }}
      >
        <CircularProgress
          value={threshold - getPointsUntilNextFiver(state.context.currNumber)}
          animateFrom={
            threshold - getPointsUntilNextFiver(state.context.prevNumber)
          }
          play={state.matches("animation")}
        />
      </div>
      <PointsCounter
        from={getPointsUntilNextFiver(state.context.prevNumber)}
        to={getPointsUntilNextFiver(state.context.currNumber)}
        play={state.matches("animation")}
        onAnimationComplete={() => {
          send("ANIMATION_COMPLETE");
        }}
      />{" "}
      points<br></br>until next Fiver
    </>
  );
}

export default PointsProgress;
