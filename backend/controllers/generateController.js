export const generateDescription = (req, res, next) => {
    try{
        const {productName,category,keyFeatures}=req.body;
        if(!productName || !category || !keyFeatures){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        const description=`The ${productName} is a premium ${category} product featuring ${keyFeatures.join(", ")}. It offers excellent quality and performance for everyday use.`;
        res.status(200).json({
            success:true,
            description
        });
    }
    catch(error){
        next(error);
    }
}