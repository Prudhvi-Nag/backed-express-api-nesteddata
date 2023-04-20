const express = require('express');
// const router = express.Router();

const Product = require('../models/products');


// // CREATE a new product
// router.post('/', async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     await product.save();
//     res.status(201).send(product); 
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // READ all products
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).send(products);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // READ a single product by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).send();
//     }
//     res.status(200).send(product);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // UPDATE a product by ID
// router.patch('/:id', async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ['role', 'data'];
//   const isValidOperation = updates.every(update => allowedUpdates.includes(update));

//   if (!isValidOperation) {
//     return res.status(400).send({ error: 'Invalid updates!' });
//   }

//   try {
//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!product) {
//       return res.status(404).send();
//     }
//     res.status(200).send(product);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // DELETE a product by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) {
//       return res.status(404).send();
//     }
//     res.status(200).send(product);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// module.exports = router;




//create a products
const createProduct = async function(req,res,next){
  try {
    const { category, data } = req.body;
    const product = new Product({ category, data });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

 
    // try {
    //   const { role } = req.body;
    //   const resData=req.body.data
    //   // const user_id=req._id.toString();
    //   // console.log("user_id");

      

    //   await Product.findOne({"role":role})
      
    //   .then((product)=>{
    //     // console.log(product.role);
    //     const newProId=product._id;
    //     const newPro=product.role;
    //     const newProData=product.data
    //     // console.log(product.data);


    //     const arr=[...newProData,...resData]

    //     const obj={_id:newProId,role:newPro,data:arr}
    //     console.log(obj);
    //     return res.send(obj)

    //     // const arr={...product.data,...resData}
        
    //     // product.data.push(resData)
    //     // const newDta={...product,arr}
    //     // console.log(newDta)
    //     // return product.save()
    //     // .then((data)=>{
    //       //  res.send(newDta)
    //     // }).catch(err =>{
    //     //   res.status(404).send(err)
    //     //   console.log(err)
    //     // })
    //   })
    //     // const product = new Product({ role, data });
    //     // // await product.save();
    //     // res.status(200).send(product);
    //   } catch (error) {
    //     //console.log(req.body.role)
    //     //console.log(req.body.data)
    //     res.status(400).send(error);
    //   } 

}

// read all products

const getProducts = async function(req,res,next){
// try{
//     const products = await Product.find();
//     res.status(200).send(products);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// try {
//   const products = await Product.aggregate([
//     {
      
//       $group: {
//         _id: '$category',
//         data: { $push: '$data' },
//       },
//     },
//   ]);
//   res.json(products);
// } catch (err) {
//   console.error(err.message);
//   res.status(500).send('Server Error');
// }
try {
  const products = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        data: { $push: "$data" }
      }
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        data: 1
      }
    }
  ]);
  res.json(products);
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
}

}
// read product by id
const getProduct = async function(req,res,next){

  try {
    const product = await Product.findOne({ "data._id": req.params.id });
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const getCategory = async function(req,res,next){
  
}
// update by id
const updateProduct = async function(req,res,next){
    //  try {
    //     const allowedUpdates = ['role', 'data'];
    //     let isValidOperation = true;
    //     for (let update in req.body) {
    //       if (!allowedUpdates.includes(update)) {
    //         isValidOperation = false;
    //         break;
    //       }
    //     }
    //     if (!isValidOperation) {
    //       return res.status(400).send({ error: 'Invalid updates!' });
    //     }
    //     console.log({"data._id": req.params.id});
    
    //     const product = await Product.updateOne({ "data._id": req.params.id },req.body, { new: true });
    //     // if (!product) {
    //     //   return res.status(404).send();

    //     // }
    
    //     res.status(200).send(product);
    //   } catch (error) {
    //     res.status(400).send(error);
    //   }

    try {
      const product = await Product.findOneAndUpdate(
        { "data._id": req.params.id },
        {
          $set: {
            'data.title': req.body.title,
            'data.image': req.body.image,
            'data.price': req.body.price,
            'data.prePrice': req.body.prePrice,
            'data.discount': req.body.discount
          }
        },
        {
          new: true,
          projection: {
            _id: '$data._id',
            title: '$data.title',
            image: '$data.image',
            price: '$data.price',
            prePrice: '$data.prePrice',
            discount: '$data.discount'
          }
        }
      );
  
      if (!product) {
        return res.status(404).send('Product not found');
      }
  
      res.send(product);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
}

// delete product by id
const deleteProduct = async function(req,res,next){
    try {
        const product = await Product.deleteOne({ "data._id": req.params.id });
        if (!product) {
          return res.status(404).send();
        }
        res.status(200).send(product);
      } catch (error) {
        res.status(500).send(error);
      }



}


module.exports = {getProducts,getProduct,createProduct,updateProduct,deleteProduct,getCategory}



