import {Router} from "express"
import { ensureAuthenticated } from "../middlewares/auth.js";

const router = Router()

router.get('/products', ensureAuthenticated, (req, res) => {
    res.status(200).json([
        {
            name: "Mobile",
            price: 10000
        },
        {
            name: "TV",
            price: 25000
        }
    ])
}
)

export const productRouter = router;