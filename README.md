
# Recipe Finder - Personalized Recipe Finder & Collection Manager


## Project Overview

Recipe Finder is a web application designed to help users discover and organize recipes based on available ingredients or recipe names. By integrating the Spoonacular API, the application provides robust recipe search functionality, user authentication, and personalized recipe management. Users can explore recipes tailored to their preferences, save favorites, and manage their ingredient lists, all within a mobile-responsive, user-friendly interface.

The main goal is to create an intuitive platform for food enthusiasts to find inspiration, manage their recipe collections, and explore detailed recipe information while ensuring secure user authentication and data privacy.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [UX](#ux)
4. [Design](#design)
5. [Technologies Used](#technologies-used)

## Features
#### User Authentication
- Google Sign-In Authentication: Secure login using Firebase Authentication with Google accounts.
- Personal Profiles: Users can save favorite recipes and dietary preferences in their profiles.
- Data Privacy: All user information is securely stored and protected.

#### Admin Features
prototype demos

https://github.com/user-attachments/assets/6cf6340c-fc12-48ba-93f3-a2c07b20b1ba


- User Management: Add, edit, or delete user accounts.
- Recipe Management: Admins can view or delete recipes on behalf of users.

#### User Features
###### Smart Recipe Search & Generation

prototype demos

<img width="286" alt="Screen Shot 2025-04-30 at 16 19 42" src="https://github.com/user-attachments/assets/622e4bcf-d76f-41bd-9a2f-038ce93a94b3" />


- Utilize the Spoonacular API to retrieve recipes based on user-selected ingredients or recipe name
- Provide comprehensive recipe details including preparation instructions and nutritional information
- Support multiple ingredient selection for more precise search results

###### Recipe Management

prototype demos

<img width="234" alt="Screen Shot 2025-04-30 at 16 20 46" src="https://github.com/user-attachments/assets/9fd4010f-fe74-42c0-a8a5-79d11d2973af" />

- Allow users to bookmark and organize favorite recipes for future reference
- Enable easy removal of recipes from the wishlist when no longer needed
- Provide a user-friendly interface for recipe collection management

###### Recipe information displayed: When a user selects a recipe, the application will present:

prototype demos

<img width="235" alt="Screen Shot 2025-04-30 at 16 20 12" src="https://github.com/user-attachments/assets/2a28bc9a-19bc-4e6c-8e62-a7ab2325d3a4" />

- Name of the dish
- Cooking time and number of servings
- Introduction about the dish
- Complete list of required ingredients with measurements
- Step-by-step instructions
- Nutritional information
- Similar recipes

###### Mobile-Responsive UI
- Design a fully responsive interface optimized for all device types
- Ensure seamless user experience across desktop, tablet, and mobile platforms
- Implement intuitive navigation and accessibility features

## UX
#### Goals
The primary goal is to provide a seamless and engaging experience for users to discover recipes, manage collections, and explore culinary inspiration. The application prioritizes:
- Ease of Use: Intuitive interface for users of all technical levels.
- Accessibility: Responsive design ensures usability on any device.

#### User Stories
As a user, I want to:
- Log in securely using my Google account.
- Search for recipes using ingredients I have at home or by recipe names
- View detailed recipe information, including introduction, visuals, cooking time, servings, ingredients and instructions.
- Save and organize my favorite recipes for quick access.

As an admin, I want to:
- Manage user accounts and their saved recipes efficiently.

## Design
#### Color Scheme
The design emphasizes a clean, appetizing aesthetic
Main color palette:
- #B4324F - Rusty Red
- #F39AA7 - Pale Pink
- #531A27 - Dark Maroon
- #D86680 - Rose Pink
- #F7F2EE - Cream White
- #FFFFFF - Pure White
- #000000 - Pure Black
  
#### Typography
- Inter (clean and modern, used for body text and forms).

## Technologies Used
- Front-End
React: JavaScript library for building dynamic UI components. Tailwind CSS: Utility-first CSS framework for styling.

- Back-End
Node.js: Runtime environment for server-side logic.
  
- Firebase Authentication: Secure Google Sign-In integration.

- API Integration

- Spoonacular API: Provides recipe search, ingredient data, and nutritional information.

- Hosting
Vite: Fast and modern build tool for deploying the application.

- Development Tools
Git: Version control system.
GitHub: Remote repository for code storage and collaboration.
Jira/Trello: Project management tools for task tracking.
Scrum: Agile methodology for development sprints.

