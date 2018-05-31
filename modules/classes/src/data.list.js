// last:: [a] -> a
export const last = arr => arr.slice(-1)[0]

// head :: [a] -> a
export const head = arr => arr.slice(0, 1)[0]

// tail :: [a] -> [a]
export const tail = arr => arr.slice(1)

// init :: [a] -> [a]
export const init = arr => arr.slice(0, -1)

export const sum = arr => arr.reduce((a, b) => a + b)
