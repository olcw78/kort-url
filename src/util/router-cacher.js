'use strict'
const Layer = require('express/lib/router/layer')
const Router = require('express/lib/router')

const last = (arr = []) => arr[arr.length - 1]

function copyFnProps(oldFn, newFn) {
  for (const k of Object.keys(oldFn)) {
    newFn[k] = oldFn[k]
  }
  
  Object.keys(oldFn).forEach(k => {})

  return newFn
}

/** @param {Function} fn  */
function wrap(fn) {
  const newFn = function newFn(...args) {
    const ret = fn.apply(this, args)
    const next =
      (args.length === 5 ? args[2] : last(args)) || Function.prototype

    if (ret && ret['catch']) {
      ret['catch']((err) => next(err))
    }

    return ret
  }

  Object.defineProperty(newFn, 'length', {
    value: fn.length,
    writable: false,
  })

  return copyFnProps(fn, newFn)
}

function patchRouterParam() {
  const { param: origParam } = Router.prototype.constructor
  Router.prototype.constructor.param = function param(name, fn) {
    fn = wrap(fn)
    return origParam.call(this, name, fn)
  }
}

Object.defineProperty(Layer.prototype, 'handle', {
  enumerable: true,
  get() {
    return this.__handle
  },
  set(fn) {
    fn = wrap(fn)
    this.__handle = fn
  },
})

patchRouterParam()
