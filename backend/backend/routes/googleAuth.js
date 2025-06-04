const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models');
require('dotenv').config();
const router = express.Router();

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

async function getUserData(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  return await response.json();
}

router.get('/login', (req, res) => {
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'openid',
    ],
    prompt: 'consent',
  });
  res.redirect(authorizeUrl);
});

router.get('/oauth', async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) throw new Error("No authorization code provided");
    const { tokens } = await oAuth2Client.getToken(code);
    const userData = await getUserData(tokens.access_token);

    if (!userData.sub) throw new Error("No Google ID provided");
    let user = await User.findOne({ where: { email: userData.email } });
    // let redirectMessage = 'login'; // Mặc định là login
    if (!user) {
      user = await User.create({
        username: userData.name || userData.email.split('@')[0],
        email: userData.email,
        googleId: userData.sub,
        avatar: userData.picture || "https://static.vecteezy.com/system/resources/thumbnails/019/896/012/small_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
        password: null,
      });
      await user.save();
    } else {
      user.googleId = userData.sub;
      user.avatar = userData.picture || "https://static.vecteezy.com/system/resources/thumbnails/019/896/012/small_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png";
      await user.save();
    }
    user.password = "";
        // console.log('before token');
        
        const token = user.getJwtToken();
        // console.log(token);
        
        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: false,
            sameSite: "lax",
            secure: false,
        };
        
        
         res.clearCookie("token", options);
         res.cookie("token", token, options);
         return res.redirect("http://localhost:5173");

    } catch (error) {
    
        console.error("Google OAuth error:", error);
        res.redirect("http://localhost:5173/register?error=auth_failed");
    }
});

module.exports = router;