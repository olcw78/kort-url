module.exports = function freezeRecursive(obj) {
  const $obj = Object.freeze(obj)

  for (const [_, v] of Object.entries($obj)) {
    if (typeof v === 'object') {
      return freezeRecursive(v)
    }
  }

  return $obj
}
