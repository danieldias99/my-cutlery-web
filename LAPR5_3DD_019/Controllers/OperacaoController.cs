using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LAPR5_3DD_019.Models.ClassesDeDominio;
using LAPR5_3DD_019.Models;
using LAPR5_3DD_019.Models.ValueObjects;

namespace LAPR5_3DD_019.Controllers
{
    [Route("api/Operacao")]
    [ApiController]
    public class OperacaoController : ControllerBase
    {
        private readonly LAPR5DBContext _context;

        public OperacaoController(LAPR5DBContext context)
        {
            _context = context;

            if (_context.Operacoes.Count() == 0)
            {
                // Create a new Operacao if collection is empty,
                // which means you can't delete all Operacoes.
                Operacao op = new Operacao { descricaoOperacao = new Descricao {Id = "OperacaoTeste"}, duracaoOperacao = new DuracaoOperacao {hora=1, min=50, seg=5} };
                _context.Operacoes.Add(op);
                _context.SaveChanges();
            }
        }

        // GET: api/Operacao/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Operacao>> GetOperacao(long id)
        {
            var operacao = await _context.Operacoes.FindAsync(id);

            if (operacao == null)
            {
                return NotFound();
            }

            return operacao;
        }

        // POST: api/Operacao
        [HttpPost]
        public async Task<ActionResult<Operacao>> PostOperacao(Operacao newOperacao)
        {
            _context.Operacoes.Add(newOperacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOperacao), new { id = newOperacao.Id }, newOperacao);
        }
    }
}