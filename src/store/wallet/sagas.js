import { put/*, select*/ } from 'redux-saga/effects';
//import { ethers, utils, Wallet } from 'ethers';
import * as A from './actions';
//import * as S from './selectors';
/*
console.log(utils)

// Create a wallet instance from a mnemonic...
let mnemonic = "rival follow quiz faint express mean oval believe bamboo rookie voyage electric"


let node = utils.HDNode.fromMnemonic(mnemonic, 'password')
//.then((data) => console.log('HDNode', data))
console.log('HDNode', node)


//let walletMnemonic = Wallet.fromMnemonic(mnemonic)

// ...or from a private key
//let walletPrivateKey = new Wallet(walletMnemonic.privateKey)

//console.log(walletMnemonic.address === walletPrivateKey.address)
// true

// The address as a Promise per the Signer API
//walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// A Wallet address is also available synchronously
//console.log(walletMnemonic.address)
//console.log(walletMnemonic.addresses)

/*
let options = { scrypt: { N: 1024 } };
function progress(data) {
  console.log('progress', data)
}
walletMnemonic.encrypt('password', options, progress)
  .then((data) => console.log('ewallet', data))
/*
let ewallet = {
  "address": "7f8d5e6c61685ccc92970c17c2659341e7edafe2",
  "id": "2a92e512-5aa7-4ba4-818f-760339e26d9d",
  "version": 3,
  "Crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "eef28dc47cadfffa9b770ba5c68579d6"
    },
    "ciphertext": "60d9edb7376954319905af0859f9260a00ac49a2f89367829788655855e1e481",
    "kdf": "scrypt",
    "kdfparams": {
      "salt": "b2f7c3dd7ea543af88a03fba036cdbd7bbd137876ce36f1a84323c7096ed1d24",
      "n": 131072,
      "dklen": 32,
      "p": 1,
      "r": 8
    },
    "mac": "f32795d1abf0751a23b15d3fc842e07c9b5e34715c2dc1aa902f6205294b3bbe"
  },
  "x-ethers": {
    "client": "ethers.js",
    "gethFilename": "UTC--2021-04-02T23-35-31.0Z--7f8d5e6c61685ccc92970c17c2659341e7edafe2",
    "mnemonicCounter": "a0ba8faccf9e5d413bbc072c30b92eac",
    "mnemonicCiphertext": "1691e136093971f252df57970fbf444d",
    "path": "m/44'/60'/0'/0/0",
    "locale": "en",
    "version": "0.1"
  },
  txs: []
}

Wallet.fromEncryptedJson(JSON.stringify(ewallet), 'password', progress)
  .then((wallet) => {
    console.log('wallet', wallet)
    wallet.encrypt('password', options, progress)
      .then((data) => console.log('ewallet', data))
  })
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'
/*
// The internal cryptographic components
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// The wallet mnemonic
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: "m/44'/60'/0'/0/0",
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Note: A wallet created with a private key does not
//       have a mnemonic (the derivation prevents it)
walletPrivateKey.mnemonic
// null

// Signing a message
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

let tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0")
}

// Signing a transaction
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }
/*
// The connect method returns a new instance of the
// Wallet connected to a ethProvider
wallet = walletMnemonic.connect(ethProvider)

// Querying the network
wallet.getBalance();
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount();
// { Promise: 0 }

// Sending ether
wallet.sendTransaction(tx)
*/

const logLocation = 'sagas/wallet/sagas';

export default ({ api, }) => {

  const clearSaga = function* () {
    yield put(A.clear());
  }


  const updateAccountsSaga = function* () {
    try {/*
      const accounts = yield api.ethProvider.listAccounts();
      yield put(A.setAccounts(accounts));

      if (accounts.length > 0)
        yield put(A.setAccount(accounts[0]));
      else
        yield put(A.setAccount(null));

      return accounts;*/
    } catch (error) {
      yield console.error(logLocation, 'updateAccountsSaga()', error);
    }
    return [];
  }

  const updateAccountsBinanceSaga = function* () {
    try {
      //const accounts = yield window.BinanceChain.;
      //console.log('updateAccountsBinanceSaga', accounts);
      /*
      yield put(A.setAccounts(accounts));

      if (accounts.length > 0)
        yield put(A.setAccount(accounts[0]));
      else
        yield put(A.setAccount(null));

      return accounts;*/
    } catch (error) {
      yield console.error(logLocation, 'updateAccountsBinanceSaga()', error);
    }
    return [];
  }



  const updateSaga = function* () {
    try {
      yield updateAccountsSaga();
      yield updateAccountsBinanceSaga();
    } catch (error) {
      yield console.error(logLocation, 'updateSaga()', error);
    }
  }

  const connectSaga = function* () {
    try {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(console.log)
        .catch((error) => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            console.log('Please connect to MetaMask.');
          } else {
            console.error('error', error);
          }
        });
    } catch (error) {
      yield console.error(logLocation, 'connectSaga()', error);
    }
  }

  const connectBinanceSaga = function* () {
    try {
      window.BinanceChain
        .request({ method: 'eth_requestAccounts' })
        .then(console.log)
        .catch((error) => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            console.log('Please connect to Binance Chain Wallet.');
          } else {
            console.error('error', error);
          }
        });
    } catch (error) {
      yield console.error(logLocation, 'connectBinanceSaga()', error);
    }
  }


  return {
    clearSaga,
    updateSaga,
    connectSaga,
    connectBinanceSaga,
    updateAccountsSaga,
  }
}
