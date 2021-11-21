import httpService from './http';
import apiAuthorize from './apiAuthorize';
import ethService from './ethService';
import bscService from './bscService';
import uniswap from './uniswap';
import pancakeswap from './pancakeswap';
import bonusPools from './bonusPools';
import profile from './profile';
import wallet from './wallet';
import team from './team';
import newfarm from './newfarm';



const api = ({
  options,
  apiKey,
  getAuthCredentials,
  reauthenticate,
  dispatch
}) => {
  const rootUrl = options.domains.root;
  const apiUrl = options.domains.api;
  const http = httpService({ apiKey });
  const authorizedHttp = apiAuthorize(http, getAuthCredentials, reauthenticate);
  const eth = ethService({ dispatch });
  const bsc = bscService({ dispatch });

  const baseApi = {
    rootUrl,
    apiUrl,
    ...http,
    authorizedGet: authorizedHttp.get,
    authorizedPost: authorizedHttp.post,
    authorizedPut: authorizedHttp.put,
    authorizedPatch: authorizedHttp.patch,
    authorizedDelete: authorizedHttp.deleteRequest,
    ...eth,
    ...bsc,
  };

  return {
    ...http,
    ...authorizedHttp,
    ...eth,
    ...bsc,
    ...uniswap({ ...baseApi, ...eth, }),
    ...pancakeswap({ ...baseApi, ...bsc, }),
    ...bonusPools(baseApi),
    ...profile(baseApi),
    ...wallet(baseApi),
    ...team(baseApi),
    ...newfarm(baseApi),
  };
}

export default api;
