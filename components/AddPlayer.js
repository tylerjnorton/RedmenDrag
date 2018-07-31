import React from "react";

export default class AddPlayer extends React.Component {
  fileInput = React.createRef();
  state = { playerName: "" };
  handleSubmit = async event => {
    event.preventDefault();
    const playersCollection = firebase.firestore().collection("players");
    const playerRef = await playersCollection.doc();

    const fileRef = firebase
      .storage()
      .ref()
      .child(playerRef.id);

    const uploadProgress = fileRef.put(this.fileInput.current.files[0]);

    uploadProgress.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        this.setState(state => ({
          ...state,
          uploading: true,
          progress
        }));
      },
      error => console.error(error),
      () => {
        playerRef.set({ playerName: this.state.playerName });
        this.setState(state => ({
          ...state,
          uploading: false,
          progress: null,
          playerName: ""
        }));

        this.fileInput.current.value = "";
      }
    );
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Add a player</h2>
        <p>
          Give a name then pick the file. Players are displayed below alphabetically. Check them off to add them to the pitch.
        </p>

        <input
          type="text"
          id="playerNameInput"
          name="name"
          required
          placeholder="Player Name"
          value={this.state.playerName}
          onChange={({ target }) =>
            this.setState(state => ({
              ...state,
              playerName: target.value
            }))
          }
        />
        <input
          id="uploadInput"
          type="file"
          name="photo"
          required
          ref={this.fileInput}
          accept="image/png, image/jpeg, image/jpg"
        />
        <br />
        <br />
        <button id="addPlayerBtn" disabled={this.state.uploading}>
          {this.state.uploading ? "Saving..." : "Add Player"}
        </button>
      </form>
    );
  }
}
