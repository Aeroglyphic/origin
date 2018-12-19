import React, { Component } from 'react'
import { Button, HTMLSelect, InputGroup, FormGroup } from '@blueprintjs/core'
import superagent from 'superagent'

class SubdomainField extends Component {
  constructor (props) {
    super(props)
    this.state = {
      domainType: 'Subdomain'
    }
    this.handleDomainTypeChange = this.handleDomainTypeChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleDomainTypeChange (event) {
    this.setState({ domainType: event.target.value })
  }

  async handleChange (event) {
    this.props.onChange(event)
  }

  render () {
    const fieldSuffix = (
      <Button disabled={true}>.origindapp.com</Button>
    )

    return (
      <>
        <FormGroup
            label="Domain type"
            label-for="domain-type-field"
            labelInfo="(required)">
          <HTMLSelect
            options={['Subdomain', 'Custom Domain']}
            onChange={this.handleDomainTypeChange} />
        </FormGroup>

        {this.state.domainType == 'Subdomain' &&
          <FormGroup
              label="Subdomain"
              labelFor="subdomain-field"
              labelInfo="(required)">
            <InputGroup
              name="subdomain"
              placeholder="marketplace"
              className="input-width"
              rightElement={fieldSuffix}
              value={this.props.value}
              onChange={this.handleChange}>
            </InputGroup>
          </FormGroup>
        }
      </>
    )
  }
}

export default SubdomainField
