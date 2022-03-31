import { AxiosInstance } from 'axios';

import { AxiosPromise, V2OrderCouponsResponseBase, V2OrderFiltersBase } from '../../../../types';
import { paginateById } from '../../../../utils/paginate';

import { getOrdersPath } from './index';

class OrderCoupons {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  /**
   * List all coupons associated with an order
   *
   * @param orderId A valid order ID
   * @returns Promise resolving to a response containing the list of coupons associated with an order
   */
  list(orderId: number, params?: V2OrderFiltersBase): AxiosPromise<V2OrderCouponsResponseBase[]> {
    return this.client.get(`${getOrdersPath(orderId)}/coupons`, { params });
  }

  /**
   * Returns an iterator object allowing you to paginate through all coupons on an order, one coupon at a time
   *
   * @example
   * for await (const coupon of bcRest.orderCoupons.listAll(orderId)) {
   *   console.log(coupon);
   * }
   *
   * @param params Query parameters used to filter response
   * @returns Promise resolving to an order coupon list iterator object
   */
  listAll(orderId: number, params?: V2OrderFiltersBase): AsyncGenerator<V2OrderCouponsResponseBase, void, unknown> {
    return paginateById((id: number, args?: V2OrderFiltersBase) => this.list(id, args), orderId, params);
  }
}

export default OrderCoupons;
