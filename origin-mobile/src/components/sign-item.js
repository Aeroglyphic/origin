import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'

import OriginButton from './origin-button'

export default class SignItem extends Component {
  render() {
    const { item, address, balance, handleApprove, handlePress, handleReject, style } = this.props
    // placeholders
    const myAddress = address
    const msg = item.sign && item.sign.params.msg
    const status = item.status

    return (
      <TouchableHighlight onPress={handlePress}>
        <View style={[ styles.listItem, style ]}>
          <Image source={require('../../assets/images/avatar.png')} style={styles.avatar} />
          <View style={styles.content}>
            <Text style={styles.imperative}>Do you wish to sign the following message?</Text>
            <Text style={styles.subject}>{msg}</Text>
            {handleApprove &&
              <View style={styles.actions}>
                <View style={{ marginRight: 10 }}>
                  <OriginButton size="small" type="primary" title="Approve" onPress={handleApprove} />
                </View>
                <OriginButton size="small" type="danger" title="Reject" onPress={handleReject} />
              </View>}
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    paddingTop: '5%',
  },
  address: {
    color: '#3e5d77',
    fontSize: 12,
    fontWeight: '300',
  },
  arrow: {
    marginLeft: 10,
    marginRight: 10,
  },
  avatar: {
    marginRight: '5%',
  },
  content: {
    flex: 1,
    marginTop: 5,
  },
  counterparties: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  imperative: {
    fontSize: 17,
    fontWeight: '300',
    marginBottom: 4,
  },
  listItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: '5%',
  },
  subject: {
    fontWeight: 'normal',
  },
})
