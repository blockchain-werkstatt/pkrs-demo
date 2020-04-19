import Wallet from 'identity-contracts/lib/wallet'
import config from '../config';
import request from 'request';


const CONFIG = {
  debug: true,
  logger: undefined,
  lookupContractAddress: '0x',
  gethHost: config.endpoint
}


//only for testing purpose
const TEST_PIN = "1234";
const TEST_SEED_PHRASE = "mandate print cereal style toilet hole cave mom heavy fork network indoor";
const TEST_ETHER_AMOUNT = 0.5;

export const wallet = new Wallet(CONFIG);

let mainAddress;

wallet
  .init({seedPhrase: TEST_SEED_PHRASE, pin: TEST_PIN})
  .then(_mainAddress => {
    wallet.getBalance(_mainAddress).then(() => {
      //check the minimum required balance
        request.get('http://localhost:'+ config.port+ '/fuel/request/'+_mainAddress).on('response',(response)=>{
           // eslint-disable-next-line no-console
           console.log('response is :'+JSON.stringify(response));
           mainAddress = _mainAddress;
        });
    })
  })
  .catch(() => {

  })

 const requestEther = (address,callback)=>{
    
        let txHash;

        request.get('http://localhost:'+ config.port+ '/fuel/request/'+mainAddress).on('response',(response)=>{
        
            if(response.statusCode == 200){
            wallet.sendEther({receiver:address, amountEther:TEST_ETHER_AMOUNT, data:null, pin:TEST_PIN}).then((result)=>{
                txHash = result
                return wallet.getBalances(address)
                }).then((balance) =>{
                // eslint-disable-next-line no-console
                console.log("balance:" +balance)
                callback({success:"transaction send",txHash:txHash});
                })
            }else{
                callback('not able to fuel right now , Keys are busy try again');
            }
        
        });
    }

 export {requestEther};