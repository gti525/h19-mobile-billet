import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasserelleService {

  private API_KEY_PASSERELLE = "2+++FhHMhnGTZnCRZZ7pSrqaOFz2FaO6wIv0ngvGGk0="
  private API_URL_PASSERELLE = "https://h19-passerelle.herokuapp.com/api/v1/"

  //ETAPE 1
  private API_POST_REQUEST_PASSERELLE_CREATE = "transaction/create"
  private API_POST_REQUEST_PASSERELLE_PROCESS = "transaction/process"
  private PRIX_PRENIUM = 2.00
  private resultatEtape1 = "";

  //ETAPE 2
  private resultatEtape2 = "";

  //ETAPE 3
  private API = ""
  private resultatEtape3 = "";

  constructor(private http: HttpClient) {

  }

  paiementPreniumEtape1(prenomCC, nomCC, numeroCC, cvvCC, moisExpCC, anneeExpCC) {
    // pas oublige de mettre le content-type?
    console.log("paiementPreniumEtape1")
    this.http.post(this.API_URL_PASSERELLE+this.API_POST_REQUEST_PASSERELLE_CREATE, {
            "MERCHANT_API_KEY": this.API_KEY_PASSERELLE,
            "amount": this.PRIX_PRENIUM,
            "purchase_desc": "Prix prenium pour enlever publicite",
            "credit_card": {
              "first_name": prenomCC,
              "last_name": nomCC,
              "number": numeroCC,
              "cvv": cvvCC+"",
              "exp": {
                "month": moisExpCC,
                "year": anneeExpCC
              }
            }
        }).subscribe(data => {
          console.log("ca marche")
          this.resultatEtape1 = "Etape 1 : "+data['_body']+", numero de transaction : "+data['_body']["transaction_number"]
          //console.log(this.resultatEtape1)
          this.paiementPreniumEtape2(data['_body']["transaction_number"])
      }, error => {
          console.log("erreur")
          this.resultatEtape1 = "Etape 1 (erreur) : "+error.status+", erreur : "+error.error+", details : "+error.headers
          console.log(this.resultatEtape1)
      });
  }

  //ne marche pas encore, il faut attendre l'equipe de passerelle
  paiementPreniumEtape2(numeroTransaction) {
    // pas oublige de mettre le content-type?
    console.log("paiementPreniumEtape2")
    this.http.post(this.API_URL_PASSERELLE+this.API_POST_REQUEST_PASSERELLE_PROCESS, {
      "transaction_number": numeroTransaction+"",
      "action": "CONFIRM",
      "MERCHANT_API_KEY": this.API_KEY_PASSERELLE
    }).subscribe(data => {
          console.log("ca marche")
          this.resultatEtape1 = "Etape 2 : "+data['_body']
          console.log(this.resultatEtape2)
      }, error => {
          console.log("erreur")
          this.resultatEtape2 = "Etape 2 (erreur) : "+error.status+", erreur : "+error.error+", details : "+error.headers
          console.log(this.resultatEtape2)
      });
  }

    //ne marche pas encore, il faut attendre l'equipe de reseau social (pour update le compte de l'utilisateur)
    paiementPreniumEtape3(numeroTransaction) {
      // pas oublige de mettre le content-type?
      console.log("paiementPreniumEtape3")
      this.http.post(this.API, {
        
      }).subscribe(data => {
            console.log("ca marche")
            this.resultatEtape3 = "Etape 3 : "+data['_body']
            console.log(this.resultatEtape3)
        }, error => {
            console.log("erreur")
            this.resultatEtape3 = "Etape 3 (erreur) : "+error.status+", erreur : "+error.error+", details : "+error.headers
            console.log(this.resultatEtape3)
        });
    }
}
