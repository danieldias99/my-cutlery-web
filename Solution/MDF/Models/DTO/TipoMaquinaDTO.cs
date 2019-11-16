using System.Collections.Generic;
using MDF.Associations;

namespace MDF.Models.DTO
{

    public class TipoMaquinaDTO
    {

        public long id_tipoMaquina { get; set; }
        public string descricaoTipoMaquina { get; set; }
        public List<OperacaoDTO> operacoes { get; set; }

        public TipoMaquinaDTO() { }

        public TipoMaquinaDTO(long Id, string descricaoTipoMaquina, List<TipoMaquinaOperacao> operacoes)
        {
            this.id_tipoMaquina = Id;
            this.descricaoTipoMaquina = descricaoTipoMaquina;
            setOperacoes(operacoes);
        }

        public TipoMaquinaDTO(long Id, string descricaoTipoMaquina, List<OperacaoDTO> operacoes)
        {
            this.id_tipoMaquina = Id;
            this.descricaoTipoMaquina = descricaoTipoMaquina;
            this.operacoes = operacoes;
        }

        public void setOperacoes(List<TipoMaquinaOperacao> operacoestipo)
        {
            if (operacoestipo != null)
            {
                operacoes = new List<OperacaoDTO>();
                foreach (TipoMaquinaOperacao tipoMaquinaOperacao in operacoestipo)
                {
                    operacoes.Add(tipoMaquinaOperacao.operacao.toDTO());
                }
            }
        }
    }
}