using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class FavoriteRecipesRepository : IFavoriteRecipesRepository
    {
        private readonly ApplicationDbContext _context;
        public FavoriteRecipesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<FavoriteRecipe> CreateAsync(FavoriteRecipe favoriteRecipes)
        {
            await _context.FavoriteRecipes.AddAsync(favoriteRecipes);
            await _context.SaveChangesAsync();
            return favoriteRecipes;
        }

        public async Task<FavoriteRecipe> DeleteAsync(AppUser appUser, int id)
        {
            var favoriteRecipeModel = await _context.FavoriteRecipes.FirstOrDefaultAsync(x => x.AppUserId == appUser.Id && x.Recipe.Id == id);
        
            if(favoriteRecipeModel == null) return null;

            _context.FavoriteRecipes.Remove(favoriteRecipeModel);
            await _context.SaveChangesAsync();

            return favoriteRecipeModel;
        }

        public async Task<List<Recipe>> GetUserFavoriteRecipes(AppUser user)
        {
            return await _context.FavoriteRecipes
            .Where(u=>u.AppUserId == user.Id)
            .Select(recipe => new Recipe
            {
                Id = recipe.RecipeId,
                Name = recipe.Recipe.Name,
                Image = recipe.Recipe.Image,
                CookingTime = recipe.Recipe.CookingTime,
                RecipeIngredients = recipe.Recipe.RecipeIngredients,
            }).ToListAsync();
        }
    }
}