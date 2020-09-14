using System;
using System.Collections.Generic;
using System.Diagnostics;
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
    public class DatotekasController : ControllerBase
    {
        private readonly DatotekaContext _context;

        public DatotekasController(DatotekaContext context)
        {
            _context = context;
        }

        // GET: api/Datotekas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Datoteka>>> GetDatotekas()
        {
            return await _context.Datotekas.ToListAsync();
        }

        // GET: api/Datotekas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Datoteka>> GetDatoteka(long id)
        {
            var datoteka = await _context.Datotekas.FindAsync(id);

            if (datoteka == null)
            {
                return NotFound();
            }

            return datoteka;
        }

        // PUT: api/Datotekas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDatoteka(long id, Datoteka datoteka)
        {
            if (id != datoteka.PkDatoteka)
            {
                return BadRequest();
            }

            _context.Entry(datoteka).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DatotekaExists(id))
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

        // POST: api/Datotekas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Datoteka>> PostDatoteka(Datoteka datoteka)
        {
            _context.Datotekas.Add(datoteka);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDatoteka", new { id = datoteka.PkDatoteka }, datoteka);
        }

        // DELETE: api/Datotekas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Datoteka>> DeleteDatoteka(long id)
        {
            var datoteka = await _context.Datotekas.FindAsync(id);
            if (datoteka == null)
            {
                return NotFound();
            }

            _context.Datotekas.Remove(datoteka);
            await _context.SaveChangesAsync();

            return datoteka;
        }

        private bool DatotekaExists(long id)
        {
            return _context.Datotekas.Any(e => e.PkDatoteka == id);
        }
    }
}
