export function getEventObject(event) {
  let e = event.originalEvent
  if (e.touches && e.touches.length && e.touches[0]) {
    e = e.touches[0]
  }

  return e
}
