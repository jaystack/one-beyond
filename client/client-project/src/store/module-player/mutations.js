export function loading(state, payload) {
  state.loading = payload;
}

export function joinPlayer(state, payload) {
  console.log("joinPlayer:", payload);
  state.loading = false;
  if (!payload || payload.error) {
    console.error('OOPS! An error occured.')
  }
  state.player = payload;
}

export function getPlayers(state, payload) {
  state.loading = false;
  if (!payload || payload.error) {
    console.error('OOPS! An error occured.')
  }
  state.players = payload;
}