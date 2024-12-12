using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Ingredient;
using api.Models;

namespace api.Mappers
{
    public static class IngredientMapper
    {
        public static IngredientDto ToIngredientDto(this RecipeIngredient ingredientModel)
        {
            return new IngredientDto
            {
                Id = ingredientModel.Id,
                Name = ingredientModel.Name,
                Quantity = ingredientModel.Quantity,
                Unit = ingredientModel.Unit,
                RecipeId = ingredientModel.RecipeId,
            };
        }
        public static RecipeIngredient ToIngredientFromCreateDTO(this CreateIngredientRequestDto ingredientDto, int recipeId)
        {
            return new RecipeIngredient
            {
                Name = ingredientDto.Name,
                Quantity = ingredientDto.Quantity,
                Unit = ingredientDto.Unit,
                RecipeId = recipeId
            };
        }
    }
}