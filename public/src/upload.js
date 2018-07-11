const [uploadInput, addPlayerBtn, playerNameInput, redmenList] = [
  "#uploadInput",
  "#addPlayerBtn",
  "#playerNameInput",
  "#redmenList"
].map(str => document.querySelector(str));

const playersCollection = firebase.firestore().collection("players");

uploadInput.addEventListener("change", event => {
  console.log(event.target.files);
});

addPlayerBtn.addEventListener("click", async event => {
  const playerName = playerNameInput.value.trim();
  const file = uploadInput.files && uploadInput.files[0];

  if (!playerName || !file) {
    alert("Missing Data");
    return;
  }

  const playerRef = await playersCollection.doc();

  const fileRef = firebase
    .storage()
    .ref()
    .child(playerRef.id);

  const uploadProgress = fileRef.put(file);

  uploadProgress.on(
    "state_changed",
    snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      addPlayerBtn.setAttribute("disabled", true);
      addPlayerBtn.innerText = "Uploading...";
      console.log(`Upload Progress: ${progress}%`);
    },
    error => console.error(error),
    () => {
      playerRef.set({ playerName });
      playerNameInput.value = "";
      uploadInput.value = "";
      addPlayerBtn.setAttribute("disabled", true);
      addPlayerBtn.innerText = "Add Player";
    }
  );
});

playersCollection.orderBy("playerName").onSnapshot(snap => {
  snap.docChanges().forEach(async change => {
    if (change.type === "added") {
      const { playerName } = change.doc.data();
      console.log(playerName);
      const li = document.createElement("li");
      const img = document.createElement("img");
      const span = document.createElement("span");

      redmenList.appendChild(li);

      const url = await firebase
        .storage()
        .ref()
        .child(change.doc.id)
        .getDownloadURL();

      img.src = url;
      span.innerText = playerName;

      li.appendChild(img);
      li.appendChild(span);
    }
  });
});
