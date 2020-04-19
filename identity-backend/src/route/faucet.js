import { Router } from 'express';
const routes = Router();
import { requestEther } from "../controller/faucetController";

routes.get('/', (req, res) => {
  res.render('index', { title: 'Express Babel' });
});

routes.get('/ether', (req, res) => {
  const { address } = req.query;
  if (address == null || address === '') {
    res.send({info:"no address included in params"})
    return;
  }
  requestEther(address,(result)=>{
    res.send(result);
  })
});

export default routes;
