using LAPR5_3DD_019.Models.ClassesDeDominio;
using LAPR5_3DD_019.Models.DTO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LAPR5_3DD_019.Models.Repositorios
{

    public class LinhaProducaoRepositorio
    {

        private readonly LAPR5DBContext _context;

        public LinhaProducaoRepositorio(LAPR5DBContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<LinhaProducaoDTO>> getLinhaProducaoById(long id)
        {
            var linhaOp = await _context.LinhasProducao.FindAsync(id);
            return linhaOp.toDTO();
        }

        public void addLinhaProducao(LinhaProducao newLinhaProducao)
        {
            _context.LinhasProducao.Add(newLinhaProducao);
            _context.SaveChanges();
        }

        /*public void updateLinhaProducao(LinhaProducao linha, LinhaProducao newLinhaProducao)
        {    
            _context.LinhasProducao.Update(linha);
            _context.SaveChanges();
        }*/

        public void deleteLinhaProducaoById(LinhaProducao linha)
        {   
            _context.LinhasProducao.Remove(linha);
            _context.SaveChanges();
        }
    }
}