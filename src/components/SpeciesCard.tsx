import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { Species } from '../types/Species';

interface SpeciesCardProps {
  species: Species;
  baseUrl: string;
}

export default function SpeciesCard({ species, baseUrl }: SpeciesCardProps) {
  const qrCodeUrl = `${baseUrl}/species/${species.id}`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{species.commonName}</h2>
          <p className="text-sm italic text-gray-600 mb-2">{species.scientificName}</p>
          
          <div className="space-y-2">
            <p><strong>Família:</strong> {species.family}</p>
            <p><strong>Código do Pote:</strong> {species.potCode}</p>
            <p><strong>Código de Referência:</strong> {species.referenceCode}</p>
            <p><strong>Biomas:</strong> {species.biomes.join(', ')}</p>
            <p><strong>Data da Coleta:</strong> {new Date(species.collectionDate).toLocaleDateString()}</p>
            <p><strong>Local:</strong> {species.collectionLocation}</p>
            <p><strong>Coletor:</strong> {species.collector}</p>
          </div>

          {species.observations && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-900">Observações:</h3>
              <p className="text-gray-700 mt-1">{species.observations}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center">
          <QRCodeSVG
            value={qrCodeUrl}
            size={200}
            level="H"
            includeMargin={true}
          />
          <p className="text-sm text-gray-500 mt-2">Escaneie para ver detalhes</p>
        </div>
      </div>
    </div>
  );
}