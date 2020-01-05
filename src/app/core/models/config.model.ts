export class Config {
    role: String;
    resourse: String;
    permissions: String[];

    constructor(role: String, resourse: String, permissions: String[]) {
        this.role = role;
        this.resourse = resourse;
        this.permissions = permissions;
    }
}