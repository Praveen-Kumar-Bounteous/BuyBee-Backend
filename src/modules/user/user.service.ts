import { User } from '../user/user.model.js';

export class UserService {
  /**
   * Fetch a user by their ID
   * Used for profile viewing and authorization checks
   */
  static async getUserById(userId: string) {
    return await User.findById(userId);
  }

  /**
   * Fetch a user by email
   * Strict variable name usage for internal queries
   */
  static async findUserByEmail(email: string) {
    return await User.findOne({ email }).select('+password');
  }

  /**
   * Update user addresses 
   * As per the 'addresses[]' field in your schema diagram
   */
  static async updateAddresses(userId: string, addresses: any[]) {
    return await User.findByIdAndUpdate(
      userId,
      { $set: { addresses: addresses } },
      { new: true }
    );
  }

  /**
   * Get user profile excluding sensitive data
   */
  static async getProfile(userId: string) {
    return await User.findById(userId).select('-password');
  }
}