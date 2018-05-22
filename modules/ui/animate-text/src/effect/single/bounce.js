export default ({ target, duration, loop, delay }) => ({
  targets: target,
  scale: [1.2, 0.8, 1, 0.5],
  duration: duration || 2000,
  // easing: 'linear',
  direction: 'reverse',
  loop: loop || false,
  delay
})
