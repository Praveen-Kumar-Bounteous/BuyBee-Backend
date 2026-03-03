import { Order } from './order.model.js';
import { Cart } from '../cart/cart.model.js';
import type { IOrder } from './order.interface.js';
import type { IAddress } from '../auth/auth.interface.js';

export class OrderService {
  /**
   * Place an order using current Cart items
   */
  static async placeOrder(user_id: string, payment_method: string, shipping_address: IAddress): Promise<IOrder> {
    // 1. Fetch current cart
    const cart = await Cart.findOne({ user_id });
    
    // Check if cart exists and has items
    if (!cart || !cart.items || cart.items.length === 0) {
      throw new Error("Cannot place order with an empty cart");
    }

    // 2. Set expected delivery (7 days from now)
    const expected_delivery = new Date();
    expected_delivery.setDate(expected_delivery.getDate() + 7);

    // 3. Create the order using cart items
    const order = await Order.create({
      user_id,
      items: cart.items,
      payment_method,
      expected_delivery,
      shipping_address
    });

    // 4. Clear the cart after successful order placement
    // FIX: Using splice(0) is the Mongoose-recommended way to clear a DocumentArray 
    // without triggering Type errors or losing Mongoose array methods.
    cart.items.splice(0); 
    
    await cart.save();

    return order.toObject() as unknown as IOrder;
  }

  /**
   * Fetch order history for a specific Buyer
   */
  static async getOrderHistory(user_id: string): Promise<IOrder[]> {
    const orders = await Order.find({ user_id }).sort({ createdAt: -1 }).lean();
    return orders as unknown as IOrder[];
  }
}