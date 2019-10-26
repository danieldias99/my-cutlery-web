using LAPR5_3DD_019.Models.Shared;
using LAPR5_3DD_019.Models.ValueObjects;
using System.Collections.Generic;
using LAPR5_3DD_019.Models.DTO;

namespace LAPR5_3DD_019.Models
{
    public class LinhaProducao : Entity, IAggregateRoot
    {
        public long Id { get; set; }
        public List<Maquina> maquinas { get; set; }

        public LinhaProducao(){}
        public LinhaProducao(long Id, List<Maquina> maquinas)
        {
            this.Id = Id;
            this.maquinas = maquinas;
        }

        public LinhaProducaoDTO toDTO()
        {
            return new LinhaProducaoDTO(Id, maquinas);
        }

    }
}