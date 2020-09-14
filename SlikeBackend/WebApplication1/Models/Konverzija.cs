using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Konverzija
    {
        [Key]
        public long PkKonverzija { get; set; }

        public long PkResDatoteka { get; set; }

        public DateTime dateAdded { get; set; }

        public List<Datoteka> Datotekas { get; set; }



    }
}
