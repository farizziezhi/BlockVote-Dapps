# BlockVote DApp

Frontend React dengan Vite untuk smart contract voting BlockVote.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` ke `.env` dan isi contract address:
```bash
cp .env.example .env
```

3. Edit `.env` dan masukkan contract address dan ABI:
```
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
```

4. Update ABI di `src/App.jsx` dengan ABI yang sebenarnya dari contract yang sudah di-deploy.

5. Jalankan development server:
```bash
npm run dev
```

## Fitur

- Connect wallet dengan MetaMask
- Lihat hasil voting real-time
- Vote untuk Candidate A atau B
- UI responsif dengan Tailwind CSS

## Smart Contract

Contract BlockVote memiliki fungsi:
- `voteCandidateA()` - Vote untuk kandidat A
- `voteCandidateB()` - Vote untuk kandidat B  
- `getVoteList()` - Ambil hasil voting
- `candidateA` - Jumlah vote kandidat A
- `candidateB` - Jumlah vote kandidat B