export default ({ target, duration, loop, delay }) => {
  target.style.transformOrigin = 'top center'
  return {
    targets: target,
    rotateZ: [15, -10, 5, -5, 0],
    duration: duration || 2000,
    easing: 'linear',
    direction: 'reverse',
    loop: loop || false,
    delay
  }
}
