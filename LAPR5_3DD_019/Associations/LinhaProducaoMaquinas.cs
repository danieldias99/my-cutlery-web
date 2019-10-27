using LAPR5_3DD_019.Models;

namespace LAPR5_3DD_019.Associations
{

    public class LinhaProducaoMaquinas
    {

        public long id_maquina { get; set; }
        public Maquina maquina { get; set; }
        public long id_linhaProducao { get; set; }
        public LinhaProducao linhaProducao { get; set; }

        public LinhaProducaoMaquinas() { }

        public LinhaProducaoMaquinas(long id_maquina, Maquina maquina, long id_linhaProducao, LinhaProducao linhaProducao)
        {
            this.id_maquina = id_maquina;
            this.id_linhaProducao = id_linhaProducao;
            this.maquina = maquina;
            this.linhaProducao = linhaProducao;
        }
    }
}