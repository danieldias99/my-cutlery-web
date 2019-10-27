using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MDP.Models.ClassesDeDominio;
using MDP.Models;
using MDP.Models.DTO;
using MDP.Models.Repositorios;

namespace MDB.Controllers
{
    [Route("api/PlanoFabrico")]
    [ApiController]
    public class PlanoFabricoController : ControllerBase
    {
        public PlanoFabricoRepositorio repositorio;

        public PlanoFabricoController(MDPContext context)
        {
            repositorio = new PlanoFabricoRepositorio(context);

        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<PlanoFabricoDTO>> GetPlanoFabrico(long id)
        {
            var PlanoFabricoDTO = await repositorio.getPlanoFabricoById(id);

            if (PlanoFabricoDTO == null)
            {
                return NotFound();
            }

            return PlanoFabricoDTO;
        }

        [HttpPost]
        public async Task<ActionResult<PlanoFabrico>> PostPlanoFabrico(PlanoFabrico newPlanoFabrico)
        {
            repositorio.addPlanoFabrico(newPlanoFabrico);
            return CreatedAtAction(nameof(GetPlanoFabrico), new { id = newPlanoFabrico.Id }, newPlanoFabrico);
        }


    }
}