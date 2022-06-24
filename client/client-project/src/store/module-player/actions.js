import { socket } from "boot/socketio";

export function join({ commit }, payload) {
  try {
    socket.emit("joinPlayer", payload);
  } catch (error) {
    commit("loading", false);
    return false;
  }
}
export function getPlayers({ commit }, payload) {
  try {
    socket.emit("getPlayers", payload, (response) => {
      console.log(response);
    });
  } catch (error) {
    commit("loading", false);
    return false;
  }
}