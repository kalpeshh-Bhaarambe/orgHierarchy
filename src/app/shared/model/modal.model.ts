export interface ModalDetails {
  type: string;
  title: string;
  subText: string;
  btnCancel: string;
  btnAction: string;
}

export const initialModalDetails: ModalDetails = {
  type: '',
  title: '',
  subText: '',
  btnCancel: '',
  btnAction: '',
};
