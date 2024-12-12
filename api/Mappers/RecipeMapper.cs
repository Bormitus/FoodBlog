using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Recipe;
using api.Models;

namespace api.Mappers
{
    public static class RecipeMapper
    {
        public static RecipeDto ToRecipeDto(this Recipe recipeModel)
        {
            return new RecipeDto
            {
                Id = recipeModel.Id,
                Name = recipeModel.Name,
                Image = recipeModel.Image,
                Text = recipeModel.Text,
                CookingTime = recipeModel.CookingTime,
                Comments = recipeModel.Comments.Select(c => c.ToCommentDto()).ToList(),
                RecipeIngredients = recipeModel.RecipeIngredients.Select(r => r.ToIngredientDto()).ToList(),
            };
        }
        public static Recipe ToRecipeFromCreateDto(this CreateRecipeRequestDto recipeDto, string fileName)
        {
            return new Recipe
            {
                Name = recipeDto.Name,
                Image = fileName,
                CookingTime = recipeDto.CookingTime,
                Text = recipeDto.Text,

            };
        }
        // public static Recipe ToRecipeFromUpdateDto(this UpdateRecipeRequestDto recipeDto, /*string fileName,*/ int id)
        // {
        //     return new Recipe
        //     {
        //         Id = id,
        //         Name = recipeDto.Name,
        //         Image = fileName,
        //         CookingTime = recipeDto.CookingTime,
        //     };
        // }
    }
}