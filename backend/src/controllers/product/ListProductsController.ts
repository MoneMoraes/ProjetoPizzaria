import { Request, Response } from 'express';
import { ListProductsService } from '../../services/product/ListProductsService';

class ListProductsController {
    async handle(req: Request, res: Response) {
        const disabledParam = req.query.disabled;

        let disabled: boolean | undefined;

        if (disabledParam === 'true') {
            disabled = true;
        } else if (disabledParam === 'false') {
            disabled = false;
        }

        const listProductsService = new ListProductsService();

        const products = await listProductsService.execute({ disabled });

        return res.json(products);
    }
}

export { ListProductsController };
