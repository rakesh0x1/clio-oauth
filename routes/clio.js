const express = require("express");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const CLIENT_ID = "5qhfhbu2EXGTWbuJn7SJj0kazexCNRm3JMO5W2Mp";
const CLIENT_SECRET = "93qwIi53BDBMxOuIUMUg0IwephmSsIsdp8ZEAt75";
const REDIRECT_URI = "https://clio-oauth.onrender.com/callback"; // Replace with your app's callback URL
const JWT_SECRET = process.env.JWT_SECRET; // Ensure you have a secret for JWT

// Utility functions for managing users
const USERS_FILE = path.join(__dirname, "../data/users.json");
const readUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
const writeUsers = (users) =>
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

// Route to initiate login with Clio
router.get("/login", (req, res) => {
  const scope = encodeURIComponent("read:users"); // Adjust scopes as per your requirement
  const loginUrl = `client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${scope}`;
  res.redirect(loginUrl);
});

router.get("/login", (req, res) => {
  const scope = encodeURIComponent("read:users"); // Adjust scopes as per your requirement
  const loginUrl = `  client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${scope}`;
  res.redirect(loginUrl);
});

// Callback route for Clio OAuth
router.get("/callback", async (req, res) => {
  const code = req.query.code;
  console.log(code)

  // if (!code) {
  //   return res.status(400).send("Authorization code not provided");
  // }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await axios.post(
      "https://app.clio.com/oauth/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

  //   console.log(tokenResponse.data)
  //   const { access_token } = tokenResponse.data;

  //   if (!access_token) {
  //     return res.status(500).send("Failed to retrieve access token");
  //   }

  //   // Use access token to fetch user details
  //   const userResponse = await axios.get("https://app.clio.com/api/v4/users/who_am_i", {
  //     headers: {
  //       Authorization: `Bearer ${access_token}`,
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const userData = userResponse.data;

  //   if (!userData || !userData.email) {
  //     return res.status(500).send("Failed to retrieve user details");
  //   }

  //   const { email, name, id: clioId } = userData;

  //   // Check if user exists
  //   let users = readUsers();
  //   let user = users.find((u) => u.email === email);

  //   if (!user) {
  //     // If user doesn't exist, register them
  //     const newUser = {
  //       id: clioId,
  //       email,
  //       name,
  //       password: null, // OAuth users don't require passwords
  //     };
  //     users.push(newUser);
  //     writeUsers(users);
  //     user = newUser;
  //   }

  //   // Create JWT token for the user
  //   const token = jwt.sign(
  //     { id: user.id, email: user.email, name: user.name },
  //     JWT_SECRET,
  //     { expiresIn: "1h" }
  //   );
      res.redirect('https://google.com')
  //   res.send(
  //     `<html><script>window.localStorage.setItem('token', '${token}');window.location.href = 'profile.html';</script></html>`
  //   );
  } catch (error) {
    console.error("Error during Clio OAuth:", error.message);
    res.status(500).send("Something went wrong during the OAuth process");
  }
});

module.exports = router;
