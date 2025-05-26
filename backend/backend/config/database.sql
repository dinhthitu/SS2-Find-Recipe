-- Drop the existing table if it exists
DROP TABLE IF EXISTS Users;

-- Create the table with the correct schema
CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  savedRecipes INTEGER DEFAULT 0,
  role TEXT DEFAULT 'user',
  firebaseUid TEXT UNIQUE NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  deletedAt DATETIME
);

-- Create Recipes and UserWishlist tables
CREATE TABLE IF NOT EXISTS Recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  spoonacularId INTEGER UNIQUE,
  title TEXT,
  description TEXT,
  ingredients TEXT,
  steps TEXT,
  imageUrl TEXT,
  isDeleted BOOLEAN DEFAULT 0,
  UserId INTEGER,
  FOREIGN KEY(UserId) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS UserWishlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  recipeId INTEGER,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY(userId) REFERENCES Users(id),
  FOREIGN KEY(recipeId) REFERENCES Recipes(id),
  UNIQUE(userId, recipeId)
);

-- Insert admin account
INSERT INTO Users (email, name, role, password, firebaseUid, createdAt, updatedAt)
VALUES ('admin@example.com', 'Admin', 'admin', 'admin-password', 'admin-firebase-uid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);