const { check } = require('express-validator');

exports.validate = (method) => {
   switch (method) {
      case 'login': { /* Login page validation */
         return [
            check('username', 'Invalid Email ID!').not().isEmpty(),
            check('password', 'Password field is required!').not().isEmpty()
         ]
      }
      case 'changePassword': { /* Login page validation */
         return [
            check('oldPassword', 'Old password field is required!').not().isEmpty(),
            check('password').not().isEmpty().withMessage('New Password field is required!').custom((value, { req }) => {
               if (value !== req.body.cpassword) {
                  throw new Error('Confirm New Password does not match with the New Password!');
               } else {
                  return true;
               }
            }),
            check('cpassword', 'Confirm New Password field is required!').not().isEmpty()
         ]
      }
      case 'newUser': { /* Create new user page validation */
         return [
            check('name', 'Name field is required!').not().isEmpty(),
            check('email', 'Email address field is required!').not().isEmpty(),
            check('phone', 'Phone Number field is required!').not().isEmpty(),
            check('type', 'User Role field is required!').not().isEmpty(),
            check('password', 'Password field is required!').not().isEmpty(),
            check('cpassword', 'Confirm Password field is required!').not().isEmpty()
         ]
      }
      case 'editUser': {
         return [
            check('editName', 'Name field is required!').not().isEmpty(),
            check('editEmail', 'Email address field is required!').not().isEmpty(),
            check('editPhone', 'Phone Number field is required!').not().isEmpty()
         ]
      }
      case 'createCategory': { /* Create new land category page validation */
         return [
            check('name', 'Category name field is required!').not().isEmpty()
         ]
      }
      case 'createUserRole': {
         return [
            check('name', 'Role Name field is required!').not().isEmpty()
         ]
      }
      case 'createBlock': {
         return [
            check('state', 'State field is required!').not().isEmpty(),
            check('district', 'District field is required!').not().isEmpty(),
            check('blockName', 'Block Name field is required!').not().isEmpty(),
            check('password', 'Block Password field is required!').not().isEmpty()
         ]
      }
      case 'createGramPanchayat': {
         return [
            check('state', 'State field is required!').not().isEmpty(),
            check('district', 'District field is required!').not().isEmpty(),
            check('blockId', 'Block Name field is required!').not().isEmpty(),
            check('gramPanchayat', 'Gram Panchayat field is required!').not().isEmpty()
         ]
      }

      case 'createGramPanchayatVillage': {
         return [
            check('state', 'State field is required!').not().isEmpty(),
            check('district', 'District field is required!').not().isEmpty(),
            check('blockId', 'Block Name field is required!').not().isEmpty(),
            check('gramPanchayatId', 'Gram Panchayat field is required!').not().isEmpty(),
            check('vilageName', 'Village Name field is required!').not().isEmpty()
         ]
      }

      case 'createVaccination': {
         return [
            check('itemEnglish', 'Item field is required!').not().isEmpty(),
            check('cost', 'Cost field is required!').not().isEmpty(),
            check('noOfTime', 'Number of Times Vaccination field is required!').not().isEmpty(),
            check('interval', 'Interval field is required!').not().isEmpty()
         ]
      }
   }
}