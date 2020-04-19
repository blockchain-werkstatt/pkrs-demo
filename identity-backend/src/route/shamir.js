import { Router } from 'express';
import * as controller from '../controller/shamirController';

const routes = Router();


routes.get('/questions', (req, res) => {
    controller.getQuestions((result) => {
        res.json(result);
    });
});

/*
POST /spit
*/

routes.post('/split', (req, res) => {

const inputsting = req.body.inputkey;
const numberofshares = req.body.share;
const numberofcombine = req.body.combine;

if(inputsting==null || inputsting == ''){
    throw new Error('input key is invalid');
}

if(numberofshares==null || numberofshares == ''){
    throw new Error('Number of shares is not defined');
}

if(numberofcombine==null || numberofcombine == ''){
    throw new Error('Number of Combine is not defined');
}

 controller.split(inputsting, numberofshares , numberofcombine ,(result)=>{
    res.json(result);
    });
});

/*
POST /spit
*/

routes.post('/splitEncoded', (req, res) => {

    const inputsting = req.body.inputString;
    const numberofshares = req.body.share;
    const numberofcombine = req.body.combine;
    
    if(inputsting==null || inputsting == ''){
        throw new Error('input string is invalid');
    }
    
    if(numberofshares==null || numberofshares == ''){
        throw new Error('Number of shares is not defined');
    }
    
    if(numberofcombine==null || numberofcombine == ''){
        throw new Error('Number of Combine is not defined');
    }
    
     controller.splitEncoded(inputsting, numberofshares , numberofcombine ,(result)=>{
        res.json(result);
        });
    });


/*
POST /spitqna
*/

routes.post('/splitQnA', (req, res) => {

    const inputsting = req.body.secret;
    const question = req.body.questions;
    const answer = req.body.answers;
    const type = req.body.type;
    
    if(inputsting==null || inputsting == ''){
        throw new Error('input string is invalid');
    }

    if(type==null || type == ''){
        throw new Error('type is invalid either hex (prime512) or null for enocode menemonic (prime3217)');
    }
    
    if(question==null || question == ''){
        throw new Error('questions of Combine is not defined');
    }

    if(answer==null || answer == ''){
        throw new Error('answers of Combine is not defined');
    }
    
     controller.splitQnA(inputsting , question, answer , type, (result)=>{
        res.json(result);
        });
    });


// /*
// POST combine
// */
routes.post( '/combine' , (req,res)=>{
    let shares = req.body.shares;
        controller.combine(shares ,(result) =>{
            res.json(result);
        });
});


// /*
// POST combine
// */
routes.post( '/combineEncoded' , (req,res)=>{
    let shares = req.body.shares;
        controller.combineEncoded(shares ,(result) =>{
            res.json(result);
        });
});

/*
POST /combineqna
*/

routes.post('/combineQnA', (req, res) => {

    const inputsting = req.body.publicshare;
    const question = req.body.questions;
    const answer = req.body.answers;
    const type = req.body.type;
    
    if(inputsting==null || inputsting == ''){
        throw new Error('input string is invalid');
    }
    
    if(type==null || type == ''){
        throw new Error('type is invalid either hex (prime512) or null for enocode menemonic (prime3217)');
    }
    
    if(question==null || question == ''){
        throw new Error('questions of Combine is not defined');
    }

    if(answer==null || answer == ''){
        throw new Error('answers of Combine is not defined');
    }
    
     controller.combineQnA(inputsting , question, answer , type, (result)=>{
        res.json(result);
        });
    });


    routes.post('/encode', (req, res) =>  {
        const input = req.body.input;
        if(input==null || input == ''){
            throw new Error('input is invalid');
        }
        controller.encoded(input, (result) => {
            res.json(result);
        })
    });

    routes.post('/decode', (req, res) =>  {
        const input = req.body.input;
        if(input==null || input == ''){
            throw new Error('input is invalid');
        }
        controller.decoded(input, (result) => {
            res.json(result);
        })
    });

/*
route to be used to share the key to other either using Email or other way
*/

routes.post('share', (req, res)=>{
    res.json("implementation pending");
})

/*
asking the user to return the key save either on email or other
*/
routes.post('askkey', (req, res)=>{
    res.json("implementation pending");
})

export default routes;