import * as React from 'react'

import ReactPerformance from './dist/react-performance'

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
        {Array
          .from(Array(40000))
          .map((_, index) => new Date(2018, 0, index + 1))
          .filter(date => date.toISOString().includes('2017'))
          .map(date => ({ date }))
          .reduce(accumulator => accumulator, 'dope')
        }
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

const MeasuredComponent = ReactPerformance.measure({
  isCollapsed: false,
  isMuted: false,
  getId: 'example',
  Component: CustomComponent,
})

const AnotherMeasuredComponent = ReactPerformance.measure({
  isCollapsed: false,
  isMuted: true,
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
          useful={this.state.useful}
          onPressStartStop={() => this.onPressStartStop()}
          onPressWasted={() => this.setState({ wasted: !this.state.wasted })}
          onPressUseful={() => this.setState({ useful: !this.state.useful })}
          />
        <Br /><Br /><Br />
        <AnotherMeasuredComponent
          {...this.props}
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
      ReactPerformance.printRecording()
      this.isRecording = false
      return
    }
    this.isRecording = true
    ReactPerformance.startRecording()
  }

}
