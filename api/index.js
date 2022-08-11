import express from 'express'
const router = express.Router()
import bp from 'body-parser'

router.use(bp.json())
router.use(bp.urlencoded({ extended: true }))


router.use((req,res,next) => {
  if(req.headers.authorization){
    if(req.headers.authorization.split(' ')[1] == process.env.API_KEY){
        next()
    }else {
      res.status(403).json({error : "403 Forbidden :  Permission denied  (invalid Api key)"})

    }

  }else{
    res.status(401).json({error : "Unauthorized user , use an Api key "})
  }
})
import {
  Variant,
  Product
} from '../models/models.js'

/*
GET	/product/	List des produits
POST	/product/	Ajout de produit
DELETE	/product/{:product_id}	Suppression de produit
PATCH	/product/{:product_id}	Mise à jour de produit
GET	/product/{:product_id}/variants/	List des variantes d'un produit {product_id}
GET	/product/{:product_id}/variants/{:variant_id}	List de la variante {variant_id} du produit {product_id}
GET	/product/{:product_id}	List du produit {product_id}
*/

// GET	/product/	List des produits
router.get('/product', (req,res)=>{
    Product.find({}, function (err, docs) {
      if (err) return res.json(err)
      return res.status(200).json(docs)
    })
})

// POST	/product/	Ajout de produit
router.post('/product',(req,res)=>{
  console.log(req.body);
  let p = new Product(req.body)
  p.save(function(err,doc){
    if (err) return res.json(err)
    return res.status(201).json(doc)
  })
})

// DELETE	/product/{:product_id}	Suppression de produit
router.delete('/product/:product_id', (req,res)=>{
    Product.findByIdAndRemove(req.params.product_id, function (err, doc) {
      if (err) return res.json(err)
      return res.json(doc)
    })
})

// PATCH	/product/{:product_id}	Mise à jour de produit
router.patch('/product/:product_id', (req,res)=>{
    Product.findByIdAndUpdate(req.params.product_id,req.body , function (err,doc){
      if (err) return res.json(err)
      return res.json(doc)
    })
})

// GET	/product/{:product_id}/variants/	List des variantes d'un produit {product_id}
router.get('/product/:product_id/variants', (req,res)=>{
    Product.findById(req.params.product_id, function (err, doc){
      if (err) return res.json(err)
      return res.json(doc.variants)
    })
})

// GET	/product/{:product_id}/variants/{:variant_id}	List de la variante {variant_id} du produit {product_id}
router.get('/product/:product_id/variants/:variant_id', (req,res)=>{
    Product.findById(req.params.product_id, function (err, doc){
      if (err) return res.json(err)
      return res.json(doc.variants.id(req.params.variant_id))
      })

})

// GET	/product/{:product_id}	List du produit {product_id}
router.get('/product/:product_id', (req,res)=>{
    Product.findById(req.params.product_id, function (err, doc){
      if (err) return res.json(err)
      return res.json(doc)
      })

})


export default router
