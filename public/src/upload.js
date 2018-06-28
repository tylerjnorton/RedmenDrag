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

  const playerRef = await playersCollection.add({
    playerName
  });

  const fileRef = firebase
    .storage()
    .ref()
    .child(playerRef.id);
  await fileRef.put(file);
});

playersCollection.onSnapshot(querySnapshot => {
  while (redmenList.firstElementChild) {
    redmenList.firstElementChild.remove();
  }
  console.log(
    querySnapshot.forEach(async doc => {
      const { playerName, id } = doc.data();
      const li = document.createElement("li");
      const img = document.createElement("img");
      const span = document.createElement("span");

      const url = await firebase
        .storage()
        .ref()
        .child(doc.id)
        .getDownloadURL();

      img.src = url;
      span.innerText = playerName;

      li.appendChild(img);
      li.appendChild(span);

      redmenList.appendChild(li);
    })
  );
});
