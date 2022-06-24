import io from "socket.io-client";
import EVENT_TYPES from "../events/index";

const socket = io.connect(process.env.SOCKET_SERVER, {
  reconnectionDelay: 0,
  transports: ["websocket"]
});

export default ({ app, router, store, Vue }) => {
  for (let TYPE in EVENT_TYPES) {
    socket.on(TYPE, payload => {
      store.commit(EVENT_TYPES[TYPE], payload);
    });
  }

  Vue.prototype.$socket = socket;
};

export { socket };