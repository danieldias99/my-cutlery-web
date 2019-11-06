using System.Collections.Generic;
using MDF.Associations;

namespace MDF.Models.DTO
{

    public class TipoMaquinaDTO
    {

        public long Id_tipoMaquina { get; set; }
        public string descricaoTipoMaquina { get; set; }
        public ICollection<OperacaoDTO> operacoes { get; set; }

        public TipoMaquinaDTO() { }

        public TipoMaquinaDTO(long Id, string descricaoTipoMaquina, ICollection<TipoMaquinaOperacao> operacoes)
        {
            this.Id_tipoMaquina = Id;
            this.descricaoTipoMaquina = descricaoTipoMaquina;
            setOperacoes(operacoes);
        }

        public TipoMaquinaDTO(long Id, string descricaoTipoMaquina, ICollection<OperacaoDTO> operacoes)
        {
            this.Id_tipoMaquina = Id;
            this.descricaoTipoMaquina = descricaoTipoMaquina;
            this.operacoes = operacoes;
        }

        public void setOperacoes(ICollection<TipoMaquinaOperacao> operacoestipo)
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