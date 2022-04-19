import React from 'react';
export default function Rating({ product }) {
  return (
    <div className="rating">
      <span>
        <i
          className={
            product.rating >= 1
              ? 'fa fa-star'
              : product.rating >= 0.5
                ? 'fa fa-star-half-o'
                : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            product.rating >= 2
              ? 'fa fa-star'
              : product.rating >= 1.5
                ? 'fa fa-star-half-o'
                : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            product.rating >= 3
              ? 'fa fa-star'
              : product.rating >= 2.5
                ? 'fa fa-star-half-o'
                : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            product.rating >= 4
              ? 'fa fa-star'
              : product.rating >= 3.5
                ? 'fa fa-star-half-o'
                : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            product.rating >= 5
              ? 'fa fa-star'
              : product.rating >= 4.5
                ? 'fa fa-star-half-o'
                : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span className='numReviews '>{product.numReviews + ' بازدید'}</span>
    </div>
  );
}