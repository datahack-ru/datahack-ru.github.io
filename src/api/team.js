export default ({
  rootUrl, apiUrl,
  get, post, put, patch, deleteRequest,
  authorizedPost,
}) => {

  const getTeamShortInfo = (id) => {
    return authorizedPost({
      url: apiUrl,
      endPoint: '/v1/team/short',
      contentType: 'application/json',
      data: {
        id,
      },
    });
  }
  const getTeamInfo = (id) => {
    return authorizedPost({
      url: apiUrl,
      endPoint: '/v1/team/info',
      contentType: 'application/json',
      data: {
        id,
      },
    });
  }

  const setMyReferralsDistribution = (distribution) => {
    return authorizedPost({
      url: apiUrl,
      endPoint: '/v1/team/distribution',
      contentType: 'application/json',
      data: {
        distribution,
      },
    });
  }


  return {
    getTeamShortInfo,
    getTeamInfo,
    setMyReferralsDistribution,
  };
}
