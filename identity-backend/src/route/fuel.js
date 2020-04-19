import { Router } from 'express';
const routes = Router();
import { fuelService } from '../../ts_dist/fuelAgent';
const fueler = new fuelService();

routes.get('/balance/:address', (req, res) => {
    fueler.getBalance(req.params.address).then(sum => res.send(sum))
})

routes.get('/request/:address', (req, res) => {
    const address = '0x' + req.params.address
    // eslint-disable-next-line no-console
    console.log('requested address is:' + address);
    fueler.sendEther(address)
        .then(() => res.json({ status: 200, address: address }))
        .catch((err) => res.status(500).send(err.toString()))
})

export default routes;
