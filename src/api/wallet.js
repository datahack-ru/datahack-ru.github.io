export default ({
  rootUrl, apiUrl,
  get, post, put, patch, deleteRequest,
  authorizedPost,
}) => {

  const getWalletBalances = (address) => {
    return post({
      url: apiUrl,
      endPoint: '/v1/wallet/balances',
      contentType: 'application/json',
      data: {
        address,
      },
    });
  }

  const getWalletStakes = (address) => {
    return post({
      url: apiUrl,
      endPoint: '/v1/wallet/stakes',
      contentType: 'application/json',
      data: {
        address,
      },
    });
  }

  const setWalletLinkAddress = (address, userId, timestamp, message, signature) => {
    return authorizedPost({
      url: apiUrl,
      endPoint: '/v1/wallet/link',
      contentType: 'application/json',
      data: {
        address, userId, timestamp, message, signature
      },
    });
  }

  const checkAddressIsLinked = (address) => {
    return authorizedPost({
      url: apiUrl,
      endPoint: '/v1/wallet/islinked',
      contentType: 'application/json',
      data: {
        address
      },
    });
  }

  const getBalanceCosmo = () => {
    return authorizedPost({
      url: apiUrl,
      endPoint: '/v1/wallet/balance-cosmo',
      contentType: 'application/json',
      data: {},
    });
  }

  const balanceWithdrawAllCosmo = () => {
    return authorizedPost({
      url: apiUrl,
      endPoint: '/v1/wallet/withdraw-all',
      contentType: 'application/json',
      data: {},
    });
  }

  return {
    getWalletBalances,
    getWalletStakes,
    setWalletLinkAddress,
    checkAddressIsLinked,
    getBalanceCosmo,
    balanceWithdrawAllCosmo,
  };
}
