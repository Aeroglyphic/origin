import React from 'react'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Intent } from '@blueprintjs/core'
import superagent from 'superagent'

import TextInput from 'components/form/TextInput'

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    subdomain: Yup.string()
      .min(3, 'Your subdomain must have at least 3 characters.')
      .required('Subdomain is required.'),
  }),

  mapPropsToValues: ({ config }) => ({
    ...config,
  }),

  async handleSubmit (payload, { setSubmitting }) {
    setSubmitting(true)

    if (isPreview) {
      try {
        const response = await superagent
          .post(`${process.env.API_URL}/config/preview`)
          .send(payload)
      } catch(error) {
        console.log('An error occurred generating preview: ' + error)
        return
      }
      const ipfsPath = `${process.env.IPFS_GATEWAY_URL}/ipfs/${response.text}`
      window.open(`${process.env.DAPP_URL}/?config=${ipfsPath}`, '_blank')
    } else {
      web3.personal.sign(JSON.stringify(payload), web3.eth.accounts[0], (error, sig) => {
        if (error) {
          AppToaster.show({
            message: 'There was an error signing your DApp configuration'
          })
          setSubmitting(false)
          return
        }

        // Send signed configuration to server
        superagent.post(`${process.env.API_URL}/config`)
          .send({ config: payload, signature: sig, address: web3.eth.accounts[0]})
          .catch(() => {
            AppToaster.show({
              message: 'There was an error publishing your DApp configuration'
            })
          })
          .finally(() => { setSubmitting(false) })
      })
    }
  },

  displayName: 'DAppCreatorForm',
})

const ConfigForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    isPreview,
    isSubmitting,
    setFieldValue
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <h4>Domain</h4>
      <TextInput
        id='subdomain'
        type='text'
        label='Subdomain'
        placeholder='subdomain'
        error={touched.subdomain && errors.subdomain}
        value={values.subdomain}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <h4>Title & Description</h4>

      <h4>Logos & Icons</h4>

      <h4>Languages</h4>

      <h4>Colors</h4>

      <Button type="submit"
          className="mt-3"
          large={true}
          intent={Intent.PRIMARY}
          disabled={isSubmitting && !isPreview}>
        {isSubmitting && !isPreview ? 'Loading' : 'Publish' }
      </Button>

      <Button className="ml-2 mt-3"
          large={true}
          onClick={(e) => setFieldValue('isPreview', true) && handleSubmit(e)}
          disabled={isSubmitting}>
        {isSubmitting && isPreview ? 'Loading' : 'Preview' }
      </Button>
    </form>
  )
}

export default formikEnhancer(ConfigForm)
