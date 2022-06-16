import React, { FormEvent } from 'react';

import { Input } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { IInventoryItem } from '@/types';


interface Props {
  item: IInventoryItem;
}

export default function ItemRow({ item }: Props) {
  const { cart, isSending } = useAppSelector((state) => state.restock);
  const { isRetrieving } = useAppSelector((state) => state.inventory);
  const dispatch = useAppDispatch();

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const itemId: string = (e.target as HTMLInputElement).name;
    const quantity: number = +(e.target as HTMLInputElement).value;
    dispatch({ type: 'UPDATE_CART', itemId, quantity });
  };

  const itemId = item.id.toString();
  const itemIsInCart = itemId in cart;

  return (
    <tr className='ItemRow'>
      <td className='ItemRow-cell ItemRow-cell--id'>{item.id}</td>
      <td className='ItemRow-cell ItemRow-cell--name'>{item.name}</td>
      <td className='ItemRow-cell ItemRow-cell--stock'>{item.stock}</td>
      <td className='ItemRow-cell ItemRow-cell--capacity'>{item.capacity}</td>
      <td className='ItemRow-cell ItemRow-cell--order'>
        <Input
          className='ItemRow-input'
          type='number'
          name={itemId}
          value={itemIsInCart ? cart[itemId] : 0}
          min={0}
          max={item.capacity - item.stock}
          onChange={handleInput}
          disabled={item.capacity === item.stock || isSending || isRetrieving}
        />
      </td>
    </tr>
  );
}
