import prismaClient from "../../prisma";

interface ProductRequest{
    category_id: string;
}

class ListByCategoryService{
    async execute({ category_id }: ProductRequest){
        
        try{
            // Verifica se a categotia existe
            const category = await prismaClient.category.findUnique({
                where: {
                    id: category_id,
                },
            });

            if(!category){
                throw new Error("Categoria não encontrada!");
            }
        
        
            // Busca produtos da categoria ( apenas produtos ativos por padrão )
            const findByCategory = await prismaClient.product.findMany({
                where:{
                    category_id: category_id,
                    disabled: false,
                },
                orderBy: {
                    created_at: 'desc',
                },
            });

            return findByCategory;
        
        } catch (err) {
                throw new Error("Falha ao buscar categoria");
            }

        

        
    }
}

export { ListByCategoryService }