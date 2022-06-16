import { Component, FormEvent, MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {
  InventoryRetrieveItems,
  ItemRow,
  LoadingView,
  SliderCheckbox,
} from '@/components';
import { AppDispatch, AppState, IErrorInfo } from '@/types';
import { parseErrorResponse, request } from '@/utils';


class InventoryForm extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleToggleLowStock = this.handleToggleLowStock.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleToggleLowStock(e: FormEvent<HTMLInputElement>) {
    const lowStockOn = (e.target as HTMLInputElement).checked;

    if (lowStockOn) this.props.lowStockShow();
    else this.props.lowStockClose();
  }

  handleReset(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    this.props.restockReset();
  }

  async handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { cart } = this.props;
    let cartEmpty = true;

    for (const itemId in this.props.cart) {
      if (cart[itemId] > 0) {
        cartEmpty = false;
        break;
      }
    }

    if (cartEmpty) {
      this.props.restockError({
        detail: [{ id: uuidv4(), msg: 'Cart is empty.' }],
      });
      return;
    }

    this.props.startSendCart();

    try {
      await request
        .post('/restock-cost')
        .send({ ...cart })
        .then((res) => {
          this.props.successSendCart(res.body.lowestTotalRestockCost);
        });
    } catch (err: any) {
      console.error(err);
      const errorRestock = parseErrorResponse(err?.response.body, []);
      this.props.restockError(errorRestock);
    } finally {
      this.props.stopSendCart();
    }
  }

  render() {
    const {
      items,
      isRetrieving,
      lowStockOn,
      errorRetrieve,
      isSending,
      lowestTotalRestockCost,
      errorRestock,
    } = this.props;

    return (
      <form
        className='InventoryForm'
        id='formInventory'
        onSubmit={this.handleSubmit}
      >
        <InventoryRetrieveItems />
        <h3>Current Inventory</h3>
        <SliderCheckbox
          className='InventoryForm-checkbox'
          label='Show Low-Stock Items'
          type='checkbox'
          name='lowStockOn'
          checked={lowStockOn}
          disabled={isRetrieving || isSending}
          onChange={this.handleToggleLowStock}
        />
        <div
          className={`InventoryForm-table-container${
            !items.length ? ' is-loading' : ''
          }`}
        >
          <table className='InventoryForm-table'>
            <thead>
              <tr>
                <td>SKU</td>
                <td>Item Name</td>
                <td>Amount in Stock</td>
                <td>Capacity</td>
                <td>Order Amount</td>
              </tr>
            </thead>
            <tbody>
              {!!items.length ? items.map(
                item => <ItemRow key={item.id} item={item} />
              ) : <LoadingView className='LoadingView--table' />}
            </tbody>
          </table>
        </div>
        {errorRetrieve?.nonField?.map(e => (
          <p key={e.id} className='InventoryForm-error'>{e.msg}</p>
        ))}
        {errorRetrieve?.detail?.map(e => (
          <p key={e.id} className='InventoryForm-error'>{e.msg}</p>
        ))}
        {errorRestock?.nonField?.map(e => (
          <p key={e.id} className='InventoryForm-error'>{e.msg}</p>
        ))}
        {errorRestock?.detail?.map(e => (
          <p key={e.id} className='InventoryForm-error'>{e.msg}</p>
        ))}
        <div className='InventoryForm-restock'>
          <span>
            Lowest Re-order Cost: <b>${lowestTotalRestockCost.toFixed(2)}</b>
          </span>
          <div className='InventoryForm-restock-button'>
            <button type='submit' disabled={isRetrieving || isSending}>
              Calculate
            </button>
          </div>
          <div className='InventoryForm-restock-button'>
            <button
              type='button'
              disabled={isRetrieving || isSending}
              onClick={this.handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  items: state.inventory.items,
  isRetrieving: state.inventory.isRetrieving,
  lowStockOn: state.inventory.lowStockOn,
  errorRetrieve: state.inventory.errorRetrieve,
  cart: state.restock.cart,
  isSending: state.restock.isSending,
  lowestTotalRestockCost: state.restock.lowestTotalRestockCost,
  errorRestock: state.restock.errorRestock,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  lowStockShow: () => {
    dispatch({ type: 'LOW_STOCK_SHOW' });
  },
  lowStockClose: () => {
    dispatch({ type: 'LOW_STOCK_CLOSE' });
  },
  startSendCart: () => {
    dispatch({ type: 'START_SEND_CART' });
  },
  stopSendCart: () => {
    dispatch({ type: 'STOP_SEND_CART' });
  },
  successSendCart: (lowestTotalRestockCost: number) => {
    dispatch({ type: 'SUCCESS_SEND_CART', lowestTotalRestockCost });
  },
  restockError: (errorRestock: IErrorInfo) => {
    dispatch({ type: 'RESTOCK_ERROR', errorRestock});
  },
  restockReset: () => {
    dispatch({ type: 'RESTOCK_RESET' });
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(InventoryForm);
