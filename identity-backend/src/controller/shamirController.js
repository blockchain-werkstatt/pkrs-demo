import * as callback from '../helper/callback';
import {  split , combine, split_qna, combine_qna, questions , prime512 , prime3217, encode , decode } from 'secretkeysharing';


module.exports = {
    /*
    * return array of questions available in the library
    */
    async getQuestions (cb) {
        await callback.successCallback(questions , cb)
    },

    async splitQnA(secret, q, a, type, cb) {
        /* 
        as per libary number of share should be atleast 3
        */
       if(q.count < 3 && a.count < 3  ){
        let data = {'error' : 'Minimum Number of question and answer should be 3'}
        await callback.errorCallback(data , cb)
        } else {
            const publicShare = split_qna(secret, 3, q, a, type);
            await callback.successCallback({ publicshare: publicShare }, cb);
        }
    },

    async combineQnA(publicshare, q, a, type, cb) {
       if(q.count < 3 && a.count < 3 ){
        let data = {'error' : 'Minimum Number of question and answer should be 3'}
        await callback.errorCallback(data , cb)
        } else {
            const secret = combine_qna(publicshare, q, a, type);
            await callback.successCallback({ secret: secret }, cb);
        }
    },

    async split (input_key , numberofShare , numberofcombine, cb) {
        /* 
        as per libary number of share should be atleast 3
        */
        if(numberofShare < 3 ){
            let data = {'error' : 'Minimum Number of share should be 3'}
            await callback.errorCallback(data , cb)
        }else 

        /* 
        as per libary number of share should be atleast 3
        */
        if (numberofcombine<3){
            let data = {'error' : 'Minimum Number of combination should be 3'}
            await callback.errorCallback(data , cb)
        }else {
             const splits = split(input_key, numberofShare, numberofcombine , prime512 );
             await callback.successCallback(splits, cb);
        }
    },

   
    async splitEncoded (input_string , numberofShare , numberofcombine, cb) {
        /* 
        as per libary number of share should be atleast 3
        */
        if(numberofShare < 3 ){
            let data = {'error' : 'Minimum Number of share should be 3'}
            await callback.errorCallback(data , cb)
        }else 

        /* 
        as per libary number of share should be atleast 3
        */
        if (numberofcombine<3){
            let data = {'error' : 'Minimum Number of combination should be 3'}
            await callback.errorCallback(data , cb)
        }else {
             const splits = split(encode(input_string), numberofShare, numberofcombine , prime3217 );
             await callback.successCallback(splits, cb);
        }
    },

    async encoded(string, cb) {
        await callback.successCallback(encode(string), cb);
    },

    async decoded(string, cb) {
        await callback.successCallback(decode(string), cb);
    },


   async combine (share, cb) {
       /*
       share structure should be 
       [
        {
            "x": "1",
            "y": "0x8b2954d1947407717a4bb4557cb59f71000c4f0355b0b838f06ad97ddf8ae9449c1ccfc5400f0296a9e62da1c43b1bb34e06331c8aecd7dea2b9df0a865857ec"
        },
        {
            "x": "2",
            "y": "0x4055f89d5123a389f9d7fc7e2c7e245b12cc425bed6c908debcb8416ff0965f89c87923601be5e29396708276c6be64beaf375521a6f8011b72ac9b0996c5d3b"
        },
        {
            "x": "3",
            "y": "0x1f85eb63360ed4497ea4d87a0f598ebe383fda09c73388fef221ffcb5e7b761c01404752450e12b7ae828f91bb6a2f5f3b24f9a10ffdb022c6561c6ec99de3e5"
        }
    ]
    */

      const combines = combine(share , prime512).toHex();
      await callback.successCallback(combines,cb);
    },

    async combineEncoded (share, cb) {
        /*
        share structure should be 
        [
         {
             "x": "1",
             "y": "0x8b2954d1947407717a4bb4557cb59f71000c4f0355b0b838f06ad97ddf8ae9449c1ccfc5400f0296a9e62da1c43b1bb34e06331c8aecd7dea2b9df0a865857ec"
         },
         {
             "x": "2",
             "y": "0x4055f89d5123a389f9d7fc7e2c7e245b12cc425bed6c908debcb8416ff0965f89c87923601be5e29396708276c6be64beaf375521a6f8011b72ac9b0996c5d3b"
         },
         {
             "x": "3",
             "y": "0x1f85eb63360ed4497ea4d87a0f598ebe383fda09c73388fef221ffcb5e7b761c01404752450e12b7ae828f91bb6a2f5f3b24f9a10ffdb022c6561c6ec99de3e5"
         }
     ]
     */
 
       const combines = combine(share , prime3217).toHex();
       await callback.successCallback(decode(combines),cb);
     }
}