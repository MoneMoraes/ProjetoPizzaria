import { Request, Response } from 'express'
import { CreateProductService } from '../../services/product/CreateProductService'

class CreateProductController{
    async handle( req: Request, res: Response){

        const { name, price, description, category_id} = req.body

        if(!req.file){
            throw new Error("error upload file")
        }
        
        
        const createProdutctService = new CreateProductService();
            

            
            const product = await createProdutctService.execute({
                name,
                price: parseInt(price), // Converte string para numero inteiro para ter o valor em centavos
                description,
                imageBuffer: req.file.buffer,
                imageName: req.file.originalname,
                category_id
        });

            return res.json(product)

        }
        
        


    }


export { CreateProductController }