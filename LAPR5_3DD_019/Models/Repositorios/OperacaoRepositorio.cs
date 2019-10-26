using LAPR5_3DD_019.Models.ClassesDeDominio;
using LAPR5_3DD_019.Models.DTO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LAPR5_3DD_019.Models.Repositorios{

    public class OperacaoRepositorio{

        private readonly MDFContext _context;

        public OperacaoRepositorio(MDFContext context){
            _context = context;
        }

        public async Task<ActionResult<OperacaoDTO>> getOperacaoById(long id){
            var operacao = await _context.Operacoes.FindAsync(id);
            return operacao.toDTO();
        }

        public void addOperacao(Operacao newOperacao){
            _context.Operacoes.Add(newOperacao);
            _context.SaveChanges();
        }
    }
}