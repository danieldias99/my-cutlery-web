using LAPR5_3DD_019.Models.Shared;
using LAPR5_3DD_019.Models.ValueObjects;

namespace LAPR5_3DD_019.Models
{

    public class TipoMaquina : Entity, IAggregateRoot
    {

        public ID_TipoMaquina Id { set; get; }
        public Descricao descricaoTipoMaquina { set; get; }

        public TipoMaquina() { }
        
        public TipoMaquina(float id, string descricao)
        {
            this.Id = new ID_TipoMaquina(id);
            this.descricaoTipoMaquina = new Descricao(descricao);
        }
    }
}