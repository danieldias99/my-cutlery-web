using LAPR5_3DD_019.Models;
using LAPR5_3DD_019.Models.ValueObjects;

namespace LAPR5_3DD_019.Associations
{

    public class TipoMaquinaOperacao
    {
        public long id_tipoMaquina { get; set; }
        public TipoMaquina tipoMaquina { get; set; }
        public long id_operacao { get; set; }
        public Operacao operacao { get; set; }

        public TipoMaquinaOperacao() { }

        public TipoMaquinaOperacao(TipoMaquina tipoMaquina, Operacao operacao)
        {
            this.tipoMaquina = tipoMaquina;
            this.id_tipoMaquina = tipoMaquina.Id;
            this.operacao = operacao;
            this.id_operacao = operacao.Id;
        }
    }
}