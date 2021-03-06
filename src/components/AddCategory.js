import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from './AxiosAuth';
import { InputGroup, InputGroupAddon } from 'reactstrap';

const AddCategory = ({ categories, articleId }) => {
  const [newCatId, setNewCatId] = useState(categories.length > 0 ? categories[0].id : '');

  const handleAdd = evt => {
    evt.preventDefault();

    console.log(newCatId);
    
    axiosWithAuth().post(`categories/${newCatId}/articles`, { "article_id": articleId })
      .then(res => {
        console.dir(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = evt => {
    setNewCatId(evt.target.value);
  };





  return (
    <InputGroup  className='catdiv'>
      <select className='categoryselector' onChange={handleChange}>
        <option disabled>Choose a category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <InputGroupAddon addonType="append">
        <button 
          className="btn btn-outline-secondary" 
          type="button" 
          onClick={handleAdd}
          disabled={!newCatId}
        >
          Add Category
        </button>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default AddCategory;