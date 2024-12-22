import * as dishController from '../controllers/dishController.js';
import { authenticateToken } from '../middlewares/tokenMiddlewares.js';

const dishRouter = express.Router();

dishRouter.route('/dish').post(authenticateToken, dishController.createDish);
dishRouter.route('/dish').put(authenticateToken, dishController.updateDish);
dishRouter.route('/dish').delete(authenticateToken, dishController.deleteDish);

export default dishRouter;