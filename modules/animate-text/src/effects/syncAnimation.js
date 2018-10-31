export default class SyncAnimation {
  constructor() {
    if (!window.SyncAnimationGroup) {
      this.animationGroups = []
      document.addEventListener(
        'visibilitychange',
        () => {
          if (document.hidden) {
            this.animationGroups.forEach(({ group, onBlur }) =>
              group.forEach(onBlur)
            )
          } else {
            this.animationGroups.forEach(({ group, onFocus }) =>
              group.forEach(onFocus)
            )
          }
        },
        false
      )
      window.SyncAnimationGroup = this
    }
    return window.SyncAnimationGroup
  }

  createAnimationGroup(onBlur, onFocus) {
    const animationGroup = { group: [], onBlur, onFocus }
    this.animationGroups.push(animationGroup)
    return {
      push(...anime) {
        animationGroup.group.push(...anime)
      }
    }
  }

  static of() {
    return new SyncAnimation()
  }
}
