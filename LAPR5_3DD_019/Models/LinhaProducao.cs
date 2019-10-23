using LAPR5_3DD_019.Models.Shared;
using LAPR5_3DD_019.Models.ValueObjects;
using System.Collections.Generic;

namespace LAPR5_3DD_019.Models
{
    public class LinhaProducao : Entity, IAggregateRoot
    {
        public ID_LinhaProducao Id{ get; set; }
        public List<Maquina> maquinas{ get; set; }

    }
}