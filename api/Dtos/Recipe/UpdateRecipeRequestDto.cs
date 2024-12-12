using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers.ImageUploadValidation;

namespace api.Dtos.Recipe
{
    public class UpdateRecipeRequestDto
    {
        [Required]
        [MaxLength(20, ErrorMessage = "Name cannot over 20")]
        public string Name { get; set; } = string.Empty;

        [MaxFileSize(5 * 1024 * 1024)]
        [AllowedExtensions(new string[] { ".jpg", ".png" })]
        public IFormFile? Image { get; set; } = null;

        [Required]
        [Range(1, 1000000000)]
        public uint CookingTime { get; set; }

        [Required]
        public string Text { get; set; } = string.Empty;
    }

}