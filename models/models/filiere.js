import {Etudiant} from './etudiant'
export class Filiere{
    constructor(nom,annee,etudiants)
    {
        this._nom=nom;
        this._annee=annee;
        this._etudiants=etudiants;
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
     modifier_etudiant(ine,origine,semestres,poursuite, reussite)
    {
        for(let etudiant of this._etudiants)
        {
            if(etudiant._ine === ine)
            {
                etudiant.modifier(origine,semestres,poursuite,reussite);
                break;
            }
        }
    }

    ajouter_etudiant(ine,origine,semestres,poursuite,reussite)
    {
        let nvEtudiant= new Etudiant(ine,origine,semestres,poursuite,reussite);
        this.etudiants.push(nvEtudiant);
    }

    chercher_etudiant(ine)
    {
        for(let etudiant of this._etudiants)
        {
            if(etudiant._ine === ine)
            {
               return etudiant;
            }
        }
    }
    calculer_effectif()
    {
        return this._etudiants.length;
    }
    calculer_origine(type)
    {
        let cpt=0;
        for(let etudiant of this._etudiants)
        {
            if(etudiant._origine===type)
            {
                cpt++;
            }
        }
        return cpt;
    }

    calculer_poursuite(type_poursuite)
    {
        let cpt=0;
        for(let etudiant of this._etudiants)
        {
            if(etudiant._poursuite===type_poursuite)
            {
                cpt++;
            }
        }
        return cpt;
    }

    calculer_reussite(type_reussite,parti)
    {
        let cpt=0;
        for(let etudiant of this._etudiants)
        {
            if(parti === "Année")
            {
                if(etudiant._reussite ===type_reussite)
                {
                    cpt++;
                }
            }else if(parti === "s1")
            {
                if(etudiant._semestres._semestreUn ===type_reussite)
                {
                    cpt++;
                }
            } else if(parti === "s2")
            {
                if(etudiant._semestres._semestreDeux ===type_reussite)
                {
                    cpt++;
                }
            }
        }
        return cpt;
    }

}
export default new Filiere("","",[])