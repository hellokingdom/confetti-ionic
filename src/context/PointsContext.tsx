// PointsContext.tsx
import { createContext, useContext } from "react";
import { useMachine } from "@xstate/react";
import pointsMachine from "../pointsMachine";
import { StateFrom } from "xstate";

// Define the shape of our context
interface PointsContextShape {
  state: StateFrom<typeof pointsMachine>;
  send: (event: any) => void; // replace "any" with the specific event type you're using, if applicable
}

// Create context with default value
const PointsContext = createContext<PointsContextShape | undefined>(undefined);

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const [state, send] = useMachine(pointsMachine);
  return (
    <PointsContext.Provider value={{ state, send }}>
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error("usePoints must be used within a PointsProvider");
  }
  return context;
}
