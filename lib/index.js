// @flow

import { default as measure } from './components/measure'

export { default as measure } from './components/measure'

export default {
  measure,
}



//////////////
// NOTIFIER //
//////////////

export const createNotifier = () => {
  // let notifyAnimationFrame = null
  // return _.debounce((notify) => {
  //   if (notifyAnimationFrame) {
  //     return
  //   }
  //   notifyAnimationFrame = requestAnimationFrame(() => {
  //     notifyAnimationFrame = null
  //     console.group('Notifying store updates')
  //     console.time('Store update render time')
  //     notify()
  //     console.timeEnd('Store update render time')
  //     console.groupEnd()
  //   })
  // }, 5)
}



/////////////
// MEASURE //
/////////////

// type ConnectMeasuredType = ({
//   mapStateToProps?: Function,
//   mapDispatchToProps?: Function,
//   getId: string | Object => string,
//   Component: React.ComponentType<*>,
//   isCollapsed?: boolean,
// }) => React.ComponentType<*>

// export const connectMeasured: ConnectMeasuredType = ({
//   mapStateToProps,
//   mapDispatchToProps,
//   getId,
//   Component,
//   isCollapsed,
// }) => ReactRedux.connect(mapStateToProps, mapDispatchToProps)(
//   measure({ getId, Component, isCollapsed })
// )
