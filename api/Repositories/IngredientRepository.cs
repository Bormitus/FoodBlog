using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Ingredient;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class IngredientRepository : IIngredientRepository
    {
        private readonly ApplicationDbContext _context;

        public IngredientRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<RecipeIngredient> CreateAsync(RecipeIngredient ingredientModel)
        {
            await _context.RecipeIngredients.AddAsync(ingredientModel);
            await _context.SaveChangesAsync();
            return ingredientModel;
        }

        public async Task<RecipeIngredient?> DeleteAsync(int id)
        {
            var ingredientModel = await _context.RecipeIngredients.FirstOrDefaultAsync(x => x.Id == id);
            if (ingredientModel == null)
            {
                return null;
            }

            _context.RecipeIngredients.Remove(ingredientModel);

            await _context.SaveChangesAsync();

            return ingredientModel;
        }

        public async Task<List<RecipeIngredient>> GetByRecipeId(int recipeId)
        {
            var ingredients = _context.RecipeIngredients.AsQueryable();

            ingredients = ingredients.Where(s=> s.RecipeId == recipeId);

            return await ingredients.ToListAsync();
        }

        public async Task<RecipeIngredient?> GetByIdAsync(int id)
        {
            return await _context.RecipeIngredients.FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<bool> IngredientExists(int id)
        {
            return await _context.RecipeIngredients.AnyAsync(i => i.Id == id);
        }

        public async Task<RecipeIngredient?> UpdateAsync(int id, UpdateIngredientRequestDto ingredientDto)
        {
            var ingredientModel = await _context.RecipeIngredients.FirstOrDefaultAsync(x => x.Id == id);

            if (ingredientModel == null)
            {
                return null;
            }

            ingredientModel.Name = ingredientDto.Name;
            ingredientModel.Quantity = ingredientDto.Quantity;
            ingredientModel.Unit = ingredientDto.Unit;

            await _context.SaveChangesAsync();

            return ingredientModel;
        }
    }
}