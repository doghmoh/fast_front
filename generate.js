import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const projectPath = process.cwd();

const readYAML = () => {
  const file = path.join(projectPath, "project.yaml");
  const data = fs.readFileSync(file, "utf-8");
  return yaml.load(data);
};

const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
};

const writeFile = (filePath, content) => {
  fs.writeFileSync(filePath, content, "utf-8");
};

// No longer generates component files, just creates folder (optional)
const generateCRUDComponent = (entity) => {
  const folder = path.join(projectPath, `@components/${entity.name}`);
  createDir(folder);
};

// For non-CRUD (static/simple) components
const generateSimpleComponent = (entity) => {
  const folder = path.join(projectPath, `@components/${entity.name}`);
  createDir(folder);

  const nameCapital = capitalize(entity.name);

  const content = `import React from 'react';

const ${nameCapital} = () => {
  return <div>${entity.name} component</div>;
};

export default ${nameCapital};
`;

  writeFile(path.join(folder, `${entity.name}.tsx`), content);
};

// Only one import of generic EntityPage now
const updateAppRoutes = (entities) => {
  const imports = `// AUTO-GENERATED IMPORTS START
import EntityPage from '@components/shared/EntityPage';
// AUTO-GENERATED IMPORTS END`;

  const routes = entities
    .map((e) => {
      const pathRoute = e.route === "/" ? "" : e.route;
      const element = e.crud
        ? `<EntityPage entityName="${e.name}" />`
        : `<${capitalize(e.name)} />`;

      return `  <Route path="${pathRoute}" element={${element}} />`;
    })
    .join("\n");

  const appPath = path.join(projectPath, "src", "App.tsx");
  let appContent = fs.readFileSync(appPath, "utf-8");

  appContent = appContent.replace(
    /\/\/ AUTO-GENERATED IMPORTS START[\s\S]*?\/\/ AUTO-GENERATED IMPORTS END/,
    imports
  );

  appContent = appContent.replace(
    /{\/\*\s*AUTO-GENERATED ROUTES START\s*\*\/}[\s\S]*?{\/\*\s*AUTO-GENERATED ROUTES END\s*\*\/}/,
    `{/* AUTO-GENERATED ROUTES START */}\n${routes}\n{/* AUTO-GENERATED ROUTES END */}`
  );

  writeFile(appPath, appContent);
};

// Sidebar route generation (unchanged)
const updateSidebarRoutes = (entities) => {
  const routesPath = path.join(projectPath, "src", "routes.ts");
  let fileContent = fs.readFileSync(routesPath, "utf-8");

  const iconImport = `import { icons } from "lucide-react";`;
  if (!fileContent.includes(iconImport)) {
    fileContent = `${iconImport}\n\n${fileContent}`;
  }

  const routeEntries = entities
    .map((e) => {
      const label = capitalize(e.name);
      const pathRoute = e.route;
      return `  { to: '${pathRoute}', label: '${label}', icon: icons.Tags },`;
    })
    .join("\n");

  fileContent = fileContent.replace(
    /\/\/ AUTO-GENERATED ROUTES START[\s\S]*?\/\/ AUTO-GENERATED ROUTES END/,
    `// AUTO-GENERATED ROUTES START\n${routeEntries}\n// AUTO-GENERATED ROUTES END`
  );

  writeFile(routesPath, fileContent);
};

// === Main generator ===
const generate = () => {
  const config = readYAML();

  config.entities.forEach((entity) => {
    entity.crud
      ? generateCRUDComponent(entity) // No file creation, only folder if needed
      : generateSimpleComponent(entity);
  });

  console.log("✅ Components handled.");
  updateAppRoutes(config.entities);
  console.log("✅ App routes updated.");
  updateSidebarRoutes(config.entities);
  console.log("✅ Sidebar routes updated.");
  console.log("✅ Project files generated.");
};

generate();
