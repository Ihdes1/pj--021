import React, { useState } from 'react';
import { Plus, Leaf } from 'lucide-react';
import SpeciesForm from './components/SpeciesForm';
import SpeciesList from './components/SpeciesList';
import type { Species } from './types/Species';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [species, setSpecies] = useState<Species[]>([]);
  
  // Na prática, esta URL seria seu domínio real
  const baseUrl = window.location.origin;

  const handleSpeciesSubmit = async (newSpecies: Omit<Species, 'id' | 'created_at'>) => {
    // Aqui você implementaria a lógica para salvar no Supabase
    // Por enquanto, vamos apenas simular
    const speciesWithId: Species = {
      ...newSpecies,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString()
    };
    
    setSpecies(prev => [...prev, speciesWithId]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Leaf className="h-8 w-8 text-white" />
              <h1 className="ml-3 text-2xl font-bold text-white">Capoteca Digital</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-gray-50"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Espécie
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <SpeciesForm
            onSubmit={handleSpeciesSubmit}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <SpeciesList species={species} baseUrl={baseUrl} />
        )}
      </main>
    </div>
  );
}

export default App;