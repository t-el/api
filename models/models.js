import mongoose from 'mongoose';
const { Schema } = mongoose;



/*{

  "reference": "String",
  "name": "String",
  "description": "String",
  "image": "String",
  "variants": [
    {
      "sku": "String",
      "specification": "String",
      "price": "Number"
    }
  ]
}*/


const variantSchema = new Schema({
  sku: {type: String,
              required : true
              },

  specification: {type: String,
        required : true
        },

  price:   {type: Number,
          required : true
          }

});

const productSchema = new Schema({
  reference: {type: String,
              required : true
              },

  name: {type: String,
        required : true
        },
  description: {type: String,
                required : true
                },

  image: {type: String,
          required : true
          },

   variants : [variantSchema]

});


const Variant = mongoose.model('Variant',variantSchema);
const Product = mongoose.model('Product',productSchema);

/*
GET	/product/	List des produits
POST	/product/	Ajout de produit
DELETE	/product/{:product_id}	Suppression de produit
PATCH	/product/{:product_id}	Mise à jour de produit
GET	/product/{:product_id}/variants/	List des variantes d'un produit {product_id}
GET	/product/{:product_id}/variants/{:variant_id}	List de la variante {variant_id} du produit {product_id}
GET	/product/{:product_id}	List du produit {product_id}
*/

const getAllProducts = () =>{
  Product.find({},(err,resaults) =>{
    if (err)
      return console.log(err);

    return resaults
  });
}

const addProduct = (product) =>{
  let p = new Product(product)
  p.save((err, resault) => {
     if (err) return console.log(err);
     return resault
   });
}



 export {
  Variant,
  Product
}
