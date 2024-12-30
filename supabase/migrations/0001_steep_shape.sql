/*
  # Create species table for Capoteca Digital

  1. New Tables
    - `species`
      - `id` (uuid, primary key)
      - `pot_code` (text, not null)
      - `reference_code` (text, not null)
      - `biomes` (text[], not null)
      - `common_name` (text, not null)
      - `scientific_name` (text, not null)
      - `family` (text, not null)
      - `collection_date` (date, not null)
      - `collection_location` (text, not null)
      - `collector` (text, not null)
      - `observations` (text)
      - `created_at` (timestamptz, default now())
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `species` table
    - Add policies for authenticated users to:
      - Read all species
      - Create their own species
      - Update their own species
*/

CREATE TABLE IF NOT EXISTS species (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pot_code text NOT NULL,
  reference_code text NOT NULL,
  biomes text[] NOT NULL,
  common_name text NOT NULL,
  scientific_name text NOT NULL,
  family text NOT NULL,
  collection_date date NOT NULL,
  collection_location text NOT NULL,
  collector text NOT NULL,
  observations text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE species ENABLE ROW LEVEL SECURITY;

-- Policy to allow reading all species
CREATE POLICY "Anyone can view species"
  ON species
  FOR SELECT
  USING (true);

-- Policy to allow users to create their own species
CREATE POLICY "Users can create their own species"
  ON species
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own species
CREATE POLICY "Users can update their own species"
  ON species
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);