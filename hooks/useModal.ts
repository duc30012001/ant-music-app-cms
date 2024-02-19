/* eslint-disable no-unused-vars */
import { useState } from 'react';

export type OpenModalProps<TypeModal, DataType> = (
  type: TypeModal,
  data: DataType | null
) => void;
export type CloseModalProps = () => void;

export interface ModalProps<TypeModal, DataType> {
  typeModal: TypeModal | null;
  dataEdit: DataType | null;
  openModal: OpenModalProps<TypeModal, DataType>;
  closeModal: CloseModalProps;
}

export const useModal = <TypeModal, DataType>(): ModalProps<
  TypeModal,
  DataType
> => {
  const [typeModal, setTypeModal] = useState<TypeModal | null>(null);
  const [dataEdit, setDataEdit] = useState<DataType | null>(null);

  function openModal(type: TypeModal, data: DataType | null) {
    setTypeModal(type);
    setDataEdit(data);
  }

  function closeModal() {
    setTypeModal(null);
    setDataEdit(null);
  }

  return {
    dataEdit,
    typeModal,
    openModal,
    closeModal,
  };
};
