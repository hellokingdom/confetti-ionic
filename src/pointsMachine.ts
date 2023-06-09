// machine.ts
import { createMachine, assign } from 'xstate';
import { saveState, loadState } from './localStorage';

interface PointsMachineContext {
  prevNumber: number | null;
  currNumber: number | null;
}

const pointsMachine = createMachine<PointsMachineContext>({
  id: 'points',
  initial: 'idle',
  context: {
    prevNumber: loadState('prevNumber') || null,
    currNumber: loadState('currNumber') || null,
  },
  states: {
    idle: {
      on: {
        UPDATE_POINTS: {
          target: 'checking',
          actions: assign((context, event) => {
            const newState = {
              prevNumber: context.currNumber,
              currNumber: event.points,
            };
            saveState('prevNumber', newState.prevNumber);
            saveState('currNumber', newState.currNumber);
            return newState;
          }),
        },
      },
    },
    checking: {
      on: {
        '': [
          {
            target: 'animation',
            cond: (context) => context.prevNumber !== null && (context.currNumber || 0) < (context.prevNumber || 0),
          },
          {
            target: 'idle',
            cond: (context) => context.prevNumber === null,
          },
          {
            target: 'congrats',
            cond: (context) => context.currNumber !== null && (context.currNumber || 0) > (context.prevNumber || 0),
          },
          {
            target: 'idle',
          },
        ],
      },
    },
    congrats: {
      on: {
        DISMISS: {
          target: 'animation',
        },
      },
    },
    animation: {
      on: {
        ANIMATION_COMPLETE: 'idle',
      },
    },
  },
});

export default pointsMachine;

