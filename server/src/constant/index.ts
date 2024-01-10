import { Image } from '../models/image';
import { GroupImage } from '../models/groupImage';
import { User } from '../models/users';
import { Location } from '../models/location';

export class Constant {
  static generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    while (result.length < length) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const character = characters.charAt(randomIndex);

      if (/[a-zA-Z0-9]/.test(character)) {
        result += character;
      }
    }

    return result;
  }
  static async getImageUrl(groupImageId: number): Promise<string> {
    const groupImage = await GroupImage.findByPk(groupImageId);
    if (groupImage) {
      const imageUrl = await Image.findByPk(groupImage.image_id);
      if (imageUrl) {
        return imageUrl.image;
      }
      return '';
    }
    return '';
  }
  static async getUserShopName(userId: number): Promise<string> {
    const user = await User.findByPk(userId);
    if (user) {
      return user.coffeeShopName;
    }
    return '';
  }
  static async getAddress(locationId: number): Promise<string> {
    const location = await Location.findByPk(locationId);
    if (location) {
      return location.address;
    }
    return '';
  }
}
