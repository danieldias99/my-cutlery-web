using System.Collections.Generic;
using LAPR5_3DD_019.Associations;

namespace LAPR5_3DD_019.Models.DTO
{

    public class LinhaProducaoDTO
    {

        public long Id { get; set; }
        public ICollection<LinhaProducaoMaquinas> maquinas { get; set; }


        public LinhaProducaoDTO(long Id, ICollection<LinhaProducaoMaquinas> maquinas)
        {
            this.Id = Id;
            this.maquinas = maquinas;
        }

    }
}