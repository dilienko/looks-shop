function QuantitySelect() {
   return (
      <>
         <button className='product-description__options-item-part'>—</button>
         <input
            type='text'
            className='product-description__options-item-part'
            placeholder='1'
         />
         <button className='product-description__options-item-part'>+</button>
      </>
   );
}

export default QuantitySelect;
