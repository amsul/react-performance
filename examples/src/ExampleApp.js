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

class AnotherCustomComponent extends React.Component {
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

const AnotherMeasuredComponent = measure({
  isCollapsed: false,
  getId: 'example-2',
  Component: AnotherCustomComponent,
})

export default class ExampleApp extends React.Component {

  state = {}
  render() {
    const { Br } = this.props
    return (
      <React.Fragment>
        <MeasuredComponent
          {...this.props}
          ref={node => this.measuredComponent = node}
          useful={this.state.useful}
          onPressStartStop={() => this.onPressStartStop()}
          onPressWasted={() => this.setState({ wasted: !this.state.wasted })}
          onPressUseful={() => this.setState({ useful: !this.state.useful })}
          />
        <Br /><Br /><Br />
        <AnotherMeasuredComponent
          {...this.props}
          ref={node => this.measuredComponent = node}
          useful={this.state.useful}
          onPressStartStop={() => this.onPressStartStop()}
          onPressWasted={() => this.setState({ wasted: !this.state.wasted })}
          onPressUseful={() => this.setState({ useful: !this.state.useful })}
          />
      </React.Fragment>
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
