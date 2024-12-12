using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Ingredient;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/ingredient")]
    public class IngredientController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IIngredientRepository _ingredientRepo;
        private readonly IRecipeRepository _recipeRepo;
        public IngredientController(ApplicationDbContext context, IIngredientRepository ingredientRepo, IRecipeRepository recipeRepo)
        {
            _ingredientRepo = ingredientRepo;
            _recipeRepo = recipeRepo;
            _context = context;
        }
        [HttpGet("recipeIngredients/{recipeId:int}")]
        public async Task<IActionResult> GetByRecipeId([FromRoute] int recipeId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ingredient = await _ingredientRepo.GetByRecipeId(recipeId);

            var ingredientDto = ingredient.Select(s => s.ToIngredientDto()).ToList();

            return Ok(ingredientDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ingredient = await _ingredientRepo.GetByIdAsync(id);

            if (ingredient == null)
            {
                return NotFound();
            }

            return Ok(ingredient.ToIngredientDto());
        }
        [HttpPost("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromRoute] int id, [FromBody] CreateIngredientRequestDto ingredientDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recipe = await _recipeRepo.GetByIdAsync(id);

            if (recipe == null)
            {
                return BadRequest("Recipe does not exist");
            }

            var ingredientModel = ingredientDto.ToIngredientFromCreateDTO(recipe.Id);
            await _ingredientRepo.CreateAsync(ingredientModel);
            return CreatedAtAction(nameof(GetById), new { id = ingredientModel.Id }, ingredientModel.ToIngredientDto());
        }
        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateIngredientRequestDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ingredientModel = await _ingredientRepo.UpdateAsync(id, updateDto);

            if (ingredientModel == null)
            {
                return NotFound();
            }

            return Ok(ingredientModel.ToIngredientDto());
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

            var ingredientModel = await _ingredientRepo.DeleteAsync(id);

            if (ingredientModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}