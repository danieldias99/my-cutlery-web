using MDF.Models.Shared;
using MDF.Associations;
using System.Collections.Generic;
using MDF.Models.DTO;

namespace MDF.Models
{
    public class LinhaProducao : Entity, IAggregateRoot
    {
        public long id { get; set; }
        public List<LinhaProducaoMaquinas> maquinas { get; set; }

        public LinhaProducao() { }
        public LinhaProducao(long id)
        {
            this.id = id;
        }

        public LinhaProducao(long id, List<LinhaProducaoMaquinas> maquinas)
        {
            this.id = id;
            this.maquinas = maquinas;
        }

        public LinhaProducao(long id, List<MaquinaDTO> maquinas)
        {
            this.id = id;
            this.maquinas = new List<LinhaProducaoMaquinas>();
            setMaquinas(maquinas);
        }

        public void setMaquinas(List<MaquinaDTO> maquinasDTO)
        {

            foreach (MaquinaDTO maquina in maquinasDTO)
            {
                maquinas.Add(new LinhaProducaoMaquinas(this.id, maquina.Id));
            }

        }

        public bool update_linhaProducao(List<LinhaProducaoMaquinas> list)
        {
            if (list == null)
            {
                return false;
            }

            this.maquinas = list;
            return true;
        }

        public void addMaquina(LinhaProducaoMaquinas linha)
        {
            maquinas.Add(linha);
        }

        public LinhaProducaoDTO toDTO()
        {
            return new LinhaProducaoDTO(id, maquinas);
        }

    }
}