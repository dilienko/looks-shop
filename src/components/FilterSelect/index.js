import Select from "react-select";

function FilterSelect({
   options,
   onChange,
   defaultValue,
   isMulti,
   placeholder,
}) {
   return (
      <Select
         options={options}
         className='filters-block__select'
         onChange={(e) => onChange(e)}
         isSearchable={false}
         defaultValue={defaultValue}
         isMulti={isMulti}
         placeholder={placeholder}
      />
   );
}

export default FilterSelect;
