import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { environment } from "../../environments/environment";

@Injectable()
export class ApiLdteamService {
  // url: String = "http://interno.ldsoft.com.br:4080/ldteam";
  url: String = environment.baseUrlLdteam;

  constructor(public http: HttpClient, private snackBar: MatSnackBar) {}

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();

      for (const k in params) {
        if (params.hasOwnProperty(k)) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }

    return this.http.get(this.url + "/" + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + "/" + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + "/" + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + "/" + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + "/" + endpoint, body, reqOpts);
  }

  exibirErros(erros: string[]) {
    const msg = erros.join("\n");
    this.snackBar.open(msg, "OK", { panelClass: "quebra-linha" });
  }

  gerarHeader() {

    const token = JSON.parse(window.localStorage.getItem("token"));
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set("Authorization", `Bearer ${token}`);
    headers = headers.set("CodigoEmpresa", "ldsoft");

    return headers;
  }
}
