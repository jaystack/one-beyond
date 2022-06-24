export function loading(state, payload) {
  state.loading = payload;
}

export function joinPlayer(state, payload) {
  console.log("joinPlayer:", payload);
  state.loading = false;
  if (!payload || payload.error) {
    console.error('OOPS! An error occured.')
  }
  Object.assign(state, payload);
}

export function getPlayers(state, payload) {
  console.log("getPlayers:", payload);
  state.loading = false;
  if (!payload || payload.error) {
    console.error('OOPS! An error occured.')
  }
  Object.assign(state, payload);
}