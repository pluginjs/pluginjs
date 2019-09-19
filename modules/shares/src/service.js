export default service => {
  service.popup = true
  service.click = service.click || (() => true)
}
