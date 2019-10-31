using MDP.Models.ClassesDeDominio;
using MDP.Models.DTO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MDP.Models.Repositorios{

    

    public class PlanoFabricoRepositorio{

        private readonly MDPContext _context;

        public PlanoFabricoRepositorio(MDPContext context){
            _context = context;
        }

        public async Task<ActionResult<PlanoFabricoDTO>> getPlanoFabricoById(long id){
            var PlanoFabrico = await _context.PlanosProducao.FindAsync(id);
            return PlanoFabrico.toDTO();
        }

        public void addPlanoFabrico(PlanoFabrico newPlanoFabrico){
            _context.PlanosProducao.Add(newPlanoFabrico);
            _context.SaveChanges();
        }
    }
}