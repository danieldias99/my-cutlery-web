using Microsoft.EntityFrameworkCore;

namespace LAPR5_3DD_019.Models.ClassesDeDominio
{
    public class LAPR5DBContext : DbContext
    {
        public LAPR5DBContext(DbContextOptions<LAPR5DBContext> options) : base(options) { }

        public DbSet<Operacao> Operacoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Operacao>().HasKey(j => j.Id);

            modelBuilder.Entity<Operacao>().OwnsOne(j => j.descricaoOperacao);
            modelBuilder.Entity<Operacao>().OwnsOne(j => j.duracaoOperacao);
        }

    }
}