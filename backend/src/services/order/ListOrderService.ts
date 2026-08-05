import prismaClient from '../../prisma';

interface ListOrdersRequest {
    draft?: string;
}

class ListOrdersService {
    async execute({ draft } : ListOrdersRequest ) {
        const orders = await prismaClient.order.findMany({
            where: {
                draft: draft === 'true' ? true : false,
            },
            orderBy: {
                created_at: 'desc',
            },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                description: true,
                                banner: true,
                            },
                        },
                    },
                },
            },
        });

        return orders;
    }
}

export { ListOrdersService };