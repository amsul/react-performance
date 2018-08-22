// @flow

import * as React from 'react'
import * as ReactRedux from 'react-redux'
import measure from './components/measure'


type ConnectType = ({
  mapStateToProps?: Function,
  mapDispatchToProps?: Function,
  mergeProps?: Function,
  options?: Object,
  getId: string | Object => string,
  Component: React.ComponentType<*>,
  isCollapsed?: boolean,
}) => React.ComponentType<*>

const connect: ConnectType = ({
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  options,
  getId,
  Component,
  isCollapsed,
}) => ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(
  measure({ getId, Component, isCollapsed })
)

export default connect
