export const uniswapAppLink = 'https://app.uniswap.org';
export function getUniswapV3SwapLink(token1: string, token2: string): string {
  return uniswapAppLink + `/#/swap?inputCurrency=${token1}&outputCurrency=${token2}`;
}
export function getUniswapV2SwapLink(token1: string, token2: string): string {
  return getUniswapV3SwapLink(token1, token2) + '&use=V2';
}
export function getUniswapV2AddLiquidityLink(token1: string, token2: string): string {
  return uniswapAppLink + `/#/add/v2/${token1}/${token2}`;
}
export function getUniswapV2RemoveLiquidityLink(token1: string, token2: string): string {
  return uniswapAppLink + `/#/remove/v2/${token1}/${token2}`;
}
