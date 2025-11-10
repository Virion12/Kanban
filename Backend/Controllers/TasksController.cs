using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.ConstrainedExecution;

namespace KanbanApi.Controllers
{
    [EnableCors()]
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            Response response = new("test1",true);
            return Ok(response);
        }

        public record Response (String name,bool isDone);

    }
}
