import { useEffect } from 'react';
import useSWR from 'swr';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { checkInventoryItem, IInventoryItem } from '@/types';
import { parseErrorResponse, request } from '@/utils';


const fetcher = async (path: string) => {
  const res = await request.get(path);
  const items: IInventoryItem[] = [];
  for (const item of res.body) items.push(checkInventoryItem(item));
  return items;
};

export default function InventoryRetrieveItems() {
  const { lowStockOn } = useAppSelector((state) => state.inventory);
  const dispatch = useAppDispatch();

  const {
    data,
    error,
    isValidating,
  } = useSWR(lowStockOn ? '/low-stock' : '/items', fetcher);

  useEffect(() => {
    if (isValidating) {
      dispatch({ type: 'START_RETRIEVE_INVENTORY' });
    } else {
      dispatch({ type: 'STOP_RETRIEVE_INVENTORY' });
    }

    if (error) {
      const errorRetrieve = parseErrorResponse(error?.response?.body, []);
      dispatch({ type: 'INVENTORY_ERROR', errorRetrieve });
      dispatch({ type: 'SET_INVENTORY_ITEMS', items: [] });
    } else if (data) {
      dispatch({ type: 'INVENTORY_ERROR', errorRetrieve: {} });
      dispatch({ type: 'SET_INVENTORY_ITEMS', items: data });
    }
  }, [data, error, isValidating, dispatch]);

  return <></>;
}