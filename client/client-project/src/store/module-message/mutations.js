export function loading(state, payload) {
  state.loading = payload;
}

export function message(state, payload) {
  state.loading = false;
  if (!payload || payload.error) {
    console.error('OOPS! An error occured.')
  }
  state.messages.push(payload);
}
