export const trycatchmethod = (fn) => async (req, res, next) => {
   try {
       await fn(req, res, next);
   } catch (error) {
       if (!res.headersSent) {
           next(error); 
       } else {
           console.error('Error after response sent:', error);
       }
   }
};
