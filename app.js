const express = require("express");
const app = express();

// Middleware to parse JSON requests
app.use(express.json()); // This must come first

// Simulated database for likes (moved to global scope for testing compatibility)
global.likes = [];

// Simulated database for profiles
const profiles = [
  { id: 1, name: "Alice", age: 25, interests: ["hiking", "reading"], clubs: ["Book Club"] },
  { id: 2, name: "Bob", age: 27, interests: ["gaming", "coding"], clubs: ["Gaming Club"] },
  { id: 3, name: "Charlie", age: 24, interests: ["hiking", "traveling"], clubs: ["Travel Club"] },
];

// Simulated database for taste profiles
const userTasteProfiles = {};

// Sample route (Home)
app.get("/", (req, res) => {
  console.log("GET request received at /"); // Log for debugging
  res.send("Welcome to My Dating App Backend!");
});

// Route for liking a user
app.post("/like", (req, res) => {
  const { likerId, likedId } = req.body;

  // Validate input
  if (!likerId || !likedId) {
    return res.status(400).json({ error: "likerId and likedId are required" });
  }

  // Simulate saving the like action
  global.likes.push({ likerId, likedId }); 
  console.log(`User ${likerId} liked User ${likedId}`);

  // Update taste profile for the liker
  const likedProfile = profiles.find((profile) => profile.id === likedId);
  if (likedProfile) {
    if (!userTasteProfiles[likerId]) {
      userTasteProfiles[likerId] = { interests: {}, clubs: {} };
    }

    likedProfile.interests.forEach((interest) => {
      userTasteProfiles[likerId].interests[interest] =
        (userTasteProfiles[likerId].interests[interest] || 0) + 1;
    });

    likedProfile.clubs.forEach((club) => {
      userTasteProfiles[likerId].clubs[club] =
        (userTasteProfiles[likerId].clubs[club] || 0) + 1;
    });
  }

  res.status(200).json({ message: `User ${likerId} liked User ${likedId}` });
});

// Route to fetch all likes
app.get("/likes", (req, res) => {
  res.status(200).json(global.likes);
});

// Route to fetch all profiles
app.get("/profiles", (req, res) => {
  res.status(200).json(profiles);
});

// Route to fetch a specific profile by ID
app.get("/profiles/:id", (req, res) => {
  const profileId = parseInt(req.params.id); 
  const profile = profiles.find((p) => p.id === profileId); 

  if (!profile) {
    return res.status(404).json({ error: "Profile not found" }); 
  }

  res.status(200).json(profile); 
});

// Updated Route to fetch similar profiles based on shared interests or clubs with randomization
app.post("/similar-profiles", (req, res) => {
  const { likerId } = req.body;

  // Find the profile of the liker
  const likerProfile = profiles.find((profile) => profile.id === likerId);

  if (!likerProfile) {
    return res.status(404).json({ error: "Liker profile not found" });
  }

  // Simulate finding similar profiles based on shared interests or clubs
  const similarProfiles = profiles.filter((profile) => {
    if (profile.id === likerId) return false; // Exclude the user's own profile

    // Calculate shared interests and clubs
    const sharedInterests = profile.interests.filter((interest) =>
      likerProfile.interests.includes(interest)
    ).length;

    const sharedClubs = profile.clubs.filter((club) =>
      likerProfile.clubs.includes(club)
    ).length;

    return (
      sharedInterests > 0 ||
      sharedClubs > 0 ||
      Math.abs(profile.age - likerProfile.age) <= 2
    );
  });

  // Add randomization by shuffling the array
  const shuffledProfiles = similarProfiles.sort(() => Math.random() - 0.5);

  // Limit to three results
  const limitedProfiles = shuffledProfiles.slice(0, 3);

  res.status(200).json(limitedProfiles);
});

// Route for checking matches between users
app.post("/match", (req, res) => {
  const { likerId, likedId } = req.body;

  // Check if the liked user has already liked the liker
  const isMatch = global.likes.some(
    (like) => like.likerId === likedId && like.likedId === likerId
  );

  if (isMatch) {
    return res.status(200).json({ message: "It's a match!" });
  }

  res.status(200).json({ message: "No match yet." });
});

module.exports = app; // Export only the app instance without starting the server
