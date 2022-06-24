import io from "socket.io-client";
import EVENT_TYPES from "../events/index";

const socket = io.connect("http://localhost:3333", {
  reconnectionDelay: 0,
  transports: ["websocket"]
});

export default ({ app, router, store, Vue }) => {
  for (let TYPE in EVENT_TYPES) {
    socket.on(TYPE, payload => {
      store.commit(EVENT_TYPES[TYPE], payload);
    });
  }
  app.provide('$socket', socket);
};

export { socket };