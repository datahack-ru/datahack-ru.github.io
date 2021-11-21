export const isProduction = process.env.NODE_ENV === 'production';
export const NetworkContextName = 'NETWORK';
export const connectorLocalStorageKey = 'connectorId';
export enum ChainId {
  ETH_MAINNET = 1,
  ETH_ROPSTEN = 3,
  ETH_RINKEBY = 4,
  ETH_GOERLI = 5,
  ETH_KOVAN = 42,

  BSC_MAINNET = 56,
  BSC_TESTNET = 97,
};

// CCLP
export const cclpBscAddress = '0x55ece1750677AF5FcCbf0F05b52169946c371878';
export const cclpBscMintSchedule = '0xDF8dCB5CCfD5f647B26928DEa2CfdF3450736929';
export const cclpBscStakingRouter = '0xF3272769093E3120aa579aC9e03EF15A18f12bFa';
export const cclpBscUsdtPair = '0x7e5420373b446d27Cd33aa1117083AE188B9BeF9';
export const cclpBscStakingService = '0xb12338640a1Ac917bc2cd58279Be0b20FdfF3041';
export const cclpBscReinvestor = '0x3568dF9C300D961f4D5C47dF4902a7a25a01Ff4A';


// свапы из одной сети в другую
export const swapEthAddress = '0x9c7C8dC756DF77F1911022d84e4582EB8Cd9b16a';
export const swapBscAddress = '0x874c6B89B27E751171E30f108E96AE1c7Ee83A94';


// USDT address
export const usdtAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
export const usdtBscAddress = '0x55d398326f99059fF775485246999027B3197955';


// COSMO Token
export const cosmoAddress = '0x27cd7375478F189bdcF55616b088BE03d9c4339c';
export const cosmoBscAddress = '0x60E5FfdE4230985757E5Dd486e33E85AfEfC557b';


// CUP Token
export const cupAddress = '0x1faDbb8D7c2D84DAad1c6f52f92480ceF8c96024';
export const cupMinterAddress = '0x8C3c25474530DF10046f7cDc197571F353F5AcA0';
export const CosmoCupLpMinter = '0x25df1Bb91F9A4CDab11C6C396535BD440858975b';



// CosmoMasks NFT
export const masksAddress = '0x0580Ae26963230BFBd2A775ff0AFA937Fd157774';
export const cosmoMasksPowerAddress = '0xB9FDc13F7f747bAEdCc356e9Da13Ab883fFa719B';
export const cosmoMasksPowerBscAddress = '0x7A43397662e82a9C15D590f211347D2871B12bb7';


// CosmoBugs NFT
export const cosmoBugsAddress = '0xE97dDABfE81E3532EF6A0119463C9D12D41a962A';
export const cosmoBugsPowerAddress = '0xd6319D0d2Bc6D58066F61C1f82715564B31DD864';


// CosmoDoodle NFT
export const cosmoDoodleAddress = '0x01289F699Fb3fbFf7c94C597Fa784eb971d3fd5b';
export const cosmoDoodlePowerAddress = '0x0690554989758E50895C5E7bFE6184a02203Cbc6';


// CosmoArt NFT
export const cosmoArtAddress = '0x5D464B5118e2c5677B88Ac964B47495538052A80';
export const cosmoArtPowerAddress = '0x30cb50E5e546352292f3DF53FB1A860394022375';


// UniswapV2
export const uniswapV2CosmoEthLpAddress = '0x1954B2E0f96e3cf64f754e7Abf2834630385AB5D';
export const uniswapV2CosmoUsdtLpAddress = '0xe9a7AC0Cc3b76ee88fC0c2900E006F33fBEcbde6';
export const uniswapV2CosmoCupLpAddress = '0x2F77258A82F7783f6D877F9D1C255f054d2618ab';
export const uniswapV2CosmoCmpLpAddress = '0xd2110e16E5649E5f3aDd85c6F4C888D4c71Ffc28';
export const uniswapV2CosmoCbpLpAddress = '0x61Eaf59FD1a38f77B709123FE4729125a9C3dfe5';
export const uniswapV2CosmoCdpLpAddress = '0xf12c9013397d443fF1C0F7c424F6D8F609B25c3a';


// PancakeSwap V1


// PancakeSwap V2
