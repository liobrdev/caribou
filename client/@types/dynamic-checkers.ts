import { IInventoryItem } from '@/types';


export const checkInventoryItem = (item: any): IInventoryItem => {
  if (
    !!item &&
    !!item.id && typeof item.id === 'number' &&
    !!item.name && typeof item.name === 'string' &&
    typeof item.stock === 'number' &&
    typeof item.capacity === 'number'
  ) {
    const obj: IInventoryItem = {
      id: item.id,
      name: item.name,
      stock: item.stock,
      capacity: item.capacity,
    };

    return obj;
  }

  throw new Error("Failed 'checkInventoryItem'");
};
