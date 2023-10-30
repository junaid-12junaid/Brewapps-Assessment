const mongoose=require('mongoose')

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
    }
    
    const isVAlidRequestBody = function (requestBody) {
        return Object.keys(requestBody).length > 0
    }
    
      
    const objectIdValid = function (value) {
      return mongoose.Types.ObjectId.isValid(value);
      };

      

    const nameRegex = /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/
    
    

    const titleRegex=/^[A-Za-z\s?]+$/

module.exports={isValid,isVAlidRequestBody,objectIdValid, nameRegex,titleRegex}
