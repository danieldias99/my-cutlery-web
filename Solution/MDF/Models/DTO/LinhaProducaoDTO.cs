using System.Collections.Generic;
using MDF.Associations;

namespace MDF.Models.DTO
{

    public class LinhaProducaoDTO
    {

        public long id { get; set; }
        public List<MaquinaDTO> maquinas { get; set; }

        public LinhaProducaoDTO() { }

        public LinhaProducaoDTO(long id, List<LinhaProducaoMaquinas> maquinas)
        {
            this.id = id;
            setMaquinas(maquinas);
        }

        public void setMaquinas(List<LinhaProducaoMaquinas> linhasProducaoMaquinas)
        {
            if (maquinas != null)
            {
                maquinas = new List<MaquinaDTO>();
                foreach (LinhaProducaoMaquinas linhaProducaoMaquinas in linhasProducaoMaquinas)
                {
                    maquinas.Add(linhaProducaoMaquinas.maquina.toDTO());
                }
            }
        }
    }
}