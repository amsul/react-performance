import * as React from 'react'

import { measure } from './dist/react-performance'

class CustomComponent extends React.Component {
  render() {
    const {
      onPressStartStop,
      onPressWasted,
      onPressUseful,
      Br,
      Button,
      View,
    } = this.props
    return (
      <View>
        <Button onClick={onPressStartStop}>Start/stop</Button>
        <Br /><Br />
        <Button onClick={onPressWasted}>Render wasted</Button>
        <Br /><Br />
        <Button onClick={onPressUseful}>Render useful</Button>
      </View>
    )
  }
}

const MeasuredComponent = measure({
  isCollapsed: false,
  getId: 'example',
  Component: CustomComponent,
})

export default class ExampleApp extends React.Component {

  state = {}
  render() {
    return (
      <MeasuredComponent
        {...this.props}
        ref={node => this.measuredComponent = node}
        useful={this.state.useful}
        onPressStartStop={() => this.onPressStartStop()}
        onPressWasted={() => this.setState({ wasted: !this.state.wasted })}
        onPressUseful={() => this.setState({ useful: !this.state.useful })}
        />
    )
  }

  isRecording = false
  onPressStartStop() {
    if (this.isRecording) {
      this.measuredComponent.printRecording()
      this.isRecording = false
      return
    }
    this.isRecording = true
    this.measuredComponent.startRecording()
  }

}
