import React from "react";

const Configurator = ({variants, onChange}) => {
  let optionList = variants.map((option, index) => <option key={index}>{option.name}</option>)

  return <div>
    <select onChange={(event) => {
      onChange(variants.find(({name}) => name === event.target.value))
    }}>
        {optionList}
    </select>
  </div>
}

export default Configurator
