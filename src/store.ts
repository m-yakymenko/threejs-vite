export const store = new Proxy({
  turnOnDotsConnectorMode: false,
}, {
  get(target, prop, receiver) {
    return Reflect.get(target, prop, receiver);
  },
  set(obj, prop, value) {
    return Reflect.set(obj, prop, value)
  },
})
