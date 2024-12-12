using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Recipe;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/recipe")]
    public class RecipeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IRecipeRepository _recipeRepo;
        public RecipeController(ApplicationDbContext context, IRecipeRepository recipeRepo)
        {
            _recipeRepo = recipeRepo;
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject queryObject)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recipes = await _recipeRepo.GetAllAsync(queryObject);

            var recipeDto = recipes.Select(s => s.ToRecipeDto()).ToList();

            return Ok(recipeDto);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recipe = await _recipeRepo.GetByIdAsync(id);

            if (recipe == null)
            {
                return NotFound();
            }

            return Ok(recipe.ToRecipeDto());
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromForm] CreateRecipeRequestDto recipeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recipeModel = await _recipeRepo.CreateAsync(recipeDto);
            return CreatedAtAction(nameof(GetById), new { id = recipeModel.Id }, recipeModel.ToRecipeDto());
        }
        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromForm] UpdateRecipeRequestDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recipeModel = await _recipeRepo.UpdateAsync(id, updateDto);

            return Ok(recipeModel.ToRecipeDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recipeModel = await _recipeRepo.DeleteAsync(id);

            if (recipeModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}