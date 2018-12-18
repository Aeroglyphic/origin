import React, { Component, Fragment } from 'react'
import { Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import OriginButton from './origin-button'

export default class TransactionModal extends Component {
  render() {
    const { item, address, balance, handleApprove, handleReject, toggleModal } = this.props
    const cost = item.cost
    const name = item.listing && item.listing.title
    const pictures = item.listing && item.listing.media && item.listing.media.map( m => m.url)
    const meta = item.meta
    // placeholders
    const hasSufficientFunds = !cost || web3.utils.toBN(balance).gt(web3.utils.toBN(cost))
    const counterpartyAddress = (item.listing  && item.listing.seller) || item.to

    console.log(item, hasSufficientFunds)

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!item}
        onRequestClose={() => { console.log('Modal closed') } }
      >
        <TouchableOpacity onPress={toggleModal}>
          <View style={styles.above}></View>
        </TouchableOpacity>
        <View style={styles.main}>
          <TouchableOpacity onPress={toggleModal} style={{ width: '100%' }}>
            <View style={styles.close}>
              <Image source={require('../../assets/images/arrow-down.png')} />
            </View>
          </TouchableOpacity>
        {pictures && pictures.length > 0 && <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{uri:pictures[0]}}
              resizeMethod={'resize'}
              resizeMode={'cover'}
            />
          </View>}
        {name && <View style={styles.promptContainer}>
            <Text style={styles.question}>
              Do you want to {item.action_label}?
            </Text>
            <Text style={styles.listingName}>
              {name}
            </Text>
          </View>}
        {!name && meta && 
          <View style={styles.promptContainer}>
            <Text style={styles.question}>
              Do you want call {meta.contract}.{meta.method}?
            </Text>
          </View>}
      <View style={styles.counterparties}>
        <TouchableOpacity onPress={() => Alert.alert('From ETH Address', address)}>
          <View style={styles.party}>
            <Image source={require('../../assets/images/avatar.png')} style={styles.avatar} />
            <Text style={styles.address}>{`${address.slice(0, 4)}...${address.slice(38)}`}</Text>
          </View>
        </TouchableOpacity>
        <Image source={require('../../assets/images/arrow-forward-material.png')} style={styles.arrow} />
        {counterpartyAddress && <TouchableOpacity onPress={() => Alert.alert('To ETH Address', counterpartyAddress)}>
          <View style={styles.party}>
            <Image source={require('../../assets/images/avatar.png')} style={styles.avatar} />
            <Text style={styles.address}>{`${counterpartyAddress.slice(0, 4)}...${counterpartyAddress.slice(38)}`}</Text>
          </View>
        </TouchableOpacity>}
      </View>
      {!hasSufficientFunds &&
        <View style={styles.fundingRequired}>
          <Text style={styles.warning}>
            You don’t have enough funds to complete this transaction. Please add funds to your wallet.
          </Text>
          <Text style={styles.wallet}>
            {address}
          </Text>
        </View>
      }
      {hasSufficientFunds &&
        <View style={styles.fundingAvailable}>
          <View style={{ marginBottom: 20 }}>
            <OriginButton size="large" type="primary" title="Approve" onPress={handleApprove} />
          </View>
          <OriginButton size="large" type="danger" title="Reject" onPress={handleReject} />
        </View>
      }
      </View>
    </Modal>
    )
  }
}

const styles = StyleSheet.create({
  above: {
    backgroundColor: 'transparent',
    height: 88,
  },
  address: {
    color: '#3e5d77',
    fontFamily: 'Lato',
    fontSize: 12,
    fontWeight: '300',
  },
  arrow: {
    height: 22,
    marginLeft: 20,
    marginRight: 20,
    width: 26,
  },
  avatar: {
    marginBottom: 4,
  },
  close: {
    alignItems: 'center',
    marginBottom: 11,
    paddingBottom: 5,
    paddingTop: 5,
  },
  counterparties: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: 30,
  },
  fundingAvailable: {
    width: '83%',
  },
  fundingRequired: {
    alignItems: 'center',
    width: '100%',
  },
  image: {
    borderRadius: 4,
    flex: 1,
    height: undefined,
    marginBottom: 40,
    width: undefined,
  },
  imageContainer: {
    flex: 1,
    width: '83%',
  },
  listingName: {
    fontFamily: 'Lato',
    fontSize: 23,
    marginBottom: 30,
    textAlign: 'center',
    width: '90%',
  },
  main: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
    height: '95%',
    justifyContent: 'space-around',
    paddingBottom: '10%',
  },
  party: {
    alignItems: 'center',
    marginLeft: 'auto',
  },
  promptContainer: {
    alignItems: 'center',
    width: '100%',
  },
  question: {
    fontFamily: 'Lato',
    fontSize: 17,
    fontWeight: '300',
    marginBottom: 17,
    textAlign: 'center',
    width: '90%',
  },
  wallet: {
    fontFamily: 'Lato',
    fontSize: 17,
    textAlign: 'center',
    width: '60%',
  },
  warning: {
    fontFamily: 'Lato',
    fontSize: 17,
    fontWeight: '300',
    marginBottom: 17,
    textAlign: 'center',
    width: '90%',
  },
})
