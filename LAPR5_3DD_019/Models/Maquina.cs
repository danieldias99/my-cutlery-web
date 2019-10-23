using LAPR5_3DD_019.Models.Shared;
using LAPR5_3DD_019.Models.ValueObjects;

namespace LAPR5_3DD_019.Models {

  public class Maquina: Entity, IAggregateRoot {
    public long Id {get; set;}
    public Descricao descricaoMaquina {get;set;}
    // public TipoMaquina tipoMaquina {get;set;}

    protected Maquina() {}

    public Maquina(Descricao descricaoMaquina) {
      this.descricaoMaquina = descricaoMaquina;
      // this.tipoMaquina = tipoMaquina;
    }    
  }
}
