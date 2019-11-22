import * as React from 'react'

export default (Component: React.SFC) => {
  function NewComponent(props: any) {
    return <Component {...props} />
  }
  return NewComponent
}