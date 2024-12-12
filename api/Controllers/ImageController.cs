using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [Route("api/recipeImages")]
    public class ImageController : Controller
    {
        private readonly string _uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");


        [HttpGet("{fileName}")]
        public IActionResult GetImage(string fileName)
        {
            var filePath = Path.Combine(_uploadsFolder, fileName);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound(); // Если файл не найден
            }

            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(fileName, out var contentType))
            {
                contentType = "application/octet-stream"; // Тип по умолчанию, если расширение неизвестно
            }

            var fileStream = System.IO.File.OpenRead(filePath);
            return File(fileStream, contentType);
        }

    }
}