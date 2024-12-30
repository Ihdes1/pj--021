import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { Species } from '../types/Species';
import SpeciesCard from './SpeciesCard';

interface SpeciesListProps {
  species: Species[];
  baseUrl: string;
}

export default function SpeciesList({ species, baseUrl }: SpeciesListProps) {
  const allSpeciesQrUrl = `${baseUrl}/species`;

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">QR Code - Todas as Espécies</h2>
        <div className="flex justify-center">
          <QRCodeSVG
            value={allSpeciesQrUrl}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {species.map((s) => (
          <SpeciesCard key={s.id} species={s} baseUrl={baseUrl} />
        ))}
      </div>
    </div>
  );
}