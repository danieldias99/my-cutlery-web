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
            /*_context = context;

            if (_context.Operacoes.Count() == 0)
            {
                // Create a new Operacao if collection is empty,
                // which means you can't delete all Operacoes.
                Operacao op = new Operacao { descricaoOperacao = new Descricao {Id = "OperacaoTeste"}, duracaoOperacao = new DuracaoOperacao {hora=1, min=50, seg=5} };
                _context.Operacoes.Add(op);
                _context.SaveChanges();
            }*/
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
    }
}