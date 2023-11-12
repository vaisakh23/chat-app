import autoBind from 'auto-bind';

export default class baseController {
  name: string;
  constructor() {
    this.name = "base";
    autoBind(this);
  }

  base(req: any, res: any, next: any) {
    console.log(this.name);
    return res.send("Hello, World!");
  }
}
