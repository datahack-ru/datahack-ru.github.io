export default ({
  rootUrl, apiUrl,
  get, post, put, patch, deleteRequest,
  authorizedPost,
}) => {

  const getBonusPoolsData = (address) => {
    return authorizedPost({
      url: apiUrl,
      endPoint: '/v1/bonus-pools2/' + address,
      contentType: 'application/json',
      data: {},
    });
  }
  const getBonusPoolsBscData = (address) => {
    return authorizedPost({
      url: apiUrl,
      endPoint: '/v1/bonus-pools2/bsc/' + address,
      contentType: 'application/json',
      data: {},
    });
  }
  const getBonusPoolsEthData = (address) => {
    return authorizedPost({
      url: apiUrl,
      endPoint: '/v1/bonus-pools2/eth/' + address,
      contentType: 'application/json',
      data: {},
    });
  }



  return {
    getBonusPoolsData,
    getBonusPoolsBscData,
    getBonusPoolsEthData,
  };
}
