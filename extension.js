export default {
  onload: ({ extensionAPI }) => {
    const config = {
      tabTitle: "Random Quotes",
      settings: [
        {
          id: "tolkien-api",
          name: "The One API key",
          description: "API Key from The One API at https://the-one-api.dev/account",
          action: { type: "input", placeholder: "Add API key here" },
        },
      ]
    };
    extensionAPI.settings.panel.create(config);

    window.roamAlphaAPI.ui.commandPalette.addCommand({
      label: "Random Quote",
      callback: () => {
        const uid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
        if (uid == undefined) {
          alert("Please focus a block before importing a quote");
          return;
        } else {
          window.roamAlphaAPI.updateBlock(
            { block: { uid: uid, string: "Loading...".toString(), open: true } });
        }
        fetchRandomQuote().then(string =>
          window.roamAlphaAPI.updateBlock({
            block: {
              uid: uid,
              string: string,
            }
          }))
      }
    });
    window.roamAlphaAPI.ui.commandPalette.addCommand({
      label: "Stoic Quote",
      callback: () => {
        const uid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
        if (uid == undefined) {
          alert("Please focus a block before importing a quote");
          return;
        } else {
          window.roamAlphaAPI.updateBlock(
            { block: { uid: uid, string: "Loading...".toString(), open: true } });
        }
        fetchStoicQuote().then(string =>
          window.roamAlphaAPI.updateBlock({
            block: {
              uid: uid,
              string: string,
            }
          }))
      }
    });
    window.roamAlphaAPI.ui.commandPalette.addCommand({
      label: "Tolkien Quote",
      callback: () => {
        const uid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
        if (uid == undefined) {
          alert("Please focus a block before importing a quote");
          return;
        } else {
          window.roamAlphaAPI.updateBlock(
            { block: { uid: uid, string: "Loading...".toString(), open: true } });
        }
        fetchTolkienQuote().then(string =>
          window.roamAlphaAPI.updateBlock({
            block: {
              uid: uid,
              string: string,
            }
          }))
      }
    });
    window.roamAlphaAPI.ui.commandPalette.addCommand({
      label: "Ron Swanson Quote",
      callback: () => {
        const uid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
        if (uid == undefined) {
          alert("Please focus a block before importing a quote");
          return;
        } else {
          window.roamAlphaAPI.updateBlock(
            { block: { uid: uid, string: "Loading...".toString(), open: true } });
        }
        fetchSwansonQuote().then(string =>
          window.roamAlphaAPI.updateBlock({
            block: {
              uid: uid,
              string: string,
            }
          }))
      }
    });
    window.roamAlphaAPI.ui.commandPalette.addCommand({
      label: "Game of Thrones Quote",
      callback: () => {
        const uid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
        if (uid == undefined) {
          alert("Please focus a block before importing a quote");
          return;
        } else {
          window.roamAlphaAPI.updateBlock(
            { block: { uid: uid, string: "Loading...".toString(), open: true } });
        }
        fetchGOTQuote().then(string =>
          window.roamAlphaAPI.updateBlock({
            block: {
              uid: uid,
              string: string,
            }
          }))
      }
    });
    window.roamAlphaAPI.ui.commandPalette.addCommand({
      label: "Animechan Quote",
      callback: () => {
        const uid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
        if (uid == undefined) {
          alert("Please focus a block before importing a quote");
          return;
        } else {
          window.roamAlphaAPI.updateBlock(
            { block: { uid: uid, string: "Loading...".toString(), open: true } });
        }
        fetchAnimeQuote().then(string =>
          window.roamAlphaAPI.updateBlock({
            block: {
              uid: uid,
              string: string,
            }
          }))
      }
    });
    window.roamAlphaAPI.ui.commandPalette.addCommand({
      label: "Random Dad Joke",
      callback: () => {
        const uid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
        if (uid == undefined) {
          alert("Please focus a block before importing a quote");
          return;
        } else {
          window.roamAlphaAPI.updateBlock(
            { block: { uid: uid, string: "Loading...".toString(), open: true } });
        }
        fetchDadJoke().then(string =>
          window.roamAlphaAPI.updateBlock({
            block: {
              uid: uid,
              string: string,
            }
          }))
      }
    });

    const args = {
      text: "RANDOMQUOTE",
      help: "Import a Random Quote from Quotable.io",
      handler: (context) => fetchRandomQuote,
    };
    
    const args1 = {
      text: "STOICQUOTE",
      help: "Import a Random Stoic Quote from stoic-quotes.com",
      handler: (context) => fetchStoicQuote,
    };
    
    const args2 = {
      text: "TOLKIENQUOTE",
      help: "Import a Random Quote from lotr-random-quote-api.herokuapp.com",
      handler: (context) => fetchTolkienQuote,
    };
    
    const args3 = {
      text: "SWANSONQUOTE",
      help: "Import a random Ron Swanson quote from ron-swanson-quotes.herokuapp.com",
      handler: (context) => fetchSwansonQuote,
    };
    
    const args5 = {
      text: "GOTQUOTE",
      help: "Import a Game of Thrones quote",
      handler: (context) => fetchGOTQuote,
    };
    
    const args6 = {
      text: "ANIMEQUOTE",
      help: "Import a quote from Animechan",
      handler: (context) => fetchAnimeQuote,
    };
    
    const args7 = {
      text: "DADJOKE",
      help: "Import a random Dad joke",
      handler: (context) => fetchDadJoke,
    };
    if (window.roamjs?.extension?.smartblocks) {
      window.roamjs.extension.smartblocks.registerCommand(args);
      window.roamjs.extension.smartblocks.registerCommand(args1);
      window.roamjs.extension.smartblocks.registerCommand(args2);
      window.roamjs.extension.smartblocks.registerCommand(args3);
      window.roamjs.extension.smartblocks.registerCommand(args5);
      window.roamjs.extension.smartblocks.registerCommand(args6);
      window.roamjs.extension.smartblocks.registerCommand(args7);
    } else {
      document.body.addEventListener(
        `roamjs:smartblocks:loaded`,
        () =>
          window.roamjs?.extension.smartblocks &&
          window.roamjs.extension.smartblocks.registerCommand(args) &&
          window.roamjs.extension.smartblocks.registerCommand(args1) &&
          window.roamjs.extension.smartblocks.registerCommand(args2) &&
          window.roamjs.extension.smartblocks.registerCommand(args3) &&
          window.roamjs.extension.smartblocks.registerCommand(args5) &&
          window.roamjs.extension.smartblocks.registerCommand(args6) &&
          window.roamjs.extension.smartblocks.registerCommand(args7)
      );
    }

    async function fetchTolkienQuote() {
      var key, numberProducts;
      breakme: {
        if (!extensionAPI.settings.get("tolkien-api")) {
          key = "API";
          sendConfigAlert(key);
          break breakme;
        } else {
          const apiKey = extensionAPI.settings.get("tolkien-api");

          let random = randomIntFromInterval(1, 2384);
          var myHeaders = new Headers();
          var bearer = 'Bearer ' + apiKey;
          myHeaders.append("Authorization", bearer);
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
          var string, name, film;
          const response = await fetch("https://the-one-api.dev/v2/quote?offset=" + random + "&limit=1", requestOptions);
          if (response.ok) {
            const data = await response.json();
            string = "> ";
            string += data.docs[0].dialog;

            const response1 = await fetch("https://the-one-api.dev/v2/character/" + data.docs[0].character, requestOptions)
            if (response1.ok) {
              const data1 = await response1.json();
              name = data1.docs[0].name;
            }
            const response2 = await fetch("https://the-one-api.dev/v2/movie/" + data.docs[0].movie, requestOptions)
            if (response2.ok) {
              const data2 = await response2.json();
              film = data2.docs[0].name;
            }

            if (name != undefined) {
              string += " \n\n[[";
              string += name;
              string += "]]";
            }
            if (film != undefined) {
              string += " in [[";
              string += film;
            }
            string += "]]";

            return string;
          } else {
            console.error(data);
            alert("Failed to fetch data from The One API");
            return;
          }
        }
      };
    }
  },
  onunload: () => {
    window.roamAlphaAPI.ui.commandPalette.removeCommand({
      label: 'Random Quote'
    });
    window.roamAlphaAPI.ui.commandPalette.removeCommand({
      label: 'Stoic Quote'
    });
    window.roamAlphaAPI.ui.commandPalette.removeCommand({
      label: 'Tolkien Quote'
    });
    window.roamAlphaAPI.ui.commandPalette.removeCommand({
      label: 'Ron Swanson Quote'
    });
    window.roamAlphaAPI.ui.commandPalette.removeCommand({
      label: 'Game of Thrones Quote'
    });
    window.roamAlphaAPI.ui.commandPalette.removeCommand({
      label: 'Animechan Quote'
    });
    window.roamAlphaAPI.ui.commandPalette.removeCommand({
      label: 'Random Dad Joke'
    });
    if (window.roamjs?.extension?.smartblocks) {
      window.roamjs.extension.smartblocks.unregisterCommand("RANDOMQUOTE");
      window.roamjs.extension.smartblocks.unregisterCommand("STOICQUOTE");
      window.roamjs.extension.smartblocks.unregisterCommand("TOLKIENQUOTE");
      window.roamjs.extension.smartblocks.unregisterCommand("SWANSONQUOTE");
      window.roamjs.extension.smartblocks.unregisterCommand("GOTQUOTE");
      window.roamjs.extension.smartblocks.unregisterCommand("ANIMEQUOTE");
      window.roamjs.extension.smartblocks.unregisterCommand("DADJOKE");
    }
  }
}

