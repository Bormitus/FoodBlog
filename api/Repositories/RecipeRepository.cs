using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Recipe;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IFileService _fileService;
        public RecipeRepository(ApplicationDbContext context, IFileService fileService)
        {
            _context = context;
            _fileService = fileService;
        }

        public async Task<Recipe> CreateAsync(CreateRecipeRequestDto createDto)
        {
            string createdImageName = await _fileService.SaveFileAsync(createDto.Image);
            var recipeModel = createDto.ToRecipeFromCreateDto(createdImageName);

            await _context.Recipes.AddAsync(recipeModel);
            await _context.SaveChangesAsync();

            return recipeModel;
        }

        public async Task<Recipe?> DeleteAsync(int id)
        {
            var recipeModel = await _context.Recipes.FirstOrDefaultAsync(x => x.Id == id);
            if (recipeModel == null)
            {
                return null;
            }

            if (!string.IsNullOrWhiteSpace(recipeModel.Image))
            {
                _fileService.DeleteFile(recipeModel.Image);
            }

            _context.Recipes.Remove(recipeModel);

            await _context.SaveChangesAsync();

            return recipeModel;
        }

        public async Task<List<Recipe>> GetAllAsync(QueryObject query)
        {
            var recipes = _context.Recipes.Include(c => c.Comments).ThenInclude(a => a.AppUser).Include(i => i.RecipeIngredients).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                recipes = recipes.Where(s => s.Name.Contains(query.Name));
            }

            if (query.CookingTime != null)
            {
                recipes = recipes.Where(s => s.CookingTime == query.CookingTime);
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                switch (query.SortBy.ToLower())
                {
                    case "name":
                        recipes = query.IsDecsending ? recipes.OrderByDescending(s => s.Name) : recipes.OrderBy(s => s.Name);
                        break;

                    case "cookingtime":
                        recipes = query.IsDecsending ? recipes.OrderByDescending(s => s.CookingTime) : recipes.OrderBy(s => s.CookingTime);
                        break;

                    default:
                        break;
                }
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;

            return await recipes.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Recipe?> GetByIdAsync(int id)
        {
            return await _context.Recipes.Include(c => c.Comments).ThenInclude(a => a.AppUser).Include(i => i.RecipeIngredients).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Recipe?> GetByNameAsync(string name)
        {
            return await _context.Recipes.Include(c => c.Comments).ThenInclude(a => a.AppUser).Include(i => i.RecipeIngredients).FirstOrDefaultAsync(i => i.Name == name);
        }

        public Task<bool> RecipeExists(int id)
        {
            return _context.Recipes.AnyAsync(i => i.Id == id);
        }

        public async Task<Recipe?> UpdateAsync(int id, UpdateRecipeRequestDto updateDto)
        {
            var recipeModel = await _context.Recipes.FirstOrDefaultAsync(x => x.Id == id);

            if (recipeModel == null)
            {
                return null;
            }

            if (!string.IsNullOrWhiteSpace(recipeModel.Image) && updateDto.Image != null)
            {
                _fileService.DeleteFile(recipeModel.Image);
                string createdImageName = await _fileService.SaveFileAsync(updateDto.Image);
                recipeModel.Image = createdImageName;
            }

            recipeModel.Id = id;
            recipeModel.Name = updateDto.Name;
            recipeModel.CookingTime = updateDto.CookingTime;
            recipeModel.Text = updateDto.Text;

            await _context.SaveChangesAsync();

            return recipeModel;
        }


    }
}