

namespace LAPR5_3DD_019.Models.DTO
{

    public class OperacaoDTO
    {

        public float Id { get; set; }
        public string descricaoOperacao { get; set; }
        public string duracaoOperacao { get; set; }

        public OperacaoDTO(float Id, string descricaoOperacao, string duracaoOperacao)
        {
            this.Id = Id;
            this.descricaoOperacao = descricaoOperacao;
            this.duracaoOperacao = duracaoOperacao;
        }


    }
}