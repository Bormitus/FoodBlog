using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/favorite-recipes")]
    public class FavoriteRecipesController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IRecipeRepository _recipeRepo;
        private readonly IFavoriteRecipesRepository _favoriteRecipesRepo;

        public FavoriteRecipesController(UserManager<AppUser> userManager, IRecipeRepository stockRepo, IFavoriteRecipesRepository portfolioRepo)
        {
            _userManager = userManager;
            _recipeRepo = stockRepo;
            _favoriteRecipesRepo = portfolioRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserFavoriteRecipes()
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var userFavoriteRecipes = await _favoriteRecipesRepo.GetUserFavoriteRecipes(appUser);
            return Ok(userFavoriteRecipes);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPortfolio(int id)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var recipe = await _recipeRepo.GetByIdAsync(id);

            if (recipe == null)
            {
                return BadRequest("Recipe does not exist");
            }

            var userFavoriteRecipes = await _favoriteRecipesRepo.GetUserFavoriteRecipes(appUser);

            if (userFavoriteRecipes.Any(e => e.Id == id)) return BadRequest("Cannot add same recipe to favorite recipes");

            var favoriteRecipesModel = new FavoriteRecipe
            {
                RecipeId = recipe.Id,
                AppUserId = appUser.Id
            };

            await _favoriteRecipesRepo.CreateAsync(favoriteRecipesModel);

            if (favoriteRecipesModel == null)
            {
                return StatusCode(500, "Could not create");
            }
            else
            {
                return Created();
            }
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeletePortfolio(int id)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var userFavoriteRecipes = await _favoriteRecipesRepo.GetUserFavoriteRecipes(appUser);

            var filteredStock = userFavoriteRecipes.Where(s => s.Id == id).ToList();

            if (filteredStock.Count() == 1)
            {
                await _favoriteRecipesRepo.DeleteAsync(appUser, id);
            }
            else
            {
                return BadRequest("Recipe is not in favorite recipes");
            }

            return Ok();
        }
    }
}