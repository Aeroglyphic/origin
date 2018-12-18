const V00_Marketplace = artifacts.require('./V00_Marketplace.sol')

module.exports = function(deployer, network) {
  return deployer.then(() => {
    if (network === 'mainnet' || network === 'rinkeby' || network === 'ropsten') {
      console.log(`Skipping sample listings creation on ${network}`)
    } else {
      return deployContracts(deployer)
    }
  })
}

async function createListing(marketplace, hash, from) {
  await marketplace.createListing(hash, '0', from, { gas: 4612388, from })
}

async function deployContracts(deployer) {

  const accounts = await new Promise((resolve, reject) => {
    web3.eth.getAccounts((error, result) => {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })

  const Seller = accounts[1]

  const marketplace00 = await V00_Marketplace.deployed()

  // NOTE: These hashes need to match listings output of `start-ipfs.js`

  // hawaii-house
  // QmdThQZ2U5PLLf3g6W2k7NWaT1VA4jmy7tKJJkJm1DvNeR
  await createListing(
    marketplace00,
    '0xe0ad6b61eb7252813748e2f4a1d969a4309d3c92c22ec0a0a1da8d5e61a2b1f6',
    Seller
  )
  // lake-house
  // QmPPWcoQZzHerT4Cf3hqhhNM9Lxg88WKzm4o9UcrM1rEb6
  await createListing(
    marketplace00,
    '0x0f9747c11cff0079f15d1607089809686167b7dca24742a369958b4c9f548175',
    Seller
  )
  // scout
  // QmTqv9hhrwePDiE348xvzJeZR4J2zgMVMm2aNmLtF5crNe
  await createListing(
    marketplace00,
    '0x51c9bcd5f5d59d299501c81a9b93958a1041342e3f2e143fc9f88bd9ee26df83',
    Seller
  )
  // taylor-swift-tix
  // QmXx5Qo2xh5TWZXbsDmyquBpojpqoUVpgZt3kNgqsonw9j
  await createListing(
    marketplace00,
    '0x8ecc70d4c694d22f72efbbe154fba7b4c9bae69f0b6f02d92ddcbcde24798b3a',
    Seller
  )
  // zinc-house
  // QmS2zpqffkTqT2agiSgk4PUrhqkbfqW2fXNMeQ8WrBnTLn
  await createListing(
    marketplace00,
    '0x36e909d9b6032f92c2a70058b97d9d49a7af10f70c81ad7e0eabc614449fe92b',
    Seller
  )
}
