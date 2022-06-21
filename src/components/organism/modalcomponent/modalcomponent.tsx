import React from "react";
import { Modal } from "antd";
import "antd/dist/antd.css";

interface ModalComponentProps {
  isOpen: boolean;
  children: React.ReactNode;
  closeModal: () => void;
  title: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  children,
  closeModal,
  title,
}) => {
  return (
    <div>
      <Modal
        visible={isOpen}
        title={title}
        onCancel={closeModal}
        footer={false}
      >
        {children}
      </Modal>
    </div>
  );
};

export default ModalComponent;
