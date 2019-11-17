using MDP.Models.Shared;

namespace MDP.Models.Shared
{
    public class Descricao : ValueObject
    {
        public string Id { get; set; }
        public Descricao(string value) { this.Id = value; }

        public Descricao()
        {
        }

        public void changedescricao(string value) { this.Id = value; }
    }
}