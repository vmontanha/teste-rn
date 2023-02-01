import React from 'react'

import WebView from 'react-native-webview'


const Repository = props => {

  const { urlDetail } = props.route.params

  return (
    <WebView source={{ uri: urlDetail }} />
  )
}

export default Repository
