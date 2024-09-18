import TestModal from "../../../features/scratch/TestModal";
import { useAppSelector } from "../../store/store";

function ModalManager() {
  const modalLookUp = {
    TestModal,
  };

  const { type, data, open } = useAppSelector((state) => state.modal);

  let renderModal;

  if (open && type) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ModalComponent = (modalLookUp as any)[type];
    renderModal = <ModalComponent data={data} />;
  }

  return <div>{renderModal}</div>;
}
export default ModalManager;
