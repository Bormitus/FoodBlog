using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Favorite Recipes")]
    public class FavoriteRecipe
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
    }
}