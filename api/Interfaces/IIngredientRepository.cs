using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Ingredient;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IIngredientRepository
    {
        Task<List<RecipeIngredient>> GetByRecipeId(int recipeId);
        Task<RecipeIngredient?> GetByIdAsync(int id);
        Task<RecipeIngredient> CreateAsync(RecipeIngredient ingredientModel);
        Task<RecipeIngredient?> UpdateAsync(int id, UpdateIngredientRequestDto ingredientDto);
        Task<RecipeIngredient?> DeleteAsync(int id);
        Task<bool> IngredientExists(int id);
    }
}