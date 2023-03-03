function PageHeader({ header }) {
   return (
      <>
         <section className='main-block main-block_background_shoplist-image'>
            <div className='content-container'>
               <div className='main-block__header'>{header}</div>
            </div>
         </section>
      </>
   );
}

export default PageHeader;
