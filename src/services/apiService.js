import {database} from '../../Setup';

export const cadastrarGestante = (Id, Name, DOB, DUM, DPP, SisPreNatal, SUS, QntConsultas) => {
  return new Promise(function(resolve, reject) {
    let key;
    if (Id != null){
      key = Id;
    } else {
      key = database()
            .ref()
            .push().key;
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
      .then(snapshot => {
        resolve(snapshot);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export const listarGestantes = () => {
  return new Promise(function(resolve, reject) {
    let listGestantes = [];
    const gestantesRef = database().ref('gestantes/');

    gestantesRef.once('value')
    .then(snapshot => {
      snapshot.forEach(function (childSnapshot) {
        listGestantes = [...listGestantes, childSnapshot.val()];
      });
      resolve(listGestantes);
    }).catch((err) => reject(err));
  });
}