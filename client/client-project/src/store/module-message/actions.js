import { socket } from "boot/socketio";

export function createMessage({ commit }, payload) {
  try {
    console.log('create', payload)
    socket.emit("createMessage", payload);
  } catch (error) {
    commit("loading", false);
    return false;
  }
}