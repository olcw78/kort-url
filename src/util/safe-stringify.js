/** @param {WeakSet<string, *>} seen */
function circularReferenceReplacer(seen) {
  return function (_, v) {
    if (typeof v !== 'object' || !v) {
      return v
    }

    if (seen.has(v)) {
      return '[circular]'
    }

    seen.set(v)

    const $v = Array.isArray(v) ? [] : {}

    for (const [k, _v] of Object.entries(v)) {
      $v[k] = circularReferenceReplacer(seen)(k, _v)
    }

    seen.delete(v)

    return v
  }
}

module.exports = function safeStringify(obj, { indentation } = null) {
  const seen = new WeakSet()
  return JSON.stringify(obj, circularReferenceReplacer(seen), indentation)
}
