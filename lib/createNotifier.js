// @flow

import { batchedSubscribe } from 'redux-batched-subscribe'

const createNotifier = () => {
  let notifyAnimationFrame = null
  return batchedSubscribe(debounce({ wait: 5, method: (notify) => {
    if (notifyAnimationFrame) {
      return
    }
    notifyAnimationFrame = requestAnimationFrame(() => {
      notifyAnimationFrame = null
      console.group('Notifying store updates')
      console.time('Store update render time')
      notify()
      console.timeEnd('Store update render time')
      console.groupEnd()
    })
  }}))
}

export default createNotifier


const debounce = ({ wait, method }) => {
  let timeout
  return (...args: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => method(...args), wait)
  }
}
