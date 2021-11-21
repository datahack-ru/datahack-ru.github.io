export default ({
  rootUrl, apiUrl,
  get, post, put, patch, deleteRequest,
  authorizedPost,
}) => {

  const profileSignIn = (data = {}) => {
    const { email, password } = data;
    return post({
      url: apiUrl,
      endPoint: '/v1/profile/signin',
      contentType: 'application/json',
      data: {
        email, password,
      },
    });
  }

  const profileSignUp = (data = {}) => {
    const { email, password } = data;
    let parent = data.parent;
    if (parent) parent = parseInt(parent);
    return post({
      url: apiUrl,
      endPoint: '/v1/profile/signup',
      contentType: 'application/json',
      data: {
        email, password, parent,
      },
    });
  }

  const profileSignOut = () => {
    return authorizedPost({
      url: apiUrl,
      endPoint: '/v1/profile/signout',
      contentType: 'application/json',
    });
  }

  const getProfileRefLevelData = () => {
    return authorizedPost({
      url: apiUrl,
      endPoint: '/v1/profile/referral-level/data',
      contentType: 'application/json',
    });
  }

  const getProfileWalletBalance = () => {
    return authorizedPost({
      url: apiUrl,
      endPoint: '/v1/profile/wallet/balance',
      contentType: 'application/json',
    });
  }

  return {
    profileSignIn,
    profileSignUp,
    profileSignOut,
    getProfileRefLevelData,
  };
}