async function fetchRandomQuote() {
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  if (response.ok) {
    let string = "> ";
    string += data.content;
    string += " \n\n[[";
    string += data.author;
    string += "]]";
    return (string);
  } else {
    console.error(data);
  }
};

async function fetchStoicQuote() {
  const response = await fetch("https://stoic-quotes.com/api/quote");
  const data = await response.json();
  if (response.ok) {
    let string = "> ";
    string += data.text;
    string += " \n\n[[";
    string += data.author;
    string += "]]";
    return (string);
  } else {
    console.error(data);
  }
};

async function fetchSwansonQuote() {
  const response = await fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes");
  const data = await response.json();
  if (response.ok) {
    let string = "> ";
    string += data[0];
    string += " \n\n[[Ron Swanson]]";
    return (string);
  } else {
    console.error(data);
  }
};

async function fetchGOTQuote() {
  const response = await fetch("https://api.gameofthronesquotes.xyz/v1/random");
  const data = await response.json();
  if (response.ok) {
    let string = "> ";
    string += data.sentence;
    string += " \n\n[[";
    string += data.character.name;
    string += "]]";
    return (string);
  } else {
    console.error(data);
  }
}

async function fetchAnimeQuote() {
  const response = await fetch("https://animechan.vercel.app/api/random");
  const data = await response.json();
  if (response.ok) {
    let string = "> ";
    string += data.quote;
    string += " \n\n[[";
    string += data.character;
    string += "]] in [[";
    string += data.anime;
    string += "]]";
    return (string);
  } else {
    console.error(data);
  }
}

async function fetchDadJoke() {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch("https://icanhazdadjoke.com/", requestOptions);
  const data = await response.json();
  if (response.ok) {
    let string = "> ";
    string += data.joke;
    return (string);
  } else {
    console.error(data);
  }
}

function sendConfigAlert(key) {
  if (key == "API") {
    alert("Please enter your API key in the configuration settings via the Roam Depot tab.");
  }
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}