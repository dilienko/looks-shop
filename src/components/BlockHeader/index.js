import "./index.css";

function BlockHeader({ header, filters }) {
   return (
      <div className='main-block-header'>
         <div className='main-block-header__text'>{header}</div>
         {filters?.length ? (
            <div className='main-block-header__filters'>
               {filters.map((item) => (
                  <span className='block-header__filters-item' key={item}>
                     {item}
                  </span>
               ))}
            </div>
         ) : null}
      </div>
   );
}

export default BlockHeader;
