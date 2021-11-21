export const pancakeswapV1AppLink = 'https://v1exchange.pancakeswap.finance';
export const pancakeswapV2AppLink = 'https://pancakeswap.finance';
export function getPancakeswapV2SwapLink(token1: string, token2: string): string {
  return pancakeswapV2AppLink + `/swap?inputCurrency=${token1}&outputCurrency=${token2}`;
}
export function getPancakeswapV2AddLiquidityLink(token1: string, token2: string): string {
  return pancakeswapV2AppLink + `/add/${token1}/${token2}`;
}
export function getPancakeswapV2RemoveLiquidityLink(token1: string, token2: string): string {
  return pancakeswapV2AppLink + `/remove/${token1}/${token2}`;
}
