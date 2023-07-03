
const reducer = (state, action) => {
    if (action.type === 'CLEAR_CART') {
        // get previous state and update => cart = empty array
        return { ...state, cart: [] };
    }

    if (action.type === 'REMOVE') {
        return {
            ...state,
            cart: state.cart.filter((cartItem) => cartItem.id !== action.payload)
        };
    }

    // if (action.type === 'INCREASE') {
    //     // get OLD cart => iterate over it to find the item with the specified id(payload)
    //     // perform the increase operation
    //     let tempCart = state.cart.map((cartItem) => {
    //         if (cartItem.id === action.payload) {
    //             // ...->get old cartItem values => only change amount
    //             return { ...cartItem, amount: cartItem.amount + 1 };
    //         }
    //         return cartItem;
    //     });

    //     return { ...state, cart: tempCart };
    // }

    // if (action.type === 'DECREASE') {
    //     // get OLD cart => iterate over it to find the item with the specified id(payload)
    //     // perform the increase operation
    //     let tempCart = state.cart
    //         .map((cartItem) => {
    //             if (cartItem.id === action.payload) {
    //                 // ...->get old cartItem values => only change amount
    //                 return { ...cartItem, amount: cartItem.amount - 1 };
    //             }
    //             return cartItem;
    //         })
    //         // filter cart so that items with amoun === 0 will be removed
    //         .filter((cartItem) => cartItem.amount !== 0);

    //     return { ...state, cart: tempCart };
    // }

    if (action.type === 'GET_TOTALS') {
        let { total, amount } = state.cart.reduce(
            (cartTotal, cartItem) => {
                const { price, amount } = cartItem;
                const itemTotal = price * amount;

                cartTotal.total += itemTotal;
                cartTotal.amount += amount;

                return cartTotal;
            },
            {
                total: 0,
                amount: 0
            }
        );

        total = parseFloat(total.toFixed(2));

        return { ...state, total, amount };
    }

    if (action.type === "LOADING") {
        return { ...state, loading: true };
    }

    if (action.type === "DISPLAY_ITEMS") {
        return { ...state, cart: action.payload, loading: false };
    }

    if (action.type === "CHANGE_AMOUNT") {
        // get OLD cart => iterate over it to find the item with the specified id(payload)
        // perform the increase operation
        let tempCart = state.cart
            .map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    // ...->get old cartItem values => only change amount
                    // check type of operation (increase or decrease)
                    if (action.payload.type === 'increase') {
                        return { ...cartItem, amount: cartItem.amount + 1 };
                    }

                    if (action.payload.type === 'decrease') {
                        return { ...cartItem, amount: cartItem.amount - 1 };
                    }
                }
                return cartItem;
            })
            // filter cart so that items with amount === 0 will be removed
            .filter((cartItem) => cartItem.amount !== 0);

        return { ...state, cart: tempCart };
    }

    throw new Error('No matching action type');
};

export default reducer;
