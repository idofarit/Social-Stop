import { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalProps,
} from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { closeModal } from "./modalSlice";

type Props = {
  children: ReactNode;
  header?: string;
} & ModalProps;

function ModalWrapper({ children, header, ...props }: Props) {
  const { open } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  return (
    <Modal size={props.size} open={open} onClose={() => dispatch(closeModal())}>
      {header && <ModalHeader>{header}</ModalHeader>}
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}
export default ModalWrapper;
