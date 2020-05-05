import React from 'react'
import ReactDOM from 'react-dom'

import App from '../../src'
import appConfig from '../appConfig'

const appContainer = document.querySelector('#root')

ReactDOM.render(<App {...appConfig} />, appContainer)
