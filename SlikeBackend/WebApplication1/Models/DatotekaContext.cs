using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class DatotekaContext : DbContext
    {
        public DatotekaContext(DbContextOptions<DatotekaContext> options)
            : base(options)
        {
        }

        public DbSet<Datoteka> Datotekas { get; set; }
        public DbSet<Konverzija> Konverzijas { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Datoteka>()
                .HasOne(p => p.Konverzija)
                .WithMany(b => b.Datotekas)
                .HasForeignKey(p => p.PkKonverzija);
        }
    }
}
