// CongratulationsModal.tsx
import { IonModal, IonButton } from "@ionic/react";
import { useRef } from "react";

interface CongratulationsModalProps {
  showModal: boolean;
  onDismiss: () => void;
  points: number;
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({
  showModal,
  onDismiss,
  points,
}) => {
  const modal = useRef<HTMLIonModalElement>(null);
  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={onDismiss}
      trigger="open-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      ref={modal}
    >
      <div className="block">
        <p>Congratulations you have earned {points} points</p>
        <IonButton onClick={onDismiss}>Dismiss</IonButton>
      </div>
    </IonModal>
  );
};

export default CongratulationsModal;
