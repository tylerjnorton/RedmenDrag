import React from "react";

export default class Players extends React.Component {
  state = {
    players: {}
  };
  actions = {
    removePlayer: player => event =>
      firebase
        .firestore()
        .collection("players")
        .doc(player.id)
        .delete(),
    togglePlayerSelected: player => event =>
      firebase
        .firestore()
        .collection("players")
        .doc(player.id)
        .update({ isSelected: !player.isSelected })
  };
  handlePlayerRemoved = async doc => {
    this.setState(state => {
      delete state.players[doc.id];
      return {
        ...state,
        players: state.players
      };
    });
  };
  handlePlayerModified = async doc => {
    this.setState(state => ({
      ...state,
      players: {
        ...state.players,
        [doc.id]: {
          ...state.players[doc.id],
          ...doc.data(),
          id: doc.id
        }
      }
    }));
    const url = await firebase
      .storage()
      .ref()
      .child(doc.id)
      .getDownloadURL();
    this.setState(state => ({
      ...state,
      players: {
        ...state.players,
        [doc.id]: {
          ...state.players[doc.id],
          ...doc.data(),
          url
        }
      }
    }));
  };
  onSnapshot = snap => {
    snap.docChanges().forEach(async ({ doc, type }) => {
      switch (type) {
        case "added":
        case "modified":
          return this.handlePlayerModified(doc);
        case "removed":
          return this.handlePlayerRemoved(doc);
        default:
          console.warn("Not implemented", type);
      }
    });
  };
  componentDidMount() {
    firebase
      .firestore()
      .collection("players")
      .onSnapshot(this.onSnapshot);
  }
  render() {
    const players = Object.keys(this.state.players)
      .map(id => this.state.players[id])
      .sort((a, b) =>
        (a.playerName || "")
          .toLowerCase()
          .localeCompare((b.playerName || "").toLowerCase())
      );
    return this.props.children(players, this.actions);
  }
}
