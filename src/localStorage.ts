// localStorage.ts
export function saveState(key: string, state: any) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error('Could not save state', err);
    }
  }
  
  export function loadState(key: string) {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
      console.error('Could not load state', err);
      return undefined;
    }
  }