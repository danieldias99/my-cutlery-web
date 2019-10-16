using Microsoft.EntityFrameworkCore;

namespace LAPR5_3DD_019.Model.ClassesDeDominio
    {
        public class LAPR5DBContext : DbContext
        {
            public LAPR5DBContext(DbContextOptions<LAPR5DBContext> options): base(options) {}
        }
    }