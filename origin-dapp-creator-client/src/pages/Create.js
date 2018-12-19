import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { baseConfig } from 'origin-dapp/src/config'
import { AppToaster } from '../toaster'
import ConfigForm from '../Form'

class Create extends Component {
  constructor(props, context) {
    super(props)

    this.state = {
      config: baseConfig,
      isPreview: false
    }

    this.web3Context = context.web3

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handlePreview = this.handlePreview.bind(this)
    this.handlePublish = this.handlePublish.bind(this)
  }

  handleInputChange (event) {
    this.setState({
      'config': {
        ...this.state.config,
        [event.target.name]: event.target.value
      }
    })
  }

  handleColorChange (name, color) {
    this.setState({
      'config': {
        ...this.state.config,
        'cssVars': {
          ...this.state.config.cssVars,
          [name]: color.hex
        }
      }
    })
  }

  render () {
    return (
      <div className="p-3">
        <h3>Create DApp Configuration</h3>

        <ConfigForm
          config={this.state}>
        </ConfigForm>
      </div>
    )
  }
}

Create.contextTypes = {
  web3: PropTypes.object
}

export default Create
