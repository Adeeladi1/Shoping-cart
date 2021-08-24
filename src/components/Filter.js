import React from "react";
import { connect } from "react-redux";
import { filterProducts , sortProducts} from "../actions/productActions";

class Filter extends React.Component{

    render(){
        return(
            <>
            <div className="filter-container">
                <div className="filter-left">
            <select value={this.props.sort} onChange={(e) => this.props.sortProducts(this.props.filteredProducts, e.target.value)}>
                <option value="latest">Latest</option>
                <option value="smallest">Smallest</option>
                <option value="highest">Highest</option>
            </select>
            </div>
            <div className="filter-right">
       <select value={this.props.size} onChange={(e) => this.props.filterProducts(this.props.products, e.target.value)}>
           <option value="">ALL</option>
             <option value="XS">XS</option>
              <option value="S">S</option>
               <option value="M">M</option>
                 <option value="L">L</option>
                 <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
              </select>
              </div>
            </div>
              
            </>
        )
    }
}


export default
 connect((state) => ({size:state.products.size,
    products:state.products.items,
    sort:state.products.sort,
    filteredProducts:state.products.filteredItems
    }),{filterProducts,sortProducts})(Filter);

   
        