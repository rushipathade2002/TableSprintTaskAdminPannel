const {z} = require('zod');


const loginSchema=z.object({
     email :z
    .string({required_error:"Email is Required"})
    .trim()
    .email({message:"Invalid Email Address"})
    .min(5, {message:"Email must be at least of 5 Character"})
    .max(255, {message:"Email must not be more than of 255 Character"}),

     password :z
    .string({required_error:"Password is Required"})
    .trim()
    .min(7, {message:"Password must be at least of 7 Character"})
    .max(1024, {message:"Password must not be more than of 1024 Character"}),
})

// creating user validation schema
const signupSchema = loginSchema.extend({
    username :z
    .string({required_error:"name is Required"})
    .trim()
    .min(3, {message:"name must be at least of 3 Character"})
    .max(255, {message:"name must not be more than of 255 Character"}),
    
    phone :z
    .string({required_error:"Phone is Required"})
    .trim()
    .min(10, {message:"phone must be at least of 10 Character"})
    .max(20, {message:"phone must not be more than of 20 Character"}),
});


module.exports ={ signupSchema, loginSchema};