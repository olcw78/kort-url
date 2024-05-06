module.exports = function freezeRecursive(obj) {
  const $obj = Object.freeze(obj)

  for (let [_, v] of Object.entries($obj)) {
    if (typeof v === 'object') {
      v = freezeRecursive(v)
    }
  }

  return $obj
}
