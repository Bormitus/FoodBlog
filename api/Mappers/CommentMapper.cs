using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Models;

namespace api.Mappers
{
    public static class CommentMaper
    {
        public static CommentDto ToCommentDto(this Comment commentModel)
        {
            return new CommentDto
            {
                Id = commentModel.Id,
                Title = commentModel.Title,
                Content = commentModel.Content,
                CreateOn = commentModel.CreateOn,
                CreatedBy = commentModel.AppUser.UserName,
                RecipeId = commentModel.RecipeId
            };
        }

        public static Comment ToCommentFromCreate(this CreateCommentDto commentDto, int recipeId)
        {
            return new Comment
            {
                Title = commentDto.Title,
                Content = commentDto.Content,
                RecipeId = recipeId
            };
        }

        public static Comment ToCommentFromUpdate(this UpdateCommentRequestDto commentDto)
        {
            return new Comment
            {
                Title = commentDto.Title,
                Content = commentDto.Content,
            };
        }
    }
}