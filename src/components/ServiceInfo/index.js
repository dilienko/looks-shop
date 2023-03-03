import "./index.css";

function ServiceInfo({ image, header, description }) {
   return (
      <div className='service-information__item'>
         <div className='service-information__logo'>
            <img src={image} alt='icon' />
         </div>
         <div className='service-description'>
            <div className='service-description__header'>{header}</div>
            <div className='service-description__text'>{description}</div>
         </div>
      </div>
   );
}

export default ServiceInfo;
