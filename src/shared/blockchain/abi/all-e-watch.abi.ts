export const ALL_E_WATCH_ABI = [
  'function safeMint(address to, uint256 tokenId, string memory uri) external',
  'function ownerOf(uint256 tokenId) external view returns (address)',
  'function tokenURI(uint256 tokenId) external view returns (string memory)',
  'function transferFrom(address from, address to, uint256 tokenId) external',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
] as const;
