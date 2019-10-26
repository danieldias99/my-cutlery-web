using System.Collections.Generic;
using LAPR5_3DD_019.Associations;

namespace LAPR5_3DD_019.Models.DTO
{

    public class OperacaoDTO
    {
        public long Id;
        public string descricaoOperacao { get; set; }
        public string duracaoOperacao { get; set; }
        public List<TipoMaquina> tiposMaquinas { get; set; }

        public OperacaoDTO(long id, string descricaoOperacao, string duracaoOperacao, ICollection<TipoMaquinaOperacao> listTipoMaquinaOperacoes)
        {
            this.Id = id;
            this.descricaoOperacao = descricaoOperacao;
            this.duracaoOperacao = duracaoOperacao;
        }

        public void setOperacoes(ICollection<TipoMaquinaOperacao> listTipoMaquinaOperacoes)
        {
            tiposMaquinas = new List<TipoMaquina>();
            foreach (TipoMaquinaOperacao tipoMaquinaOperacao in listTipoMaquinaOperacoes)
            {
                this.tiposMaquinas.Add(tipoMaquinaOperacao.tipoMaquina);
            }
        }
    }
}