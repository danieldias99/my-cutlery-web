using System.Collections.Generic;

namespace LAPR5_3DD_019.Models.DTO
{

    public class LinhaProducaoDTO
    {

        public long Id { get; set; }
        public List<Maquina> maquinas { get; set; }


        public LinhaProducaoDTO(long Id, List<Maquina> maquinas)
        {
            this.Id = Id;
            this.maquinas = maquinas;
        }

        public LinhaProducao toLinhaProducao()
        {
            return new LinhaProducao(Id, maquinas);
        }


    }
}