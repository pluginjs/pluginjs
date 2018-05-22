export default ({ target, duration, loop, delay }) => ({
  targets: target,
  scale: [1, 0],
  opacity: 0,
  duration: duration || 2000,
  easing: 'easeInOutQuart',
  direction: 'reverse',
  loop: loop || false,
  delay
})
