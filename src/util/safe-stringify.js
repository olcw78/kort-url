/** @param {WeakSet<string, *>} seen */
function circularReferenceReplacer(seen) {
  return function (_, v) {
    if (typeof v !== 'object' || !v) {
      return v
    }

    if (seen.has(v)) {
      return '[circular]'
    }

    seen.add(v)

    return v
  }
}

/**
 *
 * @param {object} obj
 * @param {{ indentation: number }} opt
 * @returns
 */
module.exports = function safeStringify(obj, opt = null) {
  const seen = new WeakSet()
  return JSON.stringify(obj, circularReferenceReplacer(seen), opt?.indentation)
}
