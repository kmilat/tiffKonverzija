using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Datoteka
    {
        [Key]
        public long PkDatoteka { get; set; }
        public string originalname { get; set; }
        public string filename { get; set; }
        public string path { get; set; }
        public string mimetype { get; set; }
        public long size { get; set; }


        public long PkKonverzija { get; set; }
        public Konverzija Konverzija { get; set; }


    }
}
