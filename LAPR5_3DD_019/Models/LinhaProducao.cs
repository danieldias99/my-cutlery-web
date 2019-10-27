using LAPR5_3DD_019.Models.Shared;
using LAPR5_3DD_019.Associations;
using System.Collections.Generic;
using LAPR5_3DD_019.Models.DTO;

namespace LAPR5_3DD_019.Models
{
    public class LinhaProducao : Entity, IAggregateRoot
    {
        public long Id { get; set; }
        public ICollection<LinhaProducaoMaquinas> maquinas { get; set; }

        public LinhaProducao() { }
        public LinhaProducao(long Id)
        {
            this.Id = Id;
        }

        public LinhaProducao(long Id, ICollection<LinhaProducaoMaquinas> maquinas)
        {
            this.Id = Id;
            this.maquinas = maquinas;
        }

        public void addMaquina(LinhaProducaoMaquinas linha)
        {
            maquinas.Add(linha);
        }

        public LinhaProducaoDTO toDTO()
        {
            return new LinhaProducaoDTO(Id, maquinas);
        }

    }
}