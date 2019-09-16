import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { environment } from "../../environments/environment";

@Injectable()
export class ApiTrelloService {
  // url: String = "http://interno.ldsoft.com.br:4080/ldteam";
  url: String = "https://api.trello.com";

  // wsantos@ldsoft
  // idBoardBB = "5a7da192d45ff8754e5f610e";
  // token = "756f9fae4cc70b75d29db7d35bf9f52561f574ef2cab6ffae2cca652c463deb5";
  // key = "10b6f7d5d5df7e316e10c791583bea53";

  // servicos@ldsoft
  idBoardBB = "5a7da192d45ff8754e5f610e";
  token = "e957cffcda91e733837a5e3d11516e56732ed357361f957db72b73e2fac6ea33";
  key = "4ccd1947aff8de13506639fcf9fabf9b";



  auth =
    "key=4ccd1947aff8de13506639fcf9fabf9b&token=e957cffcda91e733837a5e3d11516e56732ed357361f957db72b73e2fac6ea33";

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

    // tslint:disable-next-line:max-line-length
    return this.http.get(
      this.url +
        "/" +
        endpoint +
        "&key=10b6f7d5d5df7e316e10c791583bea53&token=756f9fae4cc70b75d29db7d35bf9f52561f574ef2cab6ffae2cca652c463deb5",
      reqOpts
    );
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    // tslint:disable-next-line:max-line-length
    return this.http.post(
      this.url +
        "/" +
        endpoint +
        "&key=4ccd1947aff8de13506639fcf9fabf9b&token=e957cffcda91e733837a5e3d11516e56732ed357361f957db72b73e2fac6ea33",
      body,
      reqOpts
    );
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
    const token = window.localStorage.getItem("token");

    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set("Authorization", `Bearer ${token}`);

    return headers;
  }
}
