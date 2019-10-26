using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using LAPR5_3DD_019.Models.ClassesDeDominio;
using LAPR5_3DD_019.Models;
using LAPR5_3DD_019.Models.DTO;
using LAPR5_3DD_019.Models.Repositorios;

namespace LAPR5_3DD_019.Controllers
{
    [Route("api/TipoMaquina")]
    [ApiController]
    public class TipoMaquinaController : ControllerBase
    {
        public TipoMaquinaRepositorio repositorio;

        public TipoMaquinaController(MDFContext context)
        {
            repositorio = new TipoMaquinaRepositorio(context);
        }

        // GET: api/TipoMaquina/ID
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoMaquinaDTO>> GetTipoMaquina(long id)
        {
            var tipoMaquinaDTO = await repositorio.getTipoMaquinaById(id);

            if (tipoMaquinaDTO == null)
            {
                return NotFound();
            }

            return tipoMaquinaDTO;
        }

        // POST: api/Operacao
        [HttpPost]
        public async Task<ActionResult<Operacao>> PostTipoMaquina(TipoMaquina newTipoMaquina)
        {
            repositorio.addTipoMaquina(newTipoMaquina);
            return CreatedAtAction(nameof(GetTipoMaquina), new { id = newTipoMaquina.Id }, newTipoMaquina);
        }
    }
}