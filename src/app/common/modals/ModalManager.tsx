import LoginForm from "../../../auth/LoginForm";
import RegisterForm from "../../../auth/RegisterForm";
import TestModal from "../../../features/scratch/TestModal";
import { useAppSelector } from "../../store/store";

function ModalManager() {
  const modalLookUp = {
    TestModal,
    LoginForm,
    RegisterForm,
  };

  const { type, data, open } = useAppSelector((state) => state.modal);

  let renderModal;

  if (open && type) {
    const ModalComponent = (modalLookUp as any)[type];
    renderModal = <ModalComponent data={data} />;
  }

  return <div>{renderModal}</div>;
}
export default ModalManager;
