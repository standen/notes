const glob = require("glob");
const json2ts = require("json-schema-to-typescript");
const fs = require("fs");

const PATH_TO_GENERATED_TYPES_FILE = "./src/api/generated_types.ts";

const schemes = glob.sync(
  "../backend_django/api/json_schemes/**/*.schema.json",
);

fs.writeFileSync(PATH_TO_GENERATED_TYPES_FILE, "");

for (const schema of [...new Set([...schemes])]) {
  json2ts
    .compileFromFile(schema, {
      bannerComment: "",
      declareExternallyReferenced: false,
      additionalProperties: false,
    })
    .then((ts) =>
      fs.appendFileSync(PATH_TO_GENERATED_TYPES_FILE, `${ts}\n`, {
        encoding: "utf8",
      }),
    );
}
