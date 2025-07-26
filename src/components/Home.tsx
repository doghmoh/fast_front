import React from "react";

const Home = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">🚀 Project Generator</h1>
      <p className="text-gray-700 mb-4">
        Welcome! This project was created to help you build structured, maintainable CRUD apps using <strong>Vite</strong>, <strong>Tailwind CSS</strong>, <strong>TanStack Query</strong>, and a customizable generator based on <code>generate.yaml</code>.
      </p>

      <div className="bg-gray-50 border rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">🛠 How to Use</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Create or modify the <code>generate.yaml</code> file.</li>
          <li>Define your routes and entity fields.</li>
          <li>Run <code>node generate.js</code> to auto-generate forms, lists, and pages.</li>
          <li>Start building your app!</li>
        </ol>
      </div>

      <div className="bg-blue-50 text-blue-900 border-l-4 border-blue-400 p-4 rounded">
        <strong>Example <code>generate.yaml</code>:</strong>
        <pre className="text-sm mt-2 bg-white p-3 rounded border overflow-auto">
{`routes:
  - name: products
    label: Produits
    crud: true
    fields:
      - name: name
        label: Nom
        type: text
      - name: price
        label: Prix
        type: number

  - name: dashboard
    label: Tableau de Bord
    crud: false
    component: Dashboard`}
        </pre>
      </div>
    </div>
  );
};

export default Home;
