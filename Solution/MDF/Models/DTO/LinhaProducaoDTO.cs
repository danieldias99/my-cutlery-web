using System.Collections.Generic;
using MDF.Associations;

namespace MDF.Models.DTO
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