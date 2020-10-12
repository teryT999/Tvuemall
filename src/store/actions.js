import { ADD_COUNTER, ADD_TOCART } from "./mutation-types"

export default {
  addCart(context,payload) {
    return new Promise((resolve,reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    if(oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
      resolve('商品数量加1')
    } else {
      payload.count = 1
      // context.cartList.push(payload)
      context.commit(ADD_TOCART, payload)
      resolve('添加到购物车成功')
    }
  })
  }
}
