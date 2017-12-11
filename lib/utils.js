// @flow

import * as React from 'react'


type GetIdentifierType = ({
  element: React.ElementRef<*>,
  getId: string | (props: Object) => string,
}) => string

export const getIdentifier: GetIdentifierType = ({ element, getId }) => {
  // $FlowExpectedError
  const debugId = element._reactInternalFiber._debugID
  const elementId = getElementId({ element, getId })
  return `${elementId || 'anonymous'} (${debugId})`
}

const getElementId = ({ element, getId }) => {
  if (typeof getId !== 'string') {
    return getId(element.props)
  }
  if (!element.props.hasOwnProperty(getId)) {
    return getId
  }
  return `${getId}=${element.props[getId]}`
}



type GetChangeDetailsType = ({
  object: Object,
  prevObject: Object,
}) => ChangeDetail[]

type ChangeDetail = {
  key: string,
  prevValue: any,
  value: any,
}

export const getChangeDetails: GetChangeDetailsType = ({ object, prevObject }) => (
  Array.from(new Set([...Object.keys(prevObject), ...Object.keys(object)]))
    .filter(key => {
      if (
        typeof prevObject[key] === 'function' &&
        typeof object[key] === 'function'
      ) {
        return false
      }
      return prevObject[key] !== object[key]
    })
    .map(key => ({
      key,
      prevValue: prevObject[key],
      value: object[key],
    }))
)
