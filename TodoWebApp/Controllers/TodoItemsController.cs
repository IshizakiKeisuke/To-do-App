using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoWebApp.Models;

namespace TodoWebApp.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {

        private readonly TodoItemContext _context;

        public TodoItemsController(TodoItemContext context)
        {
            _context = context;
        }

        // GET: api/TodoItems
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return await _context.TodoItems.Where(item => item.UserId == userId).ToListAsync(); //DBの接続(Whereは優秀)
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        public class GetSwitchIsComplete { 
            public bool SwitchIsComplete { get; set; }
        }


        // PUT: api/TodoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(string id , GetSwitchIsComplete switchIsComplete) 
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var todoItem = await _context.TodoItems.SingleAsync((todoItem) => todoItem.UserId == userId &&  todoItem.Id == id);

            if (todoItem == null)
            {
                return BadRequest();
            }

            todoItem.IsComplete = switchIsComplete.SwitchIsComplete;

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TodoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            todoItem.UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (todoItem.UserId != null) { 

                _context.TodoItems.Add(todoItem);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
            }
            else
            {
                return NotFound();
            }
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(string id)
        {
            string userIdChecke = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var todoItem = await _context.TodoItems.SingleAsync((todoItem) => todoItem.UserId == userIdChecke && todoItem.Id == id);


            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoItemExists(string id)
        {
            return _context.TodoItems.Any(e => e.Id == id);
        }
    }
}
