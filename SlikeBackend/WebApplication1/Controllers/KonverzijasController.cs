using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KonverzijasController : ControllerBase
    {
        private readonly DatotekaContext _context;

        public KonverzijasController(DatotekaContext context)
        {
            _context = context;
        }

        // GET: api/Konverzijas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Konverzija>>> GetKonverzijas()
        {
            return await _context.Konverzijas.ToListAsync();
        }

        // GET: api/Konverzijas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Konverzija>> GetKonverzija(long id)
        {
            var konverzija = await _context.Konverzijas.FindAsync(id);

            if (konverzija == null)
            {
                return NotFound();
            }

            return konverzija;
        }

        // PUT: api/Konverzijas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKonverzija(long id, Konverzija konverzija)
        {
            if (id != konverzija.PkKonverzija)
            {
                return BadRequest();
            }

            _context.Entry(konverzija).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KonverzijaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Konverzijas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Konverzija>> PostKonverzija(Konverzija konverzija)
        {
            _context.Konverzijas.Add(konverzija);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKonverzija", new { id = konverzija.PkKonverzija }, konverzija);
        }

        // DELETE: api/Konverzijas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Konverzija>> DeleteKonverzija(long id)
        {
            var konverzija = await _context.Konverzijas.FindAsync(id);
            if (konverzija == null)
            {
                return NotFound();
            }

            _context.Konverzijas.Remove(konverzija);
            await _context.SaveChangesAsync();

            return konverzija;
        }

        private bool KonverzijaExists(long id)
        {
            return _context.Konverzijas.Any(e => e.PkKonverzija == id);
        }
    }
}
