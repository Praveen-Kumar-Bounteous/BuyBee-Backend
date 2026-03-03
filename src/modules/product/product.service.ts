import { Product } from './product.model.js';
import type { IProduct } from './product.interface.js';

export class ProductService {
  static async createProduct(data: Partial<IProduct>, sellerId: string): Promise<IProduct> {
    const product = await Product.create({ ...data, seller_id: sellerId });
    // Cast to unknown first, then IProduct to satisfy strict typing
    return product.toObject() as unknown as IProduct;
  }

  static async getSellerProducts(sellerId: string): Promise<IProduct[]> {
    const products = await Product.find({ seller_id: sellerId }).lean();
    return products as unknown as IProduct[];
  }

  static async getAllProducts(): Promise<IProduct[]> {
    const products = await Product.find().lean();
    return products as unknown as IProduct[];
  }

  static async updateProduct(id: string, sellerId: string, data: Partial<IProduct>): Promise<IProduct | null> {
    const product = await Product.findOneAndUpdate(
      { _id: id, seller_id: sellerId }, 
      data, 
      { new: true }
    ).lean();
    
    if (!product) return null;
    return product as unknown as IProduct;
  }

  static async deleteProduct(id: string, sellerId: string) {
    return await Product.findOneAndDelete({ _id: id, seller_id: sellerId });
  }
}