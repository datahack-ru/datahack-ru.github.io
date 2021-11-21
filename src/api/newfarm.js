export default ({
  bscProvider,
  rootUrl, apiUrl,
  get, post, put, patch, deleteRequest,
  authorizedGet,
  authorizedPost,
}) => {
  const getV2AllData = () => {
    return authorizedPost({
      url: apiUrl,
      endPoint: '/v2/alldata',
      contentType: 'application/json',
      data: {},
    });
  }
  const getV2ClaimCclp = () => {
    return authorizedPost({
      url: apiUrl,
      endPoint: '/v2/claim-cclp',
      contentType: 'application/json',
      data: {},
    });
  }
  const getV2Tree = (guid) => {
    return authorizedGet({
      url: apiUrl,
      endPoint: '/v2/tree/' + guid,
      contentType: 'application/json',
      data: {},
    });
  }
  const getV2Team = (guid) => {
    return authorizedGet({
      url: apiUrl,
      endPoint: '/v2/team/' + guid,
      contentType: 'application/json',
      data: {},
    });
  }
  const getV2My = () => {
    return authorizedGet({
      url: apiUrl,
      endPoint: '/v2/my/',
      contentType: 'application/json',
      data: {},
    });
  }

  return {
    getV2AllData,
    getV2ClaimCclp,
    getV2Tree,
    getV2Team,
    getV2My,
  };
}
