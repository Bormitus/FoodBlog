using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IFavoriteRecipesRepository
    {
        Task<List<Recipe>> GetUserFavoriteRecipes(AppUser user);
        Task<FavoriteRecipe> CreateAsync(FavoriteRecipe favoriteRecipes);
        Task<FavoriteRecipe> DeleteAsync(AppUser appUser, int id);
    }
}