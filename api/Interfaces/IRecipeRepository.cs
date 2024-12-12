using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Recipe;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IRecipeRepository
    {
        Task<List<Recipe>> GetAllAsync(QueryObject queryObject);
        Task<Recipe?> GetByIdAsync(int id);
        Task<Recipe?> GetByNameAsync(string name);
        Task<Recipe> CreateAsync(CreateRecipeRequestDto createDto);
        Task<Recipe?> UpdateAsync(int id, UpdateRecipeRequestDto updateDto);
        Task<Recipe?> DeleteAsync(int id);
        Task<bool> RecipeExists(int id);
    }
}