import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
        },
        async(accessToken, refreshToken, profile, done)=>{
            try{
                let user = await User.findOne({
                    googleId: profile.id
                });
                if(!user){
                    user = await User.findOne({
                        email:
                       profile.emails[0].value.toLowerCase()
                    });
                    if(user){
                        user.googleId = profile.id;
                        user.picture =
                        profile.photos?.[0]?.value || null;
                        await user.save();
                    }

                    else{
                        user = await User.create({
                            name:
                            profile.displayName,
                            email:
                            profile.emails[0].value,
                            googleId:
                            profile.id,
                            picture:
                            profile.photos?.[0]?.value || null
                        });
                    }
                }
                return done(null,user);
            }
            catch(error){
                return done(error,null);
            }
        }
    )
);
export default passport;