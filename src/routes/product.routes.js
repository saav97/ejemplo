import {Router} from 'express';
import { methods as productControllers}  from '../controllers/product.controller';

const router = Router();

router.get('/',productControllers.getProducts);

router.post('/', productControllers.addProduct);


export default router;