using LAPR5_3DD_019.Models.ClassesDeDominio;
using LAPR5_3DD_019.Models.DTO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LAPR5_3DD_019.Models.ValueObjects;

namespace LAPR5_3DD_019.Models.Repositorios{

    public class MaquinaRepositorio{

        private readonly MDFContext _context;

        public MaquinaRepositorio(MDFContext context){
            _context = context;
        }

        public async Task<ActionResult<MaquinaDTO>> getMaquinaByName(NomeMaquina nomeMaquina){
            var maquina = await _context.Maquinas.FindAsync(nomeMaquina.nomeMaquina);
            return maquina.toDTO();
        }

        public void addMaquina(Maquina newMaquina){
            _context.Maquinas.Add(newMaquina);
            _context.SaveChanges();
        }
    }
}
