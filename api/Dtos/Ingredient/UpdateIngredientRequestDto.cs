using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Ingredient
{
    public class UpdateIngredientRequestDto
    {
        [Required]
        [MaxLength(20, ErrorMessage = "Name cannot over 20")]
        public string Name { get; set; } = string.Empty;
        [Required]
        [Range(1, 1000000000)]
        public decimal Quantity { get; set; }
        [Required]
        [MaxLength(10, ErrorMessage = "Unit cannot over 10")]
        public string Unit { get; set; } = string.Empty;
        
    }
}