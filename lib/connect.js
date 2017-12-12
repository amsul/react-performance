// @flow

import * as React from 'react'
import * as ReactRedux from 'react-redux'
import measure from './components/measure'


type ConnectType = ({
  mapStateToProps?: Function,
  mapDispatchToProps?: Function,
  getId: string | Object => string,
  Component: React.ComponentType<*>,
  isCollapsed?: boolean,
}) => React.ComponentType<*>

const connect: ConnectType = ({
  mapStateToProps,
  mapDispatchToProps,
  getId,
  Component,
  isCollapsed,
}) => ReactRedux.connect(mapStateToProps, mapDispatchToProps)(
  measure({ getId, Component, isCollapsed })
)

export default connect
