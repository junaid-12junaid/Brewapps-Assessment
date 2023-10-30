const bookModel = require('../Models/bookModel');

const {
    isValid,
    isVAlidRequestBody,
    objectIdValid,
    titleRegex,
    nameRegex
  } = require('../validators/validator');

const createBook = async function (req, res) {
    try {
      data = req.body;
  
      const { title, summary, author } = data;

      if (!isVAlidRequestBody(data))
        return res
          .status(400)
          .send({
            status: false,
            message: 'Please provide the input to create the Books',
          });
  
      if (!isValid(title))
        return res
          .status(400)
          .send({
            status: false,
            message: 'title is mandatory and should have non empty String',
          });
  
          if(!titleRegex.test(title)) return res.status(400).send({status: false,message: 'Give valid title for Book'});
  
          //checking Unique Title
      if (await bookModel.findOne({ title }))
        return res
          .status(400)
          .send({
            status: false,
            message: 'title is Already created Please give Another title',
          });
  
      if (!isValid(author))
        return res
          .status(400)
          .send({
            status: false,
            message: 'author is mandatory and should have non empty String',
          });

          if(!nameRegex.test(author)) return res.status(400).send({status: false,message: 'Give valid author name for Book'});
  
      if (!isValid(summary))
        return res
          .status(400)
          .send({
            status: false,
            message: 'summary is mandatory and should have non empty String',
          });
  
  
      const bookCreated = await bookModel.create(data);
  
      return res
        .status(201)
        .send({ status: true, message: 'Success', data: bookCreated });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };


  const getAllbooks = async function (req, res) {
    try {
     
  
      let filter={isDeleted:false}
  
      let gettingData = await bookModel
        .find(filter)
        .select({
          title: 1,
          author: 1,
          summary: 1
        })
    
      if (gettingData.length == 0) {
        return res
          .status(404)
          .send({ status: false,message:"No documents found"});
      }

      return res
        .status(200)
        .send({
          status: true,
          msg: 'Books list',
          BooksCount:gettingData.length,
          data: gettingData,
        });
     
    } catch (err) {
      return res.status(500).send({ staus: false, error: err.message });
    }
  };

  const getbookByParams = async function (req, res) {
    try {
     
        let data = req.params.bookId;

   if(!objectIdValid(data)) return res.status(400).send({staus:false,message:"Please give valid BookId"})

      
        let getBookData = await bookModel.findById({_id:data});

        if (!getBookData) return res.status(404).send({ status: false, message: 'No Book found' });

        if (getBookData.isDeleted == true) return res.status(400).send({staus:false,message:'This book is deleted'});
    
        let {_id,title, author,
            summary} = getBookData

      return res
        .status(200)
        .send({
          status: true,
          msg: 'Details of Book',
          data: {
            _id,title, author,
            summary
          }
        });
     
    } catch (err) {
      return res.status(500).send({ staus: false, error: err.message });
    }
  };
  


  const updateBook=async function(req,res){
    try {
      
      let bookId = req.params.bookId;
  
      if(!objectIdValid(bookId)) return res.status(400).send({staus:false,message:"the BookId is not Valid"})
  
      let getBookData = await bookModel.findById({_id:bookId});
  
      if (!getBookData) return res.status(404).send({ status: false, message: 'No Book found' });
  
      if(getBookData.isDeleted==true) return res.status(400).send({ status: false, message: 'The Book is already deleted' });
  
     
  
        let data = req.body
  
       let {title,author,summary}=data
  
       if (!isVAlidRequestBody(data)) return res.status(400).send({status: false,message: 'Please provide the input to Update the Book'});
  
       if(Object.keys(data).length>3) return res.status(400).send({status: false,message: 'Only 4 inputs are allowed to update the Book'});
       
      if(title){
  
        if (!isValid(title))
        return res
          .status(400)
          .send({
            status: false,
            message: 'title is empty',
          });
  
          if(!titleRegex.test(title)) return res.status(400).send({status: false,message: 'Give valid title for Book'});
  
      if (await bookModel.findOne({ title }))
        return res
          .status(400)
          .send({
            status: false,
            message: 'With this title the book is already present, Please provide unique title to update',
          });
        }
  
        if(author){
      if (!isValid(author))
        return res
          .status(400)
          .send({
            status: false,
            message: 'author is empty ',
          });

          if(!nameRegex.test(author)) return res.status(400).send({status: false,message: 'Give valid author name for Book'});
          
        }

        if(summary){
      if (!isValid(summary))
        return res
          .status(400)
          .send({
            status: false,
            message: 'summary is empty ',
          });

          

        }
  
          
            const updateBook=await bookModel.findOneAndUpdate({_id:bookId}, {$set:{title: title, author: author, summary: summary }},{new:true}).select({__v:0})
            
            return res.status(200).send({staus:true,message:"Success",data:updateBook})
      
    } catch (err) {
      res.status(500).send({ status: false, message: err.message });
    }
  }



  const deleteBook = async function (req,res){
    try {
      let bookId = req.params.bookId;
  
      if(!objectIdValid(bookId)) return res.status(400).send({staus:false,message:"the BookId should be in 24 character"})
  
      let book = await bookModel.findById(bookId);
  
      if(!book){
        return res.status(404).send({staus:false,message:"This book is doesn't exist"});
      }
  
      if (book.isDeleted == true) {
        return res.status(400).send({staus:false,message:"This book is already deleted"});
      }
      
      
     
        let deleteBook = await bookModel.findOneAndUpdate({ _id: bookId },{ isDeleted: true },{ new: true });
        return res.status(200).send({status: true,message: "book is deleted successfully"});
    
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  };

  module.exports = { createBook ,getAllbooks,getbookByParams,updateBook,deleteBook};
