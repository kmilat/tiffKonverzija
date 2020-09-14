import { Injectable } from "@angular/core";
@Injectable()
export class GlobalVar {
    language = 'hr';
    prodDatabase; // izabrana baza
    HeaderAndFooter = false; // da li se vidi headder i footer

    // definira trajanje alert-a
    trajanjeErrAlert = 5000;

    // trenutno logirani korisnik
    korisnikPkUsera = 0;

    // ----- korisnikIme --------------------------------------------------------
    korisnikIme = '';
    passwordKorisnika = '';
    // ----- korisnikToken ------------------------------------------------------
    // ako je prazan znaci da nema logiranog korisnika
    korisnikToken = 'mojToken:)';

    // ----- korisnikKomponente -------------------------------------------------
    // komponente u koje korisnik moze uci
    korisnikKomponente = null;
    // ----- loginFunction ------------------------------------------------------
    // 0 - logiran je obicni korisnik
    // 1 - logiran je admin
    // 2 - Super User
    // 3 - Vidi sve
    loginFunction = 0;
}
