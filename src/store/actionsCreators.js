export const addItemAction = (id, item) => {
   return { type: "ADD_ITEM", newItem: { [id]: item } };
};

export const removeItemAction = (id) => {
   return { type: "REMOVE_ITEM", id };
};
