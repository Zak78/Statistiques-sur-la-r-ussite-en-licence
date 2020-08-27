import {Semestre} from './semestres'
export class Etudiant{

    constructor(ine, origine,semestres,poursuite,reussite)
    {
        this._ine=ine;
        this._origine=origine;
        this._semestres=semestres;
        this._poursuite=poursuite;
        this._reussite=reussite;
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

    get reussite()
    {
        return this._reussite;
    }

    set reussite(valeur)
    {
        this._reussite=valeur;
    }
    modifier(origine,semestres,poursuite,reussite)
    {
        this._origine=origine;
        this._semestres=semestres;
        this._poursuite=poursuite;
        this._reussite=reussite;
    }

}
export default new Etudiant("","",new Semestre("",""),"","")