import { Readable } from "stream";
import prismaClient from "../../prisma/index";
import cloudinary  from "../../config/claudinary";

interface ProductRequest{
    name: string;
    price: number;
    description: string;
    imageBuffer: Buffer;
    imageName: string;
    category_id: string;
}

class CreateProductService{
    async  execute({name, price, description, imageBuffer, imageName, category_id}: ProductRequest){

        const categoryExists = await prismaClient.category.findFirst({
            where:{
                id: category_id
            }
        })

        if(!categoryExists){
            throw new Error("Categoria não encontrada")
        }

        // ENVIAR PARA O CLOUDNARY SALVAR A IMAGEM E PEGAR O LINK
        let bannerUrl = "";

        try{

            const result = await new Promise<any> ((resolve, reject)=> {
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder: "products",
                    resource_type: "image",
                    public_id: `${Date.now()}-${imageName.split(".")[0]}`
                },(error, result) => {
                    if(error) reject(error);
                    else resolve(result);
                }) 

                // Criar o stream do buffer e fazer pipe para o cloudinary
                const bufferStream = Readable.from(imageBuffer)
                bufferStream.pipe(uploadStream)

            })

            console.log(result)

            bannerUrl = result.secure_url;

        }catch(error){
            console.log(error);
            throw new Error("Erro ao fazer o upload da imagem!")
        }
        
        // SALVAR O LINK DA IMAGEM E OS DADOS NO BANCO COMO UM NOVO PRODUTO

        const product = await prismaClient.product.create({
            data:{
                name: name,
                price: price,
                description: description,
                banner: bannerUrl,
                category_id: category_id,
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                category_id: true,
                banner: true,
                created_at: true,
            },
        });

        return product;

    }
}

export { CreateProductService }