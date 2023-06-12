
import React, { useState } from "react";
import MyGroup from "./components/MyGroup.jsx";
import walletConnectFcn from "./components/hedera/walletConnect.js";
import contractDeployFcn from "./components/hedera/contractDeploy.js";
import contractExecuteFcn from "./components/hedera/contractExecute.js";
import confirmPurchase from "./components/hedera/SmartContract/confirmPurchase.js";
import "./styles/App.css";
import abortContractFcn from "./components/hedera/SmartContract/abort.js";


function App() {
	
	
	const [walletData, setWalletData] = useState();
	const [account, setAccount] = useState();
	const [network, setNetwork] = useState();
	const [contractAddress, setContractAddress] = useState();
	const [contractObject, setContractObject] = useState();

	const [connectTextSt, setConnectTextSt] = useState("🔌 Connect here...");
	const [contractTextSt, setContractTextSt] = useState();
	const [executeTextSt, setExecuteTextSt] = useState();
	const [abortTextSt, setAbortTextSt]= useState();
	const [confirmPurchaseTextSt, setConfirmPurchaseTextSt]= useState();
	const [confirmReceivedTextSt, setConfirmReceivedTextSt]= useState();
	const [statusText, setStatusText] = useState();

	const [connectLinkSt, setConnectLinkSt] = useState("");
	const [contractLinkSt, setContractLinkSt] = useState();
	const [executeLinkSt, setExecuteLinkSt] = useState();
	const [abortLinkSt, setAbortLinkSt]= useState();
	const [confirmPurchaseLinkSt, setConfirmPurchaseLinkSt]= useState();
	const [confirmReceivedLinkSt, setConfirmReceivedLinkSt]= useState();
	

	const[price, setPrice]= useState();


	async function connectWallet() {
		if (account !== undefined) {
			setConnectTextSt(`🔌 Account ${account} already connected ⚡ ✅`);
		} else {
			const wData = await walletConnectFcn();

			let newAccount = wData[0];
			let newNetwork = wData[2];
			if (newAccount !== undefined) {
				setConnectTextSt(`🔌 Account ${newAccount} connected ⚡ ✅`);
				setConnectLinkSt(`https://hashscan.io/${newNetwork}/account/${newAccount}`);

				//update the react state with the info 
				setWalletData(wData);
				setAccount(newAccount);
				setNetwork(newNetwork);
				setContractTextSt();
			}
		}
	}

	async function contractDeploy() {
		if (account === undefined) {
			setContractTextSt("🛑 Connect a wallet first! 🛑");
		} else {
			if(Number(price) === 0 || price === undefined){
				console.warn("the price insert is not valid ")
				return;}
			const [cAddress, contractObject] = await contractDeployFcn(walletData, Number(price)); //return the contract address

			if (cAddress === undefined) {
			} else {
				setContractObject(contractObject);
				setContractAddress(cAddress);
				setContractTextSt(`Contract ${cAddress} deployed ✅`);
				setExecuteTextSt(``);
				setContractLinkSt(`https://hashscan.io/${network}/address/${cAddress}`);
			}
		}
	}

	async function contractExecute() {
		if (contractAddress === undefined) {
			setExecuteTextSt("🛑 Deploy a contract first! 🛑");
		} else {
			const [txHash, finalCount] = await contractExecuteFcn(walletData, contractAddress);

			if (txHash === undefined || finalCount === undefined) {
			} else {
				setExecuteTextSt(`Count is: ${finalCount} | Transaction hash: ${txHash} ✅`);
				setExecuteLinkSt(`https://hashscan.io/${network}/tx/${txHash}`);
				
			}
		}
	}

	async function abortExecute(){
		if (contractAddress === undefined) {
			setAbortTextSt("🛑 Deploy a contract first! 🛑");
		}else {
			const [txHash] = await abortContractFcn(walletData, contractAddress);

			if (txHash === undefined) {
				console.log("errore nell'aborto");
			} else {
				setAbortTextSt(`l'aborto è avvenuto con successo | Transaction hash: ${txHash} ✅`);
				setAbortLinkSt(`https://hashscan.io/${network}/tx/${txHash}`);
			}
		}
	}
	async function confirmPurchaseEx(){
		if (contractAddress === undefined){
			setConfirmPurchaseTextSt("there is no contract deployed");
		}else {
			const [txHash] = await confirmPurchase(walletData, contractAddress, Number(price));

			if (txHash === undefined) {
				console.log("errore nel confirmPurchaseEx");
			} else {
				setConfirmPurchaseTextSt(`Pagamento confermato | Transaction hash: ${txHash} ✅`);
				setConfirmPurchaseLinkSt(`https://hashscan.io/${network}/tx/${txHash}`);
			}

		}
	}
	async function confirmReceivedEx(){
		if (contractAddress === undefined){
			setConfirmReceivedTextSt("there is no contract deployed");
		}else{
			const [txHash] = await abortContractFcn(walletData, contractAddress);

			if (txHash === undefined) {
				console.log("errore nel confirmReceivedEx");
			} else {
				setConfirmReceivedTextSt(`Lavoro consegnato | Transaction hash: ${txHash} ✅`);
				setConfirmReceivedLinkSt(`https://hashscan.io/${network}/tx/${txHash}`);
			}
		}
	}

	async function retrieveStatus(){

		console.log("siamo qui stato ")
		if (contractAddress === undefined){
			setConfirmReceivedTextSt("there is no contract deployed");
		}else{
			const stato = await contractObject.state;

			if (stato === undefined) {
				console.log("errore nella ricerca dello stato");
			} else {
				setStatusText(`lo stato del contratto è ${stato} ✅`);
				
		}


	}
	}


	function MyForm() {
		function handleSubmit(e) {
	  	// Prevent the browser from reloading the page
	  	e.preventDefault();
	  	// Read the form data
	  	const form = e.target;
	  	const formData = new FormData(form);
	  	// Or you can work with it as a plain object:
	  	const formJson = Object.fromEntries(formData.entries());
	  	setPrice(formJson.price);
	  	console.log(formJson.price);
	}
   
  
		return (
	  		<form method="post" onSubmit={handleSubmit}>
			<label>
		  		Text input: <input name="price" defaultValue="10" />
			</label>
			<button type="reset">Reset </button>
			<button type="submit">Submit</button>
	  		</form>
		);
  }
  

	return (
		<div className="App">
			<h1 className="header">Let's buidl a counter dapp with MetaMask and Hedera!</h1>
			<MyGroup fcn={connectWallet} buttonLabel={"Connect Wallet"} text={connectTextSt} link={connectLinkSt} />
			
			<div>
				<MyForm />
				<MyGroup fcn={contractDeploy} buttonLabel={"Deploy Contract"} text={contractTextSt} link={contractLinkSt} />
			</div>
			
			<MyGroup fcn={contractExecute} buttonLabel={"Execute Contract (+1)"} text={executeTextSt} link={executeLinkSt} />

			<MyGroup fcn={abortExecute} buttonLabel={"Abort the smart contract"} text={abortTextSt} link={abortLinkSt} />

			<MyGroup fcn={confirmPurchaseEx} buttonLabel={"Pay the worker"} text={confirmPurchaseTextSt} link={confirmPurchaseLinkSt} />

			<MyGroup fcn={confirmReceivedEx} buttonLabel={"work received "} text={confirmReceivedTextSt} link={confirmReceivedLinkSt} />

			<MyGroup fcn={retrieveStatus} buttonLabel={"status"} text={statusText} />



			<div className="logo">
				<div className="symbol">
					<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
						<path d="M20 0a20 20 0 1 0 20 20A20 20 0 0 0 20 0" className="circle"></path>
						<path d="M28.13 28.65h-2.54v-5.4H14.41v5.4h-2.54V11.14h2.54v5.27h11.18v-5.27h2.54zm-13.6-7.42h11.18v-2.79H14.53z" className="h"></path>
					</svg>
				</div>
				<span>Hedera</span>
			</div>
		</div>
	);
}
export default App;
