import React from 'react';
import { Link } from 'react-router-dom'


export default function CategoriesItem({ category }) {
  console.log(category);
  return (
    <div>
      <Link to={`/category/${category}`}>{category}</Link>
    </div>
  )
}