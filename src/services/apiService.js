import {database} from '../../Setup';

export const cadastrarGestante = (
  Id,
  Name,
  DOB,
  DUM,
  DPP,
  SisPreNatal,
  SUS,
  QntConsultas,
) => {
  return new Promise(function (resolve, reject) {
    let key;
    if (Id != null) {
      key = Id;
    } else {
      key = database().ref().push().key;
    }
    if (!QntConsultas) {
      QntConsultas = 0;
    }

    let dataToSave = {
      Id: key,
      Name: Name,
      DOB: DOB,
      DUM: DUM,
      DPP: DPP,
      SisPreNatal: SisPreNatal,
      SUS: SUS,
      QntConsultas: QntConsultas,
    };
    database()
      .ref('gestantes/' + key)
      .update(dataToSave)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const listarGestantes = () => {
  return new Promise(function (resolve, reject) {
    let listGestantes = [];
    const gestantesRef = database().ref('gestantes/');

    gestantesRef
      .once('value')
      .then((snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          listGestantes = [...listGestantes, childSnapshot.val()];
        });
        resolve(listGestantes);
      })
      .catch((err) => reject(err));
  });
};

export const listarExames = () => {
  return new Promise(function (resolve, reject) {
    let listExames = [];
    const examesRef = database().ref('exames/');

    examesRef
      .once('value')
      .then((snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          listExames = [...listExames, childSnapshot.val()];
        });
        resolve(listExames);
      })
      .catch((err) => reject(err));
  });
};

export const listarMedicos = () => {
  return new Promise(function (resolve, reject) {
    let listMedicos = [];
    const medicosRef = database().ref('medicos/');

    medicosRef
      .once('value')
      .then((snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          listMedicos = [...listMedicos, childSnapshot.val()];
        });
        resolve(listMedicos);
      })
      .catch((err) => reject(err));
  });
};

export const cadastrarMedicos = (Name, CRM) => {
  return new Promise(function (resolve, reject) {
    let key;
    key = database().ref().push().key;

    let dataToSave = {
      Id: key,
      Name: Name,
      CRM: CRM,
    };
    database()
      .ref('medicos/' + key)
      .update(dataToSave)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Exames realizados