import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import localeCode from 'locale-code'
import store from 'store'

import Dropdown from 'components/dropdown'

class Footer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      companyWebsiteLanguageCode: 'en-US'
    }

    this.localizeApp = this.localizeApp.bind(this)
    this.localizeWhitepaperUrl = this.localizeWhitepaperUrl.bind(this)
  }

  componentDidMount() {
    this.localizeWhitepaperUrl()
  }

  localizeApp(langCode) {
    if (langCode !== this.props.selectedLanguageCode) {
      store.set('preferredLang', langCode)
      window.location.reload()
    }
  }

  localizeWhitepaperUrl() {
    const { selectedLanguageCode: langCode } = this.props
    let companyWebsiteLanguageCode

    switch (langCode) {
      case 'zh-CN':
        companyWebsiteLanguageCode = 'zh_Hans'
        break
      case 'zh-TW':
        companyWebsiteLanguageCode = 'zh_Hant'
        break
      default:
        companyWebsiteLanguageCode = localeCode.getLanguageCode(langCode)
    }

    this.setState({ companyWebsiteLanguageCode })
  }

  render() {
    return (
      <footer className="light-footer">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="logo-container">
                <a
                  href="https://www.originprotocol.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="images/origin-logo-footer.svg"
                    className="origin-logo"
                    alt="Origin Protocol"
                  />
                </a>
                <div className="vl" />
                <div className="description">
                  <p>
                    <FormattedMessage
                      id={'footer.description'}
                      defaultMessage={
                        'The Origin decentralized app allows buyers and sellers to transact without rent-seeking middlemen using the Ethereum blockchain and IPFS.'
                      }
                    />
                  </p>
                  <p>&copy; {new Date().getFullYear()} Origin Protocol, Inc.</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-lg-flex footer-links-container justify-content-between">
                <Dropdown
                  className="d-flex dropup"
                  open={this.state.dropdown}
                  onClose={() => this.setState({ dropdown: false })}
                >
                  <a
                    className="dropdown-toggle"
                    id="languageDropdown"
                    role="button"
                    onClick={() =>
                      this.setState({
                        dropdown: this.state.dropdown ? false : true
                      })
                    }
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {this.props.selectedLanguageFull}
                  </a>
                  <div
                    className={`dropdown-menu dropdown-menu-left${
                      this.state.dropdown ? ' show' : ''
                    }`}
                    aria-labelledby="languageDropdown"
                  >
                    <div className="triangle-container d-flex justify-content-end">
                      <div className="triangle" />
                    </div>
                    <div className="actual-menu">
                      <div className="language-list">
                        <ul className="list-group">
                          <li
                            className="language d-flex flex-wrap"
                            onClick={() => {
                              this.localizeApp('en-US')
                            }}
                            data-locale="en-US"
                          >
                            English
                          </li>
                          {this.props.availableLanguages &&
                            this.props.availableLanguages.map(langObj => (
                              <li
                                className="language d-flex flex-wrap"
                                key={langObj.selectedLanguageCode}
                                onClick={() => {
                                  this.localizeApp(langObj.selectedLanguageCode)
                                }}
                                data-locale={langObj.selectedLanguageCode}
                              >
                                {langObj.selectedLanguageFull}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Dropdown>
                <div className="d-lg-inline-block link-container">
                  <a
                    href="https://www.originprotocol.com"
                    className="footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FormattedMessage
                      id={'footer.websiteLink'}
                      defaultMessage={'Visit our Website'}
                    />
                  </a>
                </div>
                <div className="d-lg-inline-block link-container">
                  <a
                    href="https://github.com/OriginProtocol"
                    className="footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FormattedMessage
                      id={'footer.githubLink'}
                      defaultMessage={'Visit our Github'}
                    />
                  </a>
                </div>
                {/* For when the FAQ page is ready
                  <div className="d-lg-inline-block link-container">
                    <a
                      href="/FAQ"
                      className="footer-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FormattedMessage
                        id={'footer.faqLink'}
                        defaultMessage={'View FAQs'}
                      />
                    </a>
                  </div>
                */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

const mapStateToProps = state => ({
  selectedLanguageCode: state.app.translations.selectedLanguageCode,
  selectedLanguageFull: state.app.translations.selectedLanguageFull,
  availableLanguages: state.app.translations.availableLanguages
})

export default connect(mapStateToProps)(Footer)
