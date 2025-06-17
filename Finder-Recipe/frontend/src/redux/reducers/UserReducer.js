import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
  users: [],
  usersLoading: false,
  usersError: null,
  recipes: {},
  trashedRecipes: [],
  recipesLoading: false,
  recipesError: null,
};

export const UserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('LoadUserRequest', (state) => {
      state.loading = true;
    })
    .addCase('LoadUserSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase('LoadUserFail', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase('ClearErrors', (state) => {
      state.error = null;
      state.usersError = null;
      state.recipesError = null;
    })
    .addCase('LogoutUserSuccess', (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    })
    .addCase('LoadAllUsersRequest', (state) => {
      state.usersLoading = true;
    })
    .addCase('LoadAllUsersSuccess', (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    })
    .addCase('LoadAllUsersFail', (state, action) => {
      state.usersLoading = false;
      state.usersError = action.payload;
    })
    .addCase('CreateUserRequest', (state) => {
      state.usersLoading = true;
    })
    .addCase('CreateUserSuccess', (state, action) => {
      state.usersLoading = false;
      state.users = [action.payload, ...state.users];
    })
    .addCase('CreateUserFail', (state, action) => {
      state.usersLoading = false;
      state.usersError = action.payload;
    })
    .addCase('UpdateUserRequest', (state) => {
      state.usersLoading = true;
    })
    .addCase('UpdateUserSuccess', (state, action) => {
      state.usersLoading = false;
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    })
    .addCase('UpdateUserFail', (state, action) => {
      state.usersLoading = false;
      state.usersError = action.payload;
    })
    .addCase('DeleteUserRequest', (state) => {
      state.usersLoading = true;
    })
    .addCase('DeleteUserSuccess', (state, action) => {
      state.usersLoading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
    })
    .addCase('DeleteUserFail', (state, action) => {
      state.usersLoading = false;
      state.usersError = action.payload;
    })
    .addCase('LoadUserRecipesRequest', (state) => {
      state.recipesLoading = true;
    })
    .addCase('LoadUserRecipesSuccess', (state, action) => {
      state.recipesLoading = false;
      state.recipes[action.payload.userId] = action.payload.recipes;
    })
    .addCase('LoadUserRecipesFail', (state, action) => {
      state.recipesLoading = false;
      state.recipesError = action.payload;
    })
    .addCase('DeleteUserRecipeRequest', (state) => {
  state.recipesLoading = true;
    })
    .addCase('DeleteUserRecipeSuccess', (state, action) => {
      state.recipesLoading = false;
      const { userId, recipeId } = action.payload;
      if (state.recipes[userId]) {
        state.recipes[userId] = state.recipes[userId].filter(recipe => recipe.id !== recipeId);
      }
    })
    .addCase('DeleteUserRecipeFail', (state, action) => {
      state.recipesLoading = false;
      state.recipesError = action.payload;
    })

});
