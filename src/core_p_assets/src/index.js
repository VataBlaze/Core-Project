import { core_p } from "../../declarations/core_p";
import { Principal } from "@dfinity/principal";




// For beginners : This is really basic Javascript code that add an event to the "Mint" button so that the mint_nft function is called when the button is clicked.
const mint_button = document.getElementById("mint");
mint_button.addEventListener("click", mint_nft);

var walletConnected = false;

async function mint_nft() {

  if(!walletConnected){
    alert("Please connect your wallet first");
    return;
  };
  
  // Get the url of the image from the input field
  const name = document.getElementById("name").value.toString();
  console.log("The url we are trying to mint is " + name);

  // Get the principal from the input field.
  const principal_string = document.getElementById("principal").value.toString();
  const principal = Principal.fromText(principal_string);

  // Mint the image by calling the mint_principal function of the minter.
  const mintId = await core_p.mint_principal(name, principal);
  console.log("The id is " + Number(mintId));
  // Get the id of the minted image.

  // Show some information about the minted image.
  document.getElementById("greeting").innerText = "this nft owner is " + principal_string + "\nthis token id is " + Number(mintId);

  // Get the url by asking the minter contract.
  document.getElementById("nft_minted").src = await core_p.tokenURI(mintId);
};

// Connect to plug
const button = document.getElementById("connect");
button.addEventListener("click", onButtonPress);

let principal_string = "";

async function onButtonPress(el) {
  el.target.disabled = true;

  const isConnected = await window.ic.plug.isConnected();

  if(!isConnected) {
    await window.ic.plug.requestConnect();
  }

  console.log('requesting connection..');

  if (!window.ic.plug.agent) {
    await window.ic.plug.createAgent();
    console.log('agent created');
  }
  
  const prin = await window.ic.plug.agent.getPrincipal();
  var principalId = prin.toString();
  principal_string = prin;

  if (isConnected) {
    console.log('Plug wallet is connected');
    walletConnected = isConnected;
  } else {
    console.log('Plug wallet connection was refused')
  }

  setTimeout(function () {
    el.target.disabled = false;
  }, 1000);
  document.getElementById("final").innerText = "Your Principal-id: " +principal_string; // + balanceOf;
  document.getElementById('principal').value = principal_string; 

  const balanceOf = await core_p.balanceOf(principal_string);
  const name = await core_p.name();
  
  document.getElementById("balanceOf").innerText = "You are currenlty owning: " + balanceOf + " of " + name;// + balanceOf;
  const test = await core_p.galleryOf(principal_string);
  document.getElementById("galleryOf").innerText = "Your gallery: " + test;// + balanceOf;
}