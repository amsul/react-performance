// @flow

import * as React from 'react'
import * as utils from '../utils'


type MeasureType = ({
  getId: string | (props: Object) => string,
  Component: React.ComponentType<*>,
  isCollapsed?: boolean,
}) => React.ComponentType<*>

type MeasuredStateType = {
  identifier: string,
  isRecording: boolean,
}


const measure: MeasureType = ({ getId, Component, isCollapsed = true }) => {
  // if (!__DEV__) {
  //   return Component
  // }
  class Measured extends React.Component<*, MeasuredStateType> {

    render() { return <Component {...this.props} /> }



    state = {
      identifier: '',
      isRecording: false,
    }



    componentWillMount() {
      const nextState = {
        identifier: utils.getIdentifier({ element: this, getId })
      }
      this.startTimer(nextState)
      this.setState(nextState)
    }
    componentDidMount() {
      this.groupStart(true, 'Mounted %o', componentName)
      this.endTimer()
      this.groupEnd()
    }
    componentWillUpdate() {
      this.startTimer()
    }
    componentDidUpdate(prevProps, prevState) {
      const changeDetails = utils.getChangeDetails({
        object: this.props,
        prevObject: prevProps,
      })
      const hasChanges = !!changeDetails.length
      if (prevState.isRecording && this.state.isRecording) {
        this.recordUpdate(hasChanges)
      }
      this.groupStart(hasChanges, 'Rendered %o', componentName)
      this.endTimer()
      this.logChanges(changeDetails)
      this.groupEnd()
    }



    renderCount = 0
    wastedRenderCount = 0
    startRecording() {
      this.setState({ isRecording: true })
    }
    printRecording() {
      this.setState({ isRecording: false })
      console.table({
        'Component name': componentName,
        'Renders': this.renderCount,
        'Wasted renders': this.wastedRenderCount,
      })
      this.renderCount = 0
      this.wastedRenderCount = 0
    }
    recordUpdate(hasChanges) {
      this.renderCount++
      if (!hasChanges) {
        this.wastedRenderCount++
      }
    }



    getTimerText(nextState = this.state) {
      return [
        `Identifier: ${nextState.identifier}`,
        'Render time',
      ].join('\n')
    }
    startTimer(nextState = this.state) {
      const timerText = this.getTimerText(nextState)
      console.time(timerText)
      if (this.props._isProfilingPerf) {
        console.profile(timerText)
      }
    }
    endTimer() {
      console.timeEnd(this.getTimerText())
      if (this.props._isProfilingPerf) {
        console.profileEnd()
      }
    }
    groupStart(hasChanges, ...args) {
      if (hasChanges && isCollapsed) {
        console.groupCollapsed(...args)
        return
      }
      console.group(...args)
    }
    groupEnd() {
      console.groupEnd()
    }



    logChanges(changeDetails) {
      if (!changeDetails.length) {
        console.log('🚨 %cWasted render %c(no changed props)', 'color: red', 'color: gray')
        return
      }
      changeDetails.forEach((changeDetail) => {
        console.log(
          'Changed prop %o: %o → %o',
          changeDetail.key,
          changeDetail.prevValue,
          changeDetail.value,
        )
      })
    }

  }


  const componentName = Component.displayName || Component.name
  Measured.displayName = `Measured(${componentName})`
  return Measured
}

export default measure
