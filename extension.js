export default {
  onload: ({ extensionAPI }) => {
    const config = {
      tabTitle: "Random Quotes",
      settings: [
        {
          id: "rq-local",
          name: "Local Quotes page title",
          description: "The title of a page in your graph with quotes",
          action: { type: "input", placeholder: "title here" },
        },
        {
          id: "tolkien-api",
          name: "The One API key",
          description: "API Key from The One API at https://the-one-api.dev/account",
          action: { type: "input", placeholder: "Add API key here" },
        },
        {
          id: "api-ninjas",
          name: "API-Ninjas key",
          description: "API Key from API Ninjas at https://api-ninjas.com/profile",
          action: { type: "input", placeholder: "Add API key here" },
        },
        {
          id: "api-ninjas-cat",
          name: "API-Ninjas category (optional)",
          description: "Quote category from the list at https://api-ninjas.com/api/quotes",
          action: { type: "select", items: ["None", "age", "alone", "amazing", "anger", "architecture", "art", "attitude", "beauty", "best", "birthday", "business", "car", "change", "communications", "computers", "cool", "courage", "dad", "dating", "death", "design", "dreams", "education", "environmental", "equality", "experience", "failure", "faith", "family", "famous", "fear", "fitness", "food", "forgiveness", "freedom", "friendship", "funny", "future", "god", "good", "government", "graduation", "great", "happiness", "health", "history", "home", "hope", "humor", "imagination", "inspirational", "intelligence", "jealousy", "knowledge", "leadership", "learning", "legal", "life", "love", "marriage", "medical", "men", "mom", "money", "morning", "movies", "success"] },
        },
      ]
    };
    extensionAPI.settings.panel.create(config);

    extensionAPI.ui.commandPalette.addCommand({
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
    extensionAPI.ui.commandPalette.addCommand({
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
    extensionAPI.ui.commandPalette.addCommand({
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
    extensionAPI.ui.commandPalette.addCommand({
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
    extensionAPI.ui.commandPalette.addCommand({
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
    extensionAPI.ui.commandPalette.addCommand({
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
    extensionAPI.ui.commandPalette.addCommand({
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
    extensionAPI.ui.commandPalette.addCommand({
      label: "Random Quote from Quotes on Design",
      callback: () => {
        const uid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
        if (uid == undefined) {
          alert("Please focus a block before importing a quote");
          return;
        } else {
          window.roamAlphaAPI.updateBlock(
            { block: { uid: uid, string: "Loading...".toString(), open: true } });
        }
        fetchQOD().then(string =>
          window.roamAlphaAPI.updateBlock({
            block: {
              uid: uid,
              string: string,
            }
          }))
      }
    });
    extensionAPI.ui.commandPalette.addCommand({
      label: "Random Quote from API Ninjas",
      callback: () => {
        const uid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
        if (uid == undefined) {
          alert("Please focus a block before importing a quote");
          return;
        } else {
          window.roamAlphaAPI.updateBlock(
            { block: { uid: uid, string: "Loading...".toString(), open: true } });
        }
        fetchAN(uid).then(string =>
          window.roamAlphaAPI.updateBlock({
            block: {
              uid: uid,
              string: string,
            }
          }))
      }
    });
    extensionAPI.ui.commandPalette.addCommand({
      label: "Random Quote from graph",
      callback: () => {
        const uid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
        if (uid == undefined) {
          alert("Please focus a block before importing a quote");
          return;
        } else {
          window.roamAlphaAPI.updateBlock(
            { block: { uid: uid, string: "Loading...".toString(), open: true } });
        }
        fetchRandomLocalQuote().then(string =>
          window.roamAlphaAPI.updateBlock({
            block: {
              uid: uid,
              string: string,
            }
          }))
      }
    });
    extensionAPI.ui.commandPalette.addCommand({
      label: "Random Quote from Futurama",
      callback: () => {
        const uid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
        if (uid == undefined) {
          alert("Please focus a block before importing a quote");
          return;
        } else {
          window.roamAlphaAPI.updateBlock(
            { block: { uid: uid, string: "Loading...".toString(), open: true } });
        }
        fetchFuturama(uid).then(string =>
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
      help: "Import a Random Tolkien Quote from The One API",
      handler: (context) => fetchTolkienQuote,
    };
    const args3 = {
      text: "SWANSONQUOTE",
      help: "Import a random Ron Swanson quote from ron-swanson-quotes.herokuapp.com",
      handler: (context) => fetchSwansonQuote,
    };
    const args4 = {
      text: "GOTQUOTE",
      help: "Import a Game of Thrones quote",
      handler: (context) => fetchGOTQuote,
    };
    const args5 = {
      text: "ANIMEQUOTE",
      help: "Import a quote from Animechan",
      handler: (context) => fetchAnimeQuote,
    };
    const args6 = {
      text: "DADJOKE",
      help: "Import a random Dad joke",
      handler: (context) => fetchDadJoke,
    };
    const args7 = {
      text: "QUOTESONDESIGN",
      help: "Import a random quote from Quotes on Design",
      handler: (context) => fetchQOD,
    };
    const args8 = {
      text: "NINJAQUOTE",
      help: "Import a random quote from API Ninjas",
      handler: (context) => () => {
        var uid = context.currentUid;
        return fetchAN(uid);
      },
    };
    const args9 = {
      text: "LOCALQUOTE",
      help: "Import a Random Quote from your graph",
      handler: (context) => fetchRandomLocalQuote,
    };
    const args10 = {
      text: "FUTURAMAQUOTE",
      help: "Import a Random Quote from Futurama",
      handler: (context) => fetchFuturama,
    };

    if (window.roamjs?.extension?.smartblocks) {
      window.roamjs.extension.smartblocks.registerCommand(args);
      window.roamjs.extension.smartblocks.registerCommand(args1);
      window.roamjs.extension.smartblocks.registerCommand(args2);
      window.roamjs.extension.smartblocks.registerCommand(args3);
      window.roamjs.extension.smartblocks.registerCommand(args4);
      window.roamjs.extension.smartblocks.registerCommand(args5);
      window.roamjs.extension.smartblocks.registerCommand(args6);
      window.roamjs.extension.smartblocks.registerCommand(args7);
      window.roamjs.extension.smartblocks.registerCommand(args8);
      window.roamjs.extension.smartblocks.registerCommand(args9);
      window.roamjs.extension.smartblocks.registerCommand(args10);
    } else {
      document.body.addEventListener(
        `roamjs:smartblocks:loaded`,
        () =>
          window.roamjs?.extension.smartblocks &&
          window.roamjs.extension.smartblocks.registerCommand(args) &&
          window.roamjs.extension.smartblocks.registerCommand(args1) &&
          window.roamjs.extension.smartblocks.registerCommand(args2) &&
          window.roamjs.extension.smartblocks.registerCommand(args3) &&
          window.roamjs.extension.smartblocks.registerCommand(args4) &&
          window.roamjs.extension.smartblocks.registerCommand(args5) &&
          window.roamjs.extension.smartblocks.registerCommand(args6) &&
          window.roamjs.extension.smartblocks.registerCommand(args7) &&
          window.roamjs.extension.smartblocks.registerCommand(args8) &&
          window.roamjs.extension.smartblocks.registerCommand(args9) &&
          window.roamjs.extension.smartblocks.registerCommand(args10)
      );
    }

    async function fetchRandomLocalQuote() {
      var key;
      var string = "";
      breakme: {
        if (!extensionAPI.settings.get("rq-local")) {
          key = "UID";
          sendConfigAlert(key);
          break breakme;
        } else {
          const parentTitle = extensionAPI.settings.get("rq-local");
          let children = await window.roamAlphaAPI.q(`[:find (pull ?page [:node/title :block/string :block/uid {:block/children ...} ]) :where [?page :node/title "${parentTitle}"] ]`);

          if (children.length > 0 && children?.[0]?.[0].hasOwnProperty("children")) {
            let upper = children[0][0].children.length - 1;
            let id = randomIntFromInterval(0, upper);
            string = "> ";
            string += children[0][0].children[id].string;
            if (children[0][0].children[id].hasOwnProperty("children")) {
              let author = children[0][0].children[id].children[0].string.toString();
              string += " \n\n[[";
              string += author;
              string += "]]";
            }
            return string;
          }
        };
      }
    }

    async function fetchTolkienQuote() {
      var key;
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

    async function fetchAN(uid) {
      var key, category;
      breakme: {
        if (!extensionAPI.settings.get("api-ninjas")) {
          key = "API";
          sendConfigAlert(key);
          break breakme;
        } else {
          const apiKey = extensionAPI.settings.get("api-ninjas");
          if (extensionAPI.settings.get("api-ninjas-cat")) {
            category = extensionAPI.settings.get("api-ninjas-cat")
          } else {
            category = "None";
          }

          var myHeaders = new Headers();
          myHeaders.append("X-Api-Key", apiKey);
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

          var url = "https://api.api-ninjas.com/v1/quotes";
          if (category != undefined && category != null && category != "None") {
            url += "?category=" + category + "";
          }

          const response = await fetch(url, requestOptions).catch((error) => {
            console.error("Failed to fetch data from API Ninja", error);
            window.roamAlphaAPI.updateBlock(
              { block: { uid: uid, string: "Call to API Ninja failed", open: true } });
          });
          if (response != undefined && response.ok) {
            const data = await response.json();
            var string = "> ";
            string += data[0].quote;
            string += " \n\n[[";
            string += data[0].author;
            string += "]]";
            return string;
          }
        }
      };
    }
  },
  onunload: () => {
    if (window.roamjs?.extension?.smartblocks) {
      window.roamjs.extension.smartblocks.unregisterCommand("RANDOMQUOTE");
      window.roamjs.extension.smartblocks.unregisterCommand("STOICQUOTE");
      window.roamjs.extension.smartblocks.unregisterCommand("TOLKIENQUOTE");
      window.roamjs.extension.smartblocks.unregisterCommand("SWANSONQUOTE");
      window.roamjs.extension.smartblocks.unregisterCommand("GOTQUOTE");
      window.roamjs.extension.smartblocks.unregisterCommand("ANIMEQUOTE");
      window.roamjs.extension.smartblocks.unregisterCommand("DADJOKE");
      window.roamjs.extension.smartblocks.unregisterCommand("QUOTESONDESIGN");
      window.roamjs.extension.smartblocks.unregisterCommand("NINJAQUOTE");
      window.roamjs.extension.smartblocks.unregisterCommand("LOCALQUOTE");
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

async function fetchQOD() {
  const response = await fetch("https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand");

  if (response.ok) {
    const data = await response.json();
    let quote = strip(data[5].content.rendered);
    let author = strip(data[5].title.rendered);
    let string = "> ";
    string += quote;
    string += " \n[[";
    string += author;
    string += "]]";
    return (string);
  } else {
    console.error(data);
  }
}

async function fetchFuturama() {
  const response = await fetch("https://futurama-api.fly.dev/api/quotes/1");
  var image1;
  if (response.ok) {
    const data = await response.json();
    let quote = data[0].quote;
    let author = data[0].character;
    let image = data[0].image;
    const regex = /(.+)((c_scale,)(w_[0-9]{2,3}))(.+)/g;
    if (image.includes("fetch")) {
      if (regex.test(image)) {
        const subst = `$1$3h_200$5`;
        image1 = image.replace(regex, subst);
      }
    } else {
      image1 = "https://res.cloudinary.com/dzxqhkyqd/image/fetch/c_scale,h_200/"+image;
    }

    let string = "> ";
    string += quote;
    string += "\n\n";
    string += "![](" + image1 + ")";
    string += "\n\n[[";
    string += author;
    string += "]]";
    return (string);
  } else {
    console.error(data);
  }
}

function sendConfigAlert(key) {
  if (key == "API") {
    alert("Please enter your API key in the configuration settings via the Roam Depot tab.");
  } else if (key == "UID") {
    alert("Please enter the title of your Quotes page in the configuration settings via the Roam Depot tab.");
  }
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function strip(html) {
  let doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}