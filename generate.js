// generate.js
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const baseDir = path.join(__dirname, "src", "components");

function generateCRUDFiles(entity, label, fields) {
  const Entity = capitalize(entity);

  const pageContent = `import React from "react";
import EntityPage from "../../shared/crud/EntityPage";
import ${Entity}List from "./${Entity}List";
import ${Entity}Form from "./${Entity}Form";

const ${Entity}Page = () => (
  <EntityPage
    title="${label}"
    subtitle="Liste des ${label.toLowerCase()}"
    ListComponent={${Entity}List}
    FormComponent={${Entity}Form}
  />
);

export default ${Entity}Page;
`;

  const listContent = `import React from "react";

const ${Entity}List = () => {
  return <div>Liste de ${label}</div>;
};

export default ${Entity}List;
`;

  const formContent = `import React from "react";

const ${Entity}Form = ({ onSubmit, defaultValues }) => {
  return <form onSubmit={onSubmit}>Formulaire ${label}</form>;
};

export default ${Entity}Form;
`;

  return { pageContent, listContent, formContent };
}

function generateSimpleComponent(entity, label) {
  const Entity = capitalize(entity);
  return `import React from "react";

const ${Entity} = () => {
  return <div>${label}</div>;
};

export default ${Entity};
`;
}

function generateCRUDStructure(entity, label, fields) {
  const dir = path.join(baseDir, entity);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const { pageContent, listContent, formContent } = generateCRUDFiles(
    entity,
    label,
    fields
  );

  const capital = capitalize(entity);
  fs.writeFileSync(path.join(dir, `${capital}Page.tsx`), pageContent);
  fs.writeFileSync(path.join(dir, `${capital}List.tsx`), listContent);
  fs.writeFileSync(path.join(dir, `${capital}Form.tsx`), formContent);

  fs.writeFileSync(
    path.join(dir, "index.tsx"),
    `export { default } from "./${capital}Page";`
  );
}

function generateNonCRUD(entity, label) {
  const dir = path.join(baseDir, entity);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const capital = capitalize(entity);
  const content = generateSimpleComponent(entity, label);
  fs.writeFileSync(path.join(dir, `${capital}.tsx`), content);
  fs.writeFileSync(path.join(dir, `index.tsx`), `export { default } from "./${capital}";`);
}

function main() {
  const file = path.join(__dirname, "project.yaml");
  const config = yaml.load(fs.readFileSync(file, "utf8"));

  for (const entity of config.entities) {
    if (entity.crud) {
      generateCRUDStructure(entity.name, entity.label, entity.fields);
    } else {
      generateNonCRUD(entity.name, entity.label);
    }
  }

  console.log("✅ Project structure generated!");
}

main();
