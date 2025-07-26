import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load and parse YAML config
const configPath = path.join(__dirname, "project.yaml");
const config = yaml.load(fs.readFileSync(configPath, "utf8"));

const baseSrc = path.join(__dirname, "src");
const foldersToCreate = [
  "components/navigation",
  "contexts",
  "hooks",
  "layout",
  "utils",
];

// Create base folders
foldersToCreate.forEach((folder) => {
  const fullPath = path.join(baseSrc, folder);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created: ${fullPath}`);
  }
});

// Utility: Create file with content
const writeFile = (filePath, content) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`📄 Created: ${filePath}`);
  }
};

// Generate entities (CRUD modules or static pages)
config.entities.forEach((entity) => {
  const { name, crud, route, label } = entity;
  const folderName = name.toLowerCase();
  const compFolder = path.join(baseSrc, "components", folderName);

  fs.mkdirSync(compFolder, { recursive: true });

  const pageName = `${folderName}Page.tsx`;
  const listName = `${folderName}Table.tsx`;
  const formName = `${folderName}Form.tsx`;

  // Create Page
  writeFile(
    path.join(compFolder, pageName),
    `import React, { useState } from "react";
import ContentLayout from "../layout/ContentLayout";
import ${capitalize(folderName)}Form from "./${folderName}Form";
import ${capitalize(folderName)}Table from "./${folderName}Table";

const ${capitalize(folderName)}Page = () => {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <ContentLayout
      title="${label}"
      subtitle="Gestion de ${label.toLowerCase()}"
      onAdd={() => {
        setSelected(null);
        setShowForm(true);
      }}
      addLabel="Ajouter"
    >
      <${capitalize(folderName)}Table
        onEdit={(item) => {
          setSelected(item);
          setShowForm(true);
        }}
      />
      {showForm && (
        <${capitalize(folderName)}Form
          item={selected}
          onClose={() => setShowForm(false)}
        />
      )}
    </ContentLayout>
  );
};

export default ${capitalize(folderName)}Page;
`
  );

  // Create List/Table
  if (crud) {
    writeFile(
      path.join(compFolder, listName),
      `import React from "react";

const ${capitalize(folderName)}Table = ({ onEdit }) => {
  return <div>Table de ${label}</div>;
};

export default ${capitalize(folderName)}Table;
`
    );

    // Create Form
    writeFile(
      path.join(compFolder, formName),
      `import React from "react";

const ${capitalize(folderName)}Form = ({ item, onClose }) => {
  return <div>Formulaire de ${label}</div>;
};

export default ${capitalize(folderName)}Form;
`
    );
  } else {
    // Not CRUD: Only basic page
    writeFile(
      path.join(compFolder, `${folderName}Page.tsx`),
      `import React from "react";

const ${capitalize(folderName)}Page = () => {
  return <div>${label} content here</div>;
};

export default ${capitalize(folderName)}Page;
`
    );
  }
});

// Helper to capitalize component names
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
