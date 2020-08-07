export default class Etudiant{

    constructor(ine, origine,semestres,poursuite)
    {
        this.ine=ine;
        this.origine=origine;
        this.semestres=semestres;
        this.poursuite=poursuite;
    }

    get ine()
    {
        return this._ine;
    }

    set ine(valeur)
    {
        this._ine=valeur;
    }

    get origine()
    {
        return this._origine;
    }

    set origine(valeur)
    {
        this._origine=valeur;
    }
    get semestres()
    {
        return this._semestres;
    }

    set semestres(valeur)
    {
        this._semestres=valeur;
    }

    get poursuite()
    {
        return this._poursuite;
    }

    set poursuite(valeur){

        this._poursuite=valeur;
    }
}