using LAPR5_3DD_019.Models.Shared;
using LAPR5_3DD_019.Models.ValueObjects;

namespace LAPR5_3DD_019.Models {

  public class Maquina: Entity, IAggregateRoot {
    public NomeMaquina nomeMaquina {get; set;}
    public PosicaoNaLinhaProducao posicaoLinhaProducao {get;set;}
    public TipoMaquina tipoMaquina {get;set;}

    public Maquina() {}

    /*public Maquina(Descricao descricaoMaquina) {
      this.descricaoMaquina = descricaoMaquina;
      //this.tipoMaquina = tipoMaquina;
    }  */  
  }
}
