using System.Collections.Generic;
using LAPR5_3DD_019.Associations;

namespace LAPR5_3DD_019.Models.DTO
{

    public class TipoMaquinaDTO
    {

        public float Id_tipoMaquina { get; set; }
        public string descricaoTipoMaquina { get; set; }

        public ICollection<OperacaoDTO> operacoes { get; set; }

        public TipoMaquinaDTO(float Id, string descricaoTipoMaquina, ICollection<TipoMaquinaOperacao> operacoes)
        {
            this.Id_tipoMaquina = Id;
            this.descricaoTipoMaquina = descricaoTipoMaquina;
            setOperacoes(operacoes);
        }

        public void setOperacoes(ICollection<TipoMaquinaOperacao> operacoestipo)
        {
            operacoes = new List<OperacaoDTO>();
            foreach (TipoMaquinaOperacao tipoMaquinaOperacao in operacoestipo)
            {
                operacoes.Add(tipoMaquinaOperacao.operacao.toDTO());
            }
        }
    }
}