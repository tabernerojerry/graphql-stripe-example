import fs from "fs";
import path from "path";

export default file => fs.readFileSync(path.join(__dirname, file), "utf-8");
