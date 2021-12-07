using System.ComponentModel.DataAnnotations.Schema;


namespace TodoWebApp.Models
{
    public class TodoItem 
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
    }
}
