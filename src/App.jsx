import { useState } from "react";
import { ethers } from "ethers";

// ABI untuk BlockVote contract - ganti dengan ABI yang sebenarnya
const contractABI = [
  {
    inputs: [],
    name: "candidateA",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "candidateB",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVoteList",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "voteCandidateA",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "voteCandidateB",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export default function App() {
  const [account, setAccount] = useState("");
  const [votes, setVotes] = useState({ candidateA: 0, candidateB: 0 });
  const [loading, setLoading] = useState(false);

  // Koneksi ke Metamask
  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } else {
      alert("Metamask tidak ditemukan!");
    }
  };

  // Ambil data voting
  const getVotes = async () => {
    if (!account) {
      alert("⚠️ Harus konek wallet dulu!");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
      const voteList = await contract.getVoteList();
      setVotes({
        candidateA: voteList[0].toString(),
        candidateB: voteList[1].toString(),
      });
    } catch (err) {
      console.error(err);
      alert("❌ Gagal ambil data voting!");
    }
  };

  // Vote untuk Candidate A
  const voteA = async () => {
    if (!account) {
      alert("⚠️ Harus konek wallet dulu!");
      return;
    }
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tx = await contract.voteCandidateA();
      await tx.wait();

      alert("✅ Vote untuk Candidate A berhasil!");
      getVotes();
    } catch (err) {
      console.error(err);
      alert("❌ Gagal vote, cek console!");
    } finally {
      setLoading(false);
    }
  };

  // Vote untuk Candidate B
  const voteB = async () => {
    if (!account) {
      alert("⚠️ Harus konek wallet dulu!");
      return;
    }
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tx = await contract.voteCandidateB();
      await tx.wait();

      alert("✅ Vote untuk Candidate B berhasil!");
      getVotes();
    } catch (err) {
      console.error(err);
      alert("❌ Gagal vote, cek console!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[500px] text-center">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">
          🗳️ BlockVote DApp 🗳️
        </h1>

        {!account ? (
          <button
            onClick={connectWallet}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full mb-6 font-semibold"
          >
            Connect Wallet
          </button>
        ) : (
          <p className="mb-6 text-gray-700 break-all">
            ✅ Wallet: <span className="font-mono text-sm">{account}</span>
          </p>
        )}

        <button
          onClick={getVotes}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg w-full mb-8 font-semibold"
        >
          📊 Lihat Hasil Voting 📊
        </button>

        {/* Hasil Voting */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Hasil Voting</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-bold text-blue-700">Candidate A</h3>
              <p className="text-2xl font-bold text-blue-800">
                {votes.candidateA} votes
              </p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <h3 className="font-bold text-red-700">Candidate B</h3>
              <p className="text-2xl font-bold text-red-800">
                {votes.candidateB} votes
              </p>
            </div>
          </div>
        </div>

        {/* Tombol Voting */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Pilih Kandidat Anda
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={voteA}
            disabled={loading}
            className={`px-6 py-4 rounded-lg text-white font-semibold transition-all
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
              }
            `}
          >
            {loading ? "⏳ Voting..." : "🔵 Vote Candidate A"}
          </button>
          <button
            onClick={voteB}
            disabled={loading}
            className={`px-6 py-4 rounded-lg text-white font-semibold transition-all
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 hover:scale-105"
              }
            `}
          >
            {loading ? "⏳ Voting..." : "🔴 Vote Candidate B"}
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>⚠️ Pastikan Anda sudah connect wallet sebelum voting</p>
          <p>💡 Setiap vote akan memerlukan konfirmasi transaksi</p>
        </div>
      </div>
    </div>
  );
}
