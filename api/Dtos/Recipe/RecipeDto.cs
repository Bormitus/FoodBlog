using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Dtos.Ingredient;
using api.Models;

namespace api.Dtos.Recipe
{
    public class RecipeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public uint CookingTime { get; set; } = 0;
        public List<IngredientDto> RecipeIngredients { get; set; }
        public List<CommentDto> Comments { get; set; }
    }
}