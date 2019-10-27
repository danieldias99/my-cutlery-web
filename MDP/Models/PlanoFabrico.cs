using MDP.Models.Shared;
using MDP.Models.ValueObjects;
using MDP.Models.DTO;

namespace MDP.Models
{
    public class PlanoFabrico : Entity
    {

        public long Id { get; set; }

        public PlanoFabricoDTO toDTO()
        {
            return new PlanoFabricoDTO(Id);
        }

    }
}