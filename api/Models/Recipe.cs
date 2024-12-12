using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Recipes")]
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public uint CookingTime { get; set; } = 0;
        public List<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<FavoriteRecipe> FavoriteRecipes { get; set; } = new List<FavoriteRecipe>();
    }
}