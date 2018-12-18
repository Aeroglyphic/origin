import origin from '../services/origin'

const { web3 } = origin.contractService

const MAX_ADDRESS_LENGTH = 9

/**
 * Takes an Ethereum address and formats it for reliable comparison or display
 * e.g. 0x627306090abab3a6e1400e9345bc60c78a8bef57 becomes 0x627306090abaB3A6e1400e9345bC60c78a8BEf57
 * @param {string} an Ethereum address in any case
 * @return {string} a case-specific address (currently checksum)
 * @throws {Error} if the input is not a valid Ethereum address
 */

export function formattedAddress(string) {
  return web3.utils.toChecksumAddress(string)
}


export function truncateAddress(address = '') {
  if (address.length <= MAX_ADDRESS_LENGTH) return address
  const separator = '...'
  const frontChars = 5
  const backChars = 4

  return address.substr(0, frontChars)
    + separator
    + address.substr(address.length - backChars)
}

export function abbreviateName(party, defaultName = '') {
  const { profile = {}, fullName } = party
  const { firstName = '', lastName = '' } = profile
  const lastNameLetter = lastName.length ? `${lastName.charAt(0)}.` : ''
  const abbreviatedName = fullName && `${firstName} ${lastNameLetter}`

  return abbreviatedName || defaultName
}
