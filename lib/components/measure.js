// @flow

import * as React from 'react'
import * as utils from '../utils'


let isRecording = false
let record = {}


type MeasureType = ({
  getId: string | (props: Object) => string,
  Component: React.ComponentType<*>,
  isCollapsed?: boolean,
}) => React.ComponentType<*>


const measure: MeasureType = ({ getId, Component, isCollapsed = true }) => {
  if (!process || !process.env || process.env.NODE_ENV !== 'development') {
    return Component
  }
  class Measured extends React.Component<*> {

    render() { return <Component {...this.props} /> }



    identifier = '<<unidentified>>'
    recordIdentifier = '<<unidentified>>'
    renderStartedAt = 0
    renderEndedAt = 0



    componentWillMount() {
      this.identifier = utils.getIdentifier({ element: this, getId })
      this.recordIdentifier = `${componentName}: ${this.identifier}`
      this.recordReset()
      this.startTimer()
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
      this.groupStart(hasChanges, 'Rendered %o', componentName)
      this.endTimer()
      this.logChanges(changeDetails)
      this.groupEnd()
      this.recordUpdate(hasChanges)
    }



    startRecording() {
      isRecording = true
      this.recordReset()
    }
    printRecording() {
      isRecording = false
      console.table(record)
      this.recordReset()
    }
    recordReset() {
      // $FlowFixMe
      const ownerName = this._reactInternalFiber._debugOwner.type.name
      record[this.recordIdentifier] = {
        'Owner > component': `${ownerName} > ${componentName}`,
        'Wasted time (ms)': 0,
        'Wasted renders': 0,
        'Renders': 0,
      }
    }
    recordUpdate(hasChanges) {
      if (!isRecording) {
        return
      }
      record[this.recordIdentifier]['Renders'] += 1
      if (!hasChanges) {
        record[this.recordIdentifier]['Wasted renders'] += 1
        record[this.recordIdentifier]['Wasted time (ms)'] += this.renderEndedAt - this.renderStartedAt
      }
    }



    getTimerText() {
      return [
        `Identifier: ${this.identifier}`,
        'Render time',
      ].join('\n')
    }
    startTimer() {
      this.renderStartedAt = Date.now()
      const timerText = this.getTimerText()
      console.time(timerText)
      if (this.props._isProfilingPerf) {
        console.profile(timerText)
      }
    }
    endTimer() {
      this.renderEndedAt = Date.now()
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
