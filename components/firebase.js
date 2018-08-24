import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

if (typeof window !== "undefined") {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(window.firebaseConfig);
  }
}

export function onAuthStateChange(onChange) {
  return firebase.auth().onAuthStateChanged(onChange);
}

export async function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const { user } = await firebase.auth().signInWithPopup(provider);

    const data = { ...user.providerData[0] };

    // console.log(data);

    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set(data);
  } catch (error) {
    console.warn(error);
  }
}

export function onPlayerChanged(user, onChange) {
  return firebase
    .firestore()
    .collection(`users/${user.uid}/players`)
    .onSnapshot(snap =>
      snap.docChanges.forEach(async ({ doc, type }) => {
        const url = await firebase
          .storage()
          .ref()
          .child(doc.id)
          .getDownloadURL();

        onChange(`player_${type}`, { ...doc.data(), id: doc.id, url });
      })
    );
}

export function addPlayer(user, playerName, file) {
  return new Promise(resolve => {
    const playerCollection = firebase
      .firestore()
      .collection(`users/${user.uid}/players`);
    const playerRef = playerCollection.doc();

    const fileRef = firebase
      .storage()
      .ref()
      .child(playerRef.id);

    const uploadProgress = fileRef.put(file);

    uploadProgress.on(
      "state_changed",
      snap => {},
      err => console.error(err),
      () => resolve(playerRef.set({ playerName: playerName }))
    );
  });
}

export async function removePlayer(user, player) {
  await firebase
    .firestore()
    .collection(`users/${user.uid}/players`)
    .doc(player.id)
    .delete();
}

export async function modifyPlayer(user, player, isSelected) {
  await firebase
    .firestore()
    .collection(`users/${user.uid}/players`)
    .doc(player.id)
    .update({ isSelected });
}
