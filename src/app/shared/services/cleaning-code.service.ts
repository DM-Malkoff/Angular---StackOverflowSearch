import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class CleaningCodeService{
  cleanCode(someName:any){
    let cleanString = someName
      .replaceAll("&#39;", "\'")
      .replaceAll("&amp;", "&")
      .replaceAll("&quot;", "\"")
      .replaceAll("&#237;", "í")
      .replaceAll("&#225;", "á")
      .replaceAll("&#226;", "â")
      .replaceAll("&#242;", "ò")
      .replaceAll("&#252;", "ü")
      .replaceAll("&#232;", "è")
      .replaceAll("&#234;", "ê")
      .replaceAll("&#235;", "ë")
    return cleanString
  }

}
