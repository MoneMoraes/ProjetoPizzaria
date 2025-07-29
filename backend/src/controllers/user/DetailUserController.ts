import {Request, Response} from 'express'
import { DetalUserService } from '../../services/user/DetailUserService'

class DetailUserController{
    async handle(req: Request, res: Response){

        const user_id = req.user_id;

        const detailUserService = new DetalUserService();

        const user = await detailUserService.execute(user_id);

        return res.json(user);

    }
}

export { DetailUserController }