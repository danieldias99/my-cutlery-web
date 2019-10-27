using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using LAPR5_3DD_019.Models.ClassesDeDominio;
using LAPR5_3DD_019.Models;
using LAPR5_3DD_019.Models.DTO;
using LAPR5_3DD_019.Models.Repositorios;

namespace LAPR5_3DD_019.Controllers
{
    [Route("api/Operacao")]
    [ApiController]
    public class OperacaoController : ControllerBase
    {
        public OperacaoRepositorio repositorio;

        public OperacaoController(MDFContext context)
        {
            repositorio = new OperacaoRepositorio(context);
        }

        // GET: api/Operacao/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OperacaoDTO>> GetOperacao(long id)
        {
            var operacaoDTO = await repositorio.getOperacaoById(id);
            if (operacaoDTO == null)
            {
                return NotFound();
            }
            return operacaoDTO;
        }

        // POST: api/Operacao
        [HttpPost]
        public async Task<ActionResult<Operacao>> PostOperacao(Operacao newOperacao)
        {
            repositorio.addOperacao(newOperacao);
            return CreatedAtAction(nameof(GetOperacao), new { id = newOperacao.Id }, newOperacao);
        }

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOperacao(long id, Operacao update_operacao)
        {
            var operacaoDTO = await repositorio.getOperacaoById(id);

            if (operacaoDTO == null)
            {
                return NotFound();
            }

            if (id != operacaoDTO.Value.Id)
            {
                return BadRequest();
            }

            repositorio.updateOperacao(update_operacao);
            return NoContent();
        }
    }
}