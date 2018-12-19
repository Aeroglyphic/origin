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

  async handlePublish () {
    this.setState({ publishing: true })
    // Sign configuration using web3
    web3.personal.sign(
      JSON.stringify(this.state.config),
      web3.eth.accounts[0],
      (error, signature) => {
        if (error) {
          console.log('Signing failed: ', error)
          AppToaster.show({
            message: 'There was an error signing your DApp configuration'
          })
          this.setState({ publishing: false })
        } else {
          // Send signed configuration to server
          superagent.post(`${process.env.API_URL}/config`)
            .send({
              config: this.state.config,
              signature: signature,
              address: web3.eth.accounts[0]
            })
            .catch(() => {
              AppToaster.show({
                message: 'There was an error publishing your DApp configuration'
              })
            })
            .finally(() => {
              this.setState({ publishing: false })
            })
        }
      }
    )
  }

  async handlePreview () {
    this.setState({ previewing: true })

    try {
      const response = await superagent
        .post(`${process.env.API_URL}/config/preview`)
        .send(this.state.config)
    } catch(error) {
      console.log('An error occurred generating preview: ' + error)
      return
    } finally {
      this.setState({ previewing: false })
    }

    const ipfsPath = `${process.env.IPFS_GATEWAY_URL}/ipfs/${response.text}`
    window.open(`${process.env.DAPP_URL}/?config=${ipfsPath}`, '_blank')
  }

  render () {
    return (
      <div className="p-3">
        <h3>Create DApp Configuration</h3>

        <ConfigForm config={this.state}></ConfigForm>
      </div>
    )
  }
}

Create.contextTypes = {
  web3: PropTypes.object
}

export default Create
