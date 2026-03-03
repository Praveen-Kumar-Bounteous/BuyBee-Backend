import { Cart } from './cart.model.js';
import { Product } from '../product/product.model.js';
import type { ICart } from './cart.interface.js';

export class CartService {
  static async getCartByUserId(user_id: string): Promise<ICart | null> {
    const cart = await Cart.findOne({ user_id }).populate('items.product_id').lean();
    return cart as unknown as ICart;
  }

  static async addToCart(user_id: string, product_id: string, quantity: number): Promise<ICart> {
    // 1. Get product to find current price
    const product = await Product.findById(product_id);
    if (!product) throw new Error("Product not found");

    const itemPrice = product.price * quantity;

    // 2. Find existing cart
    let cart = await Cart.findOne({ user_id });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = await Cart.create({
        user_id,
        items: [{ product_id, quantity, total_price: itemPrice }]
      });
    } else {
      // 3. Check if product already in items[]
      const itemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id);

      if (itemIndex > -1) {
        // Corporate Standard: Get reference to the specific item to satisfy TS compiler
        const existingItem = cart.items[itemIndex];
        
        if (existingItem) {
            existingItem.quantity += quantity;
            // Strict calculation based on product price as per diagram
            existingItem.total_price = existingItem.quantity * product.price;
        }
      } else {
        // Add new item if not found in array
        cart.items.push({ 
            product_id: product_id as any, 
            quantity, 
            total_price: itemPrice 
        });
      }
      await cart.save();
    }
    
    // Final return cast to match Interface
    return cart.toObject() as unknown as ICart;
  }

  static async clearCart(user_id: string) {
    return await Cart.findOneAndUpdate({ user_id }, { items: [] }, { new: true });
  }
}