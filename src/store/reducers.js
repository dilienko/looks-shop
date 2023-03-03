const defaultState = {
   selectedItems: {},
};

export const cartReducer = (state = defaultState, action) => {
   switch (action.type) {
      case "ADD_ITEM":
         return {
            ...state,
            selectedItems: { ...state.selectedItems, ...action.newItem },
         };
      case "REMOVE_ITEM":
         const copiedObj = { ...state.selectedItems };
         delete copiedObj[action.id];
         return {
            ...state,
            selectedItems: copiedObj,
         };
      default:
         return state;
   }
};
