import firebase from "@firebase/app";
import "@firebase/database";

export const SET_FIELD = "SET_FIELD";
export const setField = (field, value) => {
  return {
    type: SET_FIELD,
    field,
    value
  };
};

export const saveSerie = serie => {
  const { currentUser } = firebase.auth();

  const db = firebase.database().ref(`/users/${currentUser.uid}/series`);

  console.log("aqui vamos salvar mnosadasd", serie);
};
