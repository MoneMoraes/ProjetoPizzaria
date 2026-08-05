
import { z } from "zod"

export const CreateProductSchema = z.object({
    body: z.object({
        name: z.string().min(1, { message: "O nome do produto é obrigatório" }),
        price: z.string().min(1, { message: "O valor do produto é obrigatório" }).regex(/^\d+$/), //regex para validar se o valor é um numero inteiro.
        description: z
            .string()
            .min(1, { message:"A descrição do produto é obrigatória"}),
        category_id: z
            .string({ message: "A categoria do produto é obrigatória"}),
    }),
});

export const listProductsSchema = z.object({
    query: z.object({
        disabled: z.string().optional()
    }),
});

export const listProductsByCategorySchema = z.object({
    query: z.object({
        category_id: z
            .string({ message: "O ID da categoria é obrigatório" }),
    }),
});