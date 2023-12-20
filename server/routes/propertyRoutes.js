import  express from 'express' ;
import { createProperty,getallProperty,getProperty} from '../controllers/propecntrl.js';
const router = express.Router();

router.post("/create",createProperty)
router.get("/allresd",getallProperty)
router.get("/:id",getProperty)
export {router as propertyRoute}