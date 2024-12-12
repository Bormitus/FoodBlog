using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comment
{
    public class CreateCommentDto
    {
        [Required]
        [MaxLength(280, ErrorMessage = "Title cannot over 280 characters")]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(280, ErrorMessage = "Content cannot over 280 characters")]
        public string Content { get; set; } = string.Empty;
    }
}