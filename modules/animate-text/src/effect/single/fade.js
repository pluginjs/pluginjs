export default translate => ({ target, duration, loop, delay }) => ({
  targets: target,
  ...translate,
  opacity: 0,
  duration: duration || 2000,
  easing: 'linear',
  direction: 'reverse',
  loop: loop || false,
  delay
})
