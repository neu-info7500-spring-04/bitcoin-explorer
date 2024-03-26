import React, { useState } from 'react';

interface AddressInputProps {
  onAddressSubmit: (address: string) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ onAddressSubmit }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAddressSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address"
      />
      <button type="submit">Fetch Data</button>
    </form>
  );
};

export default AddressInput;
