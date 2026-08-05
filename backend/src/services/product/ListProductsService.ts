import prismaClient from '../../prisma';

interface ListProductsRequest {
    disabled?: boolean;
}

class ListProductsService {
    async execute({ disabled = false }: ListProductsRequest) {
        try {
            
            const products = await prismaClient.product.findMany({
            where: {
                disabled,
            },
            orderBy: {
                created_at: 'desc',
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

            return products;
        } catch (err){
            throw new Error("Falha ao buscar produtos");
        }
    }
};

export { ListProductsService };
