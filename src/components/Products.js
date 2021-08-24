import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { fetchProducts } from "../actions/productActions";
import {addToCart} from "../actions/cartActions";
import {connect} from 'react-redux';
import React,{Component} from 'react';
class Products extends Component{
     constructor(props)
     {
         super(props);
         this.state={
            product:null
         }
     }
    componentDidMount(){
        this.props.fetchProducts();
    }

    openModel=(product)=>{
         this.setState({product})
    }
    closeModal=()=>{
        this.setState({product:null})
    }
    render(){
        const {product} =this.state;
        return(
            <> 
              <div className="main-pro">
              <Fade bottom casecade>
               { 
              
                   !this.props.products ? (<h1>loading</h1>):(
                       <div className="main-sec"> 
                           {this.props.products.map(
                               (product) =>{
                                   return(<>
                                   <div className="mid-sec">
                                
                                   <a href={"#" + product._id} onClick={ () => this.openModel(product)}>
                                    
            
                                     <div className="mid" key={product._id}> <img src={product.image} alt={product.title} 
                                     style={{width:"15rem",height:"15rem"}}/>
                                      <div style={{width:"10rem", fontSize:"9px",fontFamily:"fantasy", marginTop:"1rem"}}>
                                        <h1 style={{fontFamily:"fantasy",fontStyle:"inherit",fontSize:"15px", marginLeft:"1rem", color:"white"}}>{product.title}</h1>
                                        <h1 style={{fontFamily:"fantasy",fontStyle:"inherit",fontSize:"15px", marginLeft:"1rem", color:"white"}}>{product.price}{"$"}</h1>
                                        </div></div>
                                    </a>
                                       <button onClick={() => this.props.addToCart(product)} key={product._id} style={{width:"6rem", height:"2rem", marginTop:"1rem", marginBottom:"1rem"}}>AddToCart</button>
                                       </div>
                                     </>
                                   )
                               }
                           )}

                           
                           
                       </div>
                   )
               }  </Fade>
               </div>
               
             {product &&(
                 <Modal isOpen={true} onRequestClose ={this.closeModal}>
                   <Zoom >
                    
                   <div className="zoom-model">
                     <div className="section-end">
                     <div ><img src={product.image} alt={product.title} style={{width:"15rem"}}/></div>
                      <section>
                      <div style={{marginLeft:"5rem"}}>{product.title}</div>
                      <div style={{marginLeft:"5rem", lineHeight:"3rem"}}><h3>Price {""} {formatCurrency(product.price)}</h3></div>
                      <div style={{marginLeft:"5rem"}}><h5>AvailableSize {" "} {""} {product.availableSizes}</h5></div>
                      <div className="log" style={{display:"flex"}}>
                      <div style={{}}><button onClick={() => {this.props.addToCart(product); this.closeModal();}} style={{marginLeft:"5rem", marginTop:"1rem", padding:"1rem"}}>AddToCart</button></div>
                      <div><button onClick={()=> {this.closeModal()}} style={{marginTop:"1rem",marginLeft:"2rem", padding:"1rem",width:"5rem"}}>X</button></div>
                      </div>
                  
                     </section> </div>
                     
                    </div>
                    
                   </Zoom>
                   
                 </Modal>
               )
             }
            </>
        )
    }
}


export default connect(
  (state)=> 
({products:state.products.filteredItems}),
{fetchProducts,addToCart})(Products);
