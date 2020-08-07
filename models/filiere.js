export default class filiere{
    constructor(nom,annee,etudiants)
    {
        this.nom=nom;
        this.annee=annee;
        this.etudiants=etudiants;
    }

    get nom()
    {
        return this._nom;
    }

    get annee()
    {
        return this._annee;
    }

    get etudiants()
    {
        return this._etudiants;
    }

    set nom(valeur)
    {
        this._nom=valeur;
    }

    set annee(valeur){
        this._annee=valeur;
    }

    set etudiants(valeur){
        this._etudiants=valeur;
    }
}