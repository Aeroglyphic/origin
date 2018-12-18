import React, { Component } from 'react'
import { formattedAddress } from 'utils/user'
import Message from 'components/message'

const MAX_MINUTES = 10

function getElapsedTime(latestTime, earlierTime) {
  const toMinutes = 1000 * 60
  const elapsedTime = (latestTime - earlierTime) / toMinutes

  return isNaN(elapsedTime) ? 0 : elapsedTime
}

function sortOrder(a, b) {
  const firstDate = (a.created && a.created) || (a.timestamp * 1000)
  const nextDate = (b.created && b.created) || (b.timestamp * 1000)
  return (firstDate < nextDate) ? -1 : 1
}

export default class CompactMessages extends Component {
  constructor(props) {
    super(props)
    const { messages = [] } = props
    const sortedMessages = messages.sort(sortOrder)

    this.state = { sortedMessages }
  }

  componentDidUpdate(prevProps) {
    const { messages = [] } = this.props
    if (prevProps.messages !== messages) {
      const sortedMessages = messages.sort(sortOrder)
      this.setState({ sortedMessages })
    }
  }

  findPreviousMessage(currentMessage, idx, previousIdx) {
    const { sortedMessages } = this.state

    if (previousIdx && previousIdx < 0) return {}
    /*
      get the next index from recursion or set the
      index based on the current message
    */
    const index = previousIdx || idx - 1
    const previousMessage = sortedMessages[index]

    if (previousMessage.timestamp) {
      return this.findPreviousMessage(currentMessage, idx, index - 1)
    } else if (previousMessage.created) {
      return previousMessage
    } else {
      return {}
    }
  }

  render() {
    const { formatOfferMessage, smallScreenOrDevice } = this.props
    const { sortedMessages } = this.state
    const firstMessage = sortedMessages.find((message) => message.created)

    return sortedMessages.map((message, i) => {
      if (!message) return
      const { created, hash, senderAddress, timestamp } = message
      const offerMessage = timestamp
      if (offerMessage) return formatOfferMessage(message)

      const isFirstMessage = firstMessage === message
      const previousOfferMessage = sortedMessages[i-1] && sortedMessages[i-1].timestamp
      const nextOfferMessage = sortedMessages[i+1] && sortedMessages[i+1].timestamp
      const previousMessage = isFirstMessage ? {} : this.findPreviousMessage(message, i)
      const nextMessage = sortedMessages.find((message, idx) => {
        return (idx >= (i+1)) && message && message.created
      }) || {}

      const timeElapsed = getElapsedTime(created, previousMessage.created)
      const showTime = isFirstMessage || timeElapsed >= MAX_MINUTES
      const sameSender = formattedAddress(senderAddress) === formattedAddress(nextMessage.senderAddress)
      const timeToElapse = getElapsedTime(nextMessage.created, created)
      const offerMessageStatus = (nextOfferMessage && !smallScreenOrDevice) ? false : true
      const contentOnly = (offerMessageStatus && sameSender && (timeToElapse < MAX_MINUTES))

      return (
        <Message key={hash}
          showTime={showTime}
          message={message}
          contentOnly={contentOnly}
          previousOfferMessage={previousOfferMessage}
        />
      )
    })
  }
}
