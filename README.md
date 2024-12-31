# gamified-matching-system
Project Description Gamified Matching System A backend prototype for a gamified matching system designed to help users find similar profiles based on shared attributes like interests, clubs, or age range. The system includes functionality to check for mutual likes (matches) and incorporates randomization and gamification to enhance user engagement. Built with Node.js and Express.js, this project focuses on efficient algorithm development, scalable RESTful APIs, and seamless integration with a Flutter-based frontend.
Key Features
Profile Matching: Fetches up to three similar profiles based on shared interests, clubs, and age range.
Mutual Likes Detection: Checks if two users have mutually liked each other and returns "It's a match!".
Gamification: Displays random but relevant profiles alongside the person who liked them for an engaging experience.
API Endpoints:
/like: Allows users to like other profiles.
/similar-profiles: Fetches similar profiles for a given user.
/match: Checks for mutual likes between users.
Technologies Used
Backend: Node.js, Express.js
Testing: Jest, SuperTest
Tools: Postman for API testing
Data Handling: Simulated in-memory databases
Future Enhancements
Integration with a Flutter frontend for a seamless user experience.
Personalization using machine learning models.
Migration from in-memory databases to scalable solutions like MongoDB.
