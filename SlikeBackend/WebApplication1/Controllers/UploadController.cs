using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using ImageMagick;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {


        private readonly DatotekasController _datotekasController;
        private readonly KonverzijasController _konverzijasController;
        public UploadController(
        DatotekasController datotekasController, KonverzijasController konverzijasController)
        {
            _datotekasController = datotekasController;
            _konverzijasController = konverzijasController;
        }


    
  

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload()
        {
            try
            {
                // namistam putanju do datoteka, radim folder images ako ga nema
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (!Directory.Exists(pathToSave))
                {
                    Directory.CreateDirectory(pathToSave);
                }


                // radim tiff
                var originalname = "MultiplePage.tiff";
                var filename = DateTime.UtcNow.ToString("yyyyMMddHHmmss") + "_"+ originalname;
                var path = pathToSave + "\\"+ filename;
                using (var images = new MagickImageCollection())
                {
                    for (int i = 0; i < Request.Form.Files.Count; i++)
                    {
                        var file = Request.Form.Files[i];
                        if (file.Length > 0)
                        {
                            using (var ms = new MemoryStream())
                            {
                                file.CopyTo(ms);
                                var fileBytes = ms.ToArray();
   
                                var image = new MagickImage(fileBytes)
                                {
                                    Format = MagickFormat.Tif,
                                    Depth = 8,
                                };
                                images.Add(image);
                            }
                        }
                       
                    }

                    images.Write(path);
                    images.Dispose();
                }



                var fileInfo = new System.IO.FileInfo(path);
                // dodajem u tablicu datoteke 
                Datoteka dat = new Datoteka
                {
                    originalname = originalname,
                    filename = filename,
                    path = path,
                    size = fileInfo.Length,
                    mimetype = "image/tiff"
                };
                var resultDat = await _datotekasController.PostDatoteka(dat);
                var dodanaDat = (Datoteka)((CreatedAtActionResult)resultDat.Result).Value;


                // dodajem u tablicu Konverzije
                Konverzija kon = new Konverzija
                {
                    PkResDatoteka = dodanaDat.PkDatoteka,
                    dateAdded = DateTime.Now
                };
                var resultKon = await _konverzijasController.PostKonverzija(kon);
                var dodanaKon = (Konverzija)((CreatedAtActionResult)resultKon.Result).Value;


                // sada dodajem sve datoteke u tablicu i stavljam im PkKonverzije
                // spremam ih u folder
                for (int i = 0; i < Request.Form.Files.Count; i++)
                {

                    var file = Request.Form.Files[i];

                    if (file.Length > 0)
                    {
                        var FileOriginalname = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        var fileName = DateTime.UtcNow.ToString("yyyyMMddHHmmss") + "_"+ i + "_" + FileOriginalname;
                        var fullPath = Path.Combine(pathToSave, fileName);
                        var dbPath = Path.Combine(folderName, fileName);

                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }

                        Datoteka datoteka = new Datoteka
                        {
                            originalname = FileOriginalname,
                            filename = fileName,
                            path = dbPath,
                            size = file.Length,
                            mimetype = file.ContentType,
                            PkKonverzija = dodanaKon.PkKonverzija
                        };
                        var resultDatoteka = await _datotekasController.PostDatoteka(datoteka);
                    }

                }





                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }


 

    }

}

