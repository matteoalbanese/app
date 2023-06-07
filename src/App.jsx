
import React,{useState} from 'react';
import MyGroup from "./components/button/MyGroup";
import walletConnect from './components/connectfcn';
import './App.css';

function App() {
  	
	const [walletData, setWalletData] = useState();
	const [account, setAccount] = useState();
	const [network, setNetwork] = useState();
	const [contractAddress, setContractAddress] = useState();

	const [connectTextSt, setConnectTextSt] = useState("🔌 Connect here...");
	const [contractTextSt, setContractTextSt] = useState();
	const [executeTextSt, setExecuteTextSt] = useState();

	const [connectLinkSt, setConnectLinkSt] = useState("");
	const [contractLinkSt, setContractLinkSt] = useState();
	const [executeLinkSt, setExecuteLinkSt] = useState();

	async function connectWallet() {
		if (account !== undefined) {
			setConnectTextSt(`🔌 Account ${account} already connected ⚡ ✅`);
		} else {
			const wData = await walletConnect();

			let newAccount = wData[0];
			let newNetwork = wData[2];
			if (newAccount !== undefined) {
				setConnectTextSt(`🔌 Account ${newAccount} connected ⚡ ✅`);
				setConnectLinkSt(`https://hashscan.io/${newNetwork}/account/${newAccount}`);

				setWalletData(wData);
				setAccount(newAccount);
				setNetwork(newNetwork);
				setContractTextSt();
			}
		}
	}
  
  return (
    <div className="App">
        
		<MyGroup fcn={connectWallet} buttonLabel={"Connect Wallet"} text={connectTextSt} link={connectLinkSt} />

      
    </div>
  );
}

export default App;
