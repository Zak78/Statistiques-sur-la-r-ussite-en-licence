export default class semestre{
    constructor(semestreUn , semestreDeux)
    {
        this.semestreUn=semestreUn;
        this.semestreDeux=semestreDeux;
    }

    get semestreUn()
    {
        return this._semestreUn;
    }

    get semestreDeux()
    {
        return this._semestreDeux;
    }
    set semestreUn(valeur)
    {
        this._semestreUn=valeur;
    }
    set semestreDeux(valeur)
    {
        this._semestreDeux=valeur;
    }
}