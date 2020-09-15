import { Injectable } from "@angular/core";
@Injectable()
export class Config {
    // ----- API_URL ----------------------------------------------------------
    // url prema api-ima
    public API_URL = 'http://localhost:56699/api/';

    // ----- APIRetryCount ----------------------------------------------------
    // definira koliko puta ce se pozvati api ako pukne
    public APIRetryCount = 3;

    // ----- devMode ----------------------------------------------------------
    // 0 - kontrolira da li je korisnik logiran i spriječava navigaciju
    // 1 - ne kontrolira ništa i dopušta navigaciju
    public devMode = 0;

    // ----- language ---------------------------------------------------------
    // hr - hrvatski jezik
    // en - engleski jezik
    public language = 'hr';

}
