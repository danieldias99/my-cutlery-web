using LAPR5_3DD_019.Models.ClassesDeDominio;
using LAPR5_3DD_019.Models.DTO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LAPR5_3DD_019.Associations;

namespace LAPR5_3DD_019.Models.Repositorios
{

    public class LinhaProducaoRepositorio
    {

        private readonly MDFContext _context;

        public LinhaProducaoRepositorio(MDFContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<LinhaProducaoDTO>> getLinhaProducaoById(long id)
        {
            var linhaOp = await _context.LinhasProducao.FindAsync(id);
            setMaquinaLinhaProducao(linhaOp);
            return linhaOp.toDTO();
        }


        public void addLinhaProducao(LinhaProducao newLinhaProducao)
        {
            setMaquinaLinhaProducao(newLinhaProducao);
            _context.LinhasProducao.Add(newLinhaProducao);
            _context.SaveChanges();
        }

        public void setMaquinaLinhaProducao(LinhaProducao linhaProducao)
        {
            var all_linhasProducao = _context.LinhaProducaoMaquinas;

            foreach (LinhaProducaoMaquinas linha in all_linhasProducao)
            {
                if (linha.id_linhaProducao == linhaProducao.Id)
                {
                    linha.maquina = _context.Maquinas.Find(linha.id_maquina);
                    linhaProducao.addMaquina(linha);
                }
            }
        }

        /*public void updateLinhaProducao(LinhaProducao linha, LinhaProducao newLinhaProducao)
        {    
            _context.LinhasProducao.Update(linha);
            _context.SaveChanges();
        }*/

        public void deleteLinhaProducao(LinhaProducao linha)
        {
            _context.LinhasProducao.Remove(linha);
            _context.SaveChanges();
        }
    }
}