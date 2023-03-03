/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { AppContext } from "..";
import BlockHeader from "../components/BlockHeader";
import Card from "../components/Card";
import InstagramPost from "../components/InstagramPost";
import ServiceInfo from "../components/ServiceInfo";
import { headerFilters, products, serviceInfo } from "../utils/content";
import { instagramLinks } from "../utils/links";
import "./styles/home.css";

function Home() {
   const { auth } = useContext(AppContext);

   return (
      <>
         <section className='main-block main-block_background_main-image'>
            <div className='content-container'>
               <div className='main-block__header'>STYLE FOR EVERYONE</div>
            </div>
         </section>

         <section className='main-block main-block_background_blue'>
            <div className='content-container'>
               <div className='information-blocks'>
                  <div className='information-blocks__item information-blocks__image information-blocks_outline'>
                     <img
                        src='https://i.postimg.cc/mD6N90fG/autumn-collection.jpg'
                        alt='autumn-collection'
                     />
                     <div className='information-blocks__cover'>
                        <p className='informarion-block__first-line'>
                           <span style={{ color: "rgb(189, 142, 54)" }}>
                              AUTUMN
                           </span>
                           {" COLLECTION"}
                        </p>
                        <p className='informarion-block__second-line'>2022</p>
                     </div>
                  </div>
                  <div className='information-blocks__item information-blocks__image'>
                     <img
                        src='https://i.postimg.cc/J0fN6Zz6/belt-collection.jpg'
                        alt='belt-collection'
                     />
                     <div className='information-blocks__cover'>
                        <p className='informarion-block__first-line'>
                           50% OFFER <br /> BELT
                           <span style={{ color: "#7998cc" }}> COLLECTION</span>
                        </p>
                        <p className='informarion-block__second-line_normal'>
                           <a style={{ cursor: "pointer" }}>See more...</a>
                        </p>
                     </div>
                  </div>
               </div>
               <div className='service-information'>
                  {serviceInfo.map(({ image, header, description }) => (
                     <ServiceInfo
                        key={image}
                        image={image}
                        header={header}
                        description={description}
                     />
                  ))}
               </div>
            </div>
         </section>

         <section className='main-block main-block_background_white'>
            <div className='content-container'>
               <BlockHeader header={"NEW COLLECTION"} filters={headerFilters} />
               <div className='product-block'>
                  {products.slice(0, 8).map((item) => (
                     <Card
                        image={item.image}
                        price={item.price}
                        id={item.id}
                        key={item.id}
                     />
                  ))}
               </div>
            </div>
         </section>

         <section className='main-block main-block_background_blue main-block_size_medium'>
            <div className='content-container container-centered-element'>
               <div className='personal-assistent'>
                  <div className='personal-assistent__text'>
                     <p>
                        PERSONAL <span>ASSISTENT</span>
                     </p>
                     <p>You don't know what to choose? We will help you.</p>
                  </div>
                  <button className='personal-assistent__button'>
                     VIEW COLLECTION
                  </button>
               </div>
            </div>
         </section>

         <section className='main-block main-block_background_blue'>
            <div className='content-container'>
               <BlockHeader header={"FEATURED"} filters={headerFilters} />
               <div className='product-block'>
                  {products.slice(9, 13).map((item) => (
                     <Card
                        image={item.image}
                        price={item.price}
                        id={item.id}
                        key={item.id}
                     />
                  ))}
               </div>
            </div>
         </section>

         <section className='main-block main-block_background_white'>
            <div className='content-container'>
               <BlockHeader header={"INSTAGRAM FEED"} />
               <div className='product-block'>
                  {instagramLinks.map((link) => (
                     <InstagramPost link={link} key={link} />
                  ))}
               </div>

               <div className='information-blocks'>
                  <div className='information-blocks__item information-blocks__image information-blocks_outline'>
                     <img
                        src='https://i.postimg.cc/Y9NTJKGw/clothes.webp'
                        alt='collection'
                     />
                  </div>
                  <div className='information-blocks__item information-blocks__image'>
                     <img
                        src='https://i.postimg.cc/TPVkPjRV/new-men-collection.jpg'
                        alt='collection'
                     />
                     <div className='information-blocks__cover'>
                        <p className='informarion-block__first-line'>
                           new <br /> men's collection
                        </p>
                        <p className='informarion-block__second-line'>
                           coming soon
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}

export default Home;
