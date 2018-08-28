export default function stateable() {
  return function(plugin) {
    plugin.prototype.setupStates = function(states = {}) {
      this._states = states
    }

    // Checks whether the plugin is in a specific state or not.
    plugin.prototype.is = function(state) {
      if (this._states[state] && this._states[state] > 0) {
        return true
      }
      return false
    }

    // Enters a state.
    plugin.prototype.enter = function(state) {
      if (typeof this._states[state] === 'undefined') {
        this._states[state] = 0
      }

      // this._states[state]++;
      this._states[state] = 1
    }

    // Leaves a state.
    plugin.prototype.leave = function(state) {
      if (typeof this._states[state] === 'undefined') {
        this._states[state] = 0
      }

      // this._states[state]--;
      this._states[state] = 0
    }
  }
}
