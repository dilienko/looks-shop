import { useState } from "react";
import Card from "../components/Card";
import FilterSelect from "../components/FilterSelect";
import PageHeader from "../components/PageHeader";
import {
   categoryParams,
   products,
   rateParams,
   sortParams,
} from "../utils/content";
import "./styles/shop-list.css";

function ShopList() {
   const allRates = rateParams.map((item) => item.value);
   const allCategories = categoryParams.map((item) => item.value);

   const [sortType, setSortType] = useState("popularity");
   const [categories, setCategories] = useState(allCategories);
   const [rates, setRates] = useState(allRates);

   const changeSort = (e) => {
      setSortType(e.value);
   };

   const changeCategory = (e) => {
      if (e.length === 0) {
         setCategories(allCategories);
      } else {
         setCategories(e.map((item) => item.value));
      }
   };

   const changeRates = (e) => {
      if (e.length === 0) {
         setRates(allRates);
      } else {
         setRates(e.map((item) => item.value));
      }
   };

   return (
      <>
         <PageHeader header='SHOP LIST' />
         <section className='main-block main-block_background_white main-block_position_relative'>
            <div className='content-container'>
               <div className='filters-block'>
                  <FilterSelect
                     options={categoryParams}
                     onChange={changeCategory}
                     defaultValue=''
                     isMulti={true}
                     placeholder='Categories'
                  />
                  <FilterSelect
                     options={rateParams}
                     onChange={changeRates}
                     defaultValue=''
                     isMulti={true}
                     placeholder='Rates'
                  />
                  <FilterSelect
                     options={sortParams}
                     onChange={changeSort}
                     defaultValue={{ value: "popularity", label: "Popularity" }}
                     isMulti={false}
                     placeholder='Sort by'
                  />
               </div>

               <div className='product-block'>
                  {products
                     .sort((a, b) => {
                        return sortType === "popularity"
                           ? b.rate - a.rate
                           : sortType === "cheap-first"
                           ? a.price - b.price
                           : b.price - a.price;
                     })
                     .filter((item) => {
                        return (
                           categories.includes(item.category) &&
                           item.rate >= Math.min.apply(null, rates)
                        );
                     })
                     .map((item) => (
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
      </>
   );
}

export default ShopList;
