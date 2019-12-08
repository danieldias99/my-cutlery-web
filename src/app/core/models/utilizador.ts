
export class Utilizador {

    nr_idCivil: String;
    nome: String;
    email: String;
    password: String;
    isAdmin: Boolean;

    constructor(nr_idCivil: String, nome: String, email: String, password: String) {
        this.nr_idCivil = nr_idCivil;
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.isAdmin = false;
    }

}