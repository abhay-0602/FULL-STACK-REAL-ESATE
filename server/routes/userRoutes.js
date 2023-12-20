import  express from 'express' ;
import { createUser,bookVisit,allBookings, cancelBooking,fav,allfav } from '../controllers/userCntrl.js';
const router = express.Router();

router.post("/register",createUser);
router.post("/bookVisit/:id",bookVisit)
router.post("/allBookings",allBookings)
router.post("/removeBooking/:id",cancelBooking)
router.post("/Fav/:pid",fav)
router.post("/allFav/",allfav)
export {router as userRoute}