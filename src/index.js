const movieQuote = require("popular-movie-quotes");
const { getRandom } = require("@divyanshu013/inspirational-quotes");
import iziToast from "izitoast";

let smartblockCommandTexts = [];
let quotesDbCache = null;

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
          id: "rq-localTag",
          name: "Local Quotes tag",
          description: "Retrieve quotes from blocks with this tag",
          action: { type: "input", placeholder: "tag here" },
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
          description:
            "API Key from API Ninjas at https://api-ninjas.com/profile; used for API-Ninjas quotes and Shakespeare quotes",
          action: { type: "input", placeholder: "Add API key here" },
        },
        {
          id: "api-ninjas-cat",
          name: "API-Ninjas category (optional)",
          description: "Quote category from the list at https://api-ninjas.com/api/randomquotes",
          action: {
            type: "select",
            items: [
              "None",
              "wisdom",
              "philosophy",
              "life",
              "truth",
              "inspirational",
              "relationships",
              "love",
              "faith",
              "humor",
              "success",
              "courage",
              "happiness",
              "art",
              "writing",
              "fear",
              "nature",
              "time",
              "freedom",
              "death",
              "leadership",
            ],
          },
        },
      ],
    };
    extensionAPI.settings.panel.create(config);

    const runPaletteCommand = (fetcher) => {
      const uid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
      if (!uid) {
        showToast("warning", "Please focus a block before importing a quote");
        return;
      }

      window.roamAlphaAPI.updateBlock({ block: { uid, string: "Loading...", open: true } });

      // If fetcher expects a uid, pass it; otherwise call with no args (meta providers, etc.)
      const p = fetcher.length > 0 ? fetcher(uid) : fetcher();

      Promise.resolve(p)
        .then((string) =>
          window.roamAlphaAPI.updateBlock({ block: { uid, string: string || "No result." } })
        )
        .catch((e) => {
          console.error(e);
          window.roamAlphaAPI.updateBlock({ block: { uid, string: "Failed to fetch quote." } });
        });

      document.querySelector("body")?.click();
    };

    const commands = [
      {
        paletteLabel: "Surprise Me (Quote)",
        fetcher: fetchSurpriseQuote,
        text: "SURPRISEQUOTE",
        help: "Import a random quote from multiple providers (with fallback).",
        kind: "meta",
      },
      {
        paletteLabel: "Surprise Me (Joke)",
        fetcher: fetchSurpriseJoke,
        text: "SURPRISEJOKE",
        help: "Import a random joke from multiple providers (with fallback).",
        kind: "meta",
      },
      {
        paletteLabel: "Random Quote",
        fetcher: fetchRandomQuote,
        text: "RANDOMQUOTE",
        help: "Import a Random Quote from Quotable.io",
        kind: "quote",
      },
      {
        paletteLabel: "Stoic Quote",
        fetcher: fetchStoicQuote,
        text: "STOICQUOTE",
        help: "Import a Random Stoic Quote from stoic-quotes.com",
        kind: "quote",
      },
      {
        paletteLabel: "Tolkien Quote",
        fetcher: fetchTolkienQuote,
        text: "TOLKIENQUOTE",
        help: "Import a Random Tolkien Quote from The One API",
        kind: "quote",
        surprise: false,
      },
      {
        paletteLabel: "Ron Swanson Quote",
        fetcher: fetchSwansonQuote,
        text: "SWANSONQUOTE",
        help: "Import a random Ron Swanson quote from ron-swanson-quotes.herokuapp.com",
        kind: "quote",
        surprise: false,
      },
      {
        paletteLabel: "Game of Thrones Quote",
        fetcher: fetchGOTQuote,
        text: "GOTQUOTE",
        help: "Import a Game of Thrones quote",
        kind: "quote",
        surprise: false,
      },
      {
        paletteLabel: "Random Dad Joke",
        fetcher: fetchDadJoke,
        text: "DADJOKE",
        help: "Import a random Dad joke",
        kind: "joke",
      },
      {
        paletteLabel: "Random Quote from API Ninjas",
        fetcher: fetchAN,
        text: "NINJAQUOTE",
        help: "Import a random quote from API Ninjas",
        kind: "quote",
        smartblockHandler: (context) => () => fetchAN(context.currentUid),
      },
      {
        paletteLabel: "Random Quote from graph",
        fetcher: fetchRandomLocalQuote,
        text: "LOCALQUOTE",
        help: "Import a Random Quote from your graph",
        kind: "quote",
      },
      {
        paletteLabel: "Random Quote from graph by Tag",
        fetcher: fetchRandomLocalQuoteTag,
        text: "LOCALQUOTETAG",
        help: "Import a Random Quote from your graph by Tag",
        kind: "quote",
      },
      {
        paletteLabel: "Random Quote from Monty Python's Flying Circus",
        fetcher: fetchMPFC,
        text: "PYTHONQUOTE",
        help: "Import a Random Quote from Monty Python's Flying Circus",
        kind: "quote",
        surprise: false,
      },
      {
        paletteLabel: "Random Joke from JokeAPI",
        fetcher: fetchJokeAPI,
        text: "JOKEAPI",
        help: "Import a Random Joke from JokeAPI",
        kind: "joke",
      },
      {
        paletteLabel: "Random Movie Quote",
        fetcher: fetchMovieQuote,
        text: "MOVIEQUOTE",
        help: "Import a Random Movie Quote",
        kind: "quote",
        surprise: false,
      },
      {
        paletteLabel: "Random Inspirational Quote",
        fetcher: fetchInspQuote,
        text: "INSPQUOTE",
        help: "Import a Random Inspirational Quote",
        kind: "quote",
      },
      {
        paletteLabel: "Random Shakespeare Quote",
        fetcher: fetchShakespeareQuote,
        text: "SHAKESPEAREQUOTE",
        help: "Import a Random Shakespeare Quote",
        kind: "quote",
        surprise: false,
      },
      {
        paletteLabel: "ZenQuotes Daily Inspiration",
        fetcher: fetchZQDaily,
        text: "ZENDAILY",
        help: "Import ZenQuotes daily inspiration",
        kind: "quote",
        surprise: false,
      },
      {
        paletteLabel: "ZenQuotes Random Quote",
        fetcher: fetchZQRandom,
        text: "ZENRANDOM",
        help: "Import a random ZenQuotes quote",
        kind: "quote",
      },
      {
        paletteLabel: "Random Quote (Quotes Dataset)",
        fetcher: fetchQuotesDbQuote,
        text: "QUOTESDATASET",
        help: "Import a random quote from a 5000+ quote JSON dataset",
        kind: "quote",
      },
      {
        paletteLabel: "Random Joke from Official Joke API",
        fetcher: fetchOfficialJoke,
        text: "OFFICIALJOKE",
        help: "Import a random joke from the Official Joke API",
        kind: "joke",
      },
      {
        paletteLabel: "Random Joke (API Ninjas)",
        fetcher: fetchNinjasJoke,
        text: "NINJAJOKE",
        help: "Import a random joke from API Ninjas",
        kind: "joke",
      },
      {
        paletteLabel: "Programming Joke (API Ninjas)",
        fetcher: fetchProgrammingJoke,
        text: "PROGRAMMINGJOKE",
        help: "Import a random programming joke from API Ninjas",
        kind: "joke",
      },
    ];

    commands.forEach((command) => {
      extensionAPI.ui.commandPalette.addCommand({
        label: command.paletteLabel,
        callback: () => runPaletteCommand(command.fetcher),
      });
    });

    const smartblockCommands = commands
      .filter((c) => c.text && c.help)
      .map((c) => ({
        text: c.text,
        help: c.help,
        handler: c.smartblockHandler || ((context) => () => c.fetcher()),
      }));

    smartblockCommandTexts = smartblockCommands.map((command) => command.text);

    const registerSmartblockCommands = () => {
      if (!window.roamjs?.extension?.smartblocks) return;
      smartblockCommands.forEach((command) =>
        window.roamjs.extension.smartblocks.registerCommand(command)
      );
    };

    if (window.roamjs?.extension?.smartblocks) {
      registerSmartblockCommands();
    } else {
      document.body.addEventListener(`roamjs:smartblocks:loaded`, registerSmartblockCommands);
    }

    // providers that require extensionAPI

    async function fetchSurpriseQuote() {
      const MAX_ATTEMPTS = 5;

      const quoteProviders = commands.filter((c) => {
        if (c.fetcher === fetchSurpriseQuote) return false;
        if (c.kind !== "quote") return false;
        if (c.surprise === false) return false;
        // Exclude fetchers that require args (e.g., uid) for meta/random aggregation
        if (typeof c.fetcher !== "function" || c.fetcher.length > 0) return false;
        return true;
      });

      if (!quoteProviders.length) {
        return "No quote providers are configured.";
      }

      // Shuffle in place
      for (let i = quoteProviders.length - 1; i > 0; i -= 1) {
        const j = randomIntFromInterval(0, i);
        [quoteProviders[i], quoteProviders[j]] = [quoteProviders[j], quoteProviders[i]];
      }

      const attempts = quoteProviders.slice(0, Math.min(MAX_ATTEMPTS, quoteProviders.length));

      for (const provider of attempts) {
        try {
          const result = await provider.fetcher();

          if (typeof result === "string") {
            const s = result.trimStart();

            // Heuristic: valid quote output is usually a blockquote line
            if (s.startsWith(">") && s.length > 5) {
              console.debug("Surprise quote provider success:", provider.paletteLabel);
              return result;
            }

            if (s && !s.toLowerCase().includes("returned an unexpected response")) {
              console.warn(
                "Surprise quote provider returned non-quote string:",
                provider.paletteLabel,
                result
              );
            }
          } else if (result) {
            console.warn(
              "Surprise quote provider returned non-string result:",
              provider.paletteLabel,
              result
            );
          }
        } catch (error) {
          console.error("Surprise quote provider failed:", provider.paletteLabel, error);
        }
      }

      return "No quote providers returned a result.";
    }

    async function fetchSurpriseJoke() {
      const MAX_ATTEMPTS = 5;

      const jokeProviders = commands.filter((c) => {
        if (c.fetcher === fetchSurpriseJoke) return false;
        if (c.kind !== "joke") return false;
        if (c.surprise === false) return false;
        // Exclude fetchers that require args (e.g., uid) for meta/random aggregation
        if (typeof c.fetcher !== "function" || c.fetcher.length > 0) return false;
        return true;
      });

      if (!jokeProviders.length) {
        return "No joke providers are configured.";
      }

      // Shuffle in place
      for (let i = jokeProviders.length - 1; i > 0; i -= 1) {
        const j = randomIntFromInterval(0, i);
        [jokeProviders[i], jokeProviders[j]] = [jokeProviders[j], jokeProviders[i]];
      }

      const attempts = jokeProviders.slice(0, Math.min(MAX_ATTEMPTS, jokeProviders.length));

      for (const provider of attempts) {
        try {
          const result = await provider.fetcher();

          if (typeof result === "string") {
            const s = result.trimStart();

            // Heuristic: valid joke output is usually a blockquote line
            if (s.startsWith(">") && s.length > 5) {
              console.debug("Surprise joke provider success:", provider.paletteLabel);
              return result;
            }

            if (s && !s.toLowerCase().includes("returned an unexpected response")) {
              console.warn(
                "Surprise joke provider returned non-joke string:",
                provider.paletteLabel,
                result
              );
            }
          } else if (result) {
            console.warn(
              "Surprise joke provider returned non-string result:",
              provider.paletteLabel,
              result
            );
          }
        } catch (error) {
          console.error("Surprise joke provider failed:", provider.paletteLabel, error);
        }
      }

      return "No joke providers returned a result.";
    }

    async function fetchRandomLocalQuote() {
      if (!extensionAPI.settings.get("rq-local")) {
        sendConfigAlert("UID");
        return "Missing Local Quotes page title (set it in Roam Depot settings).";
      }

      const parentTitle = extensionAPI.settings.get("rq-local");

      const results = await window.roamAlphaAPI.q(
        `[:find (pull ?page [:node/title :block/string :block/uid {:block/children ...}])
          :where
          [?page :node/title "${parentTitle}"]]`
      );

      const page = results?.[0]?.[0];
      const children = page?.children;

      if (!Array.isArray(children) || children.length === 0) {
        return "No quotes found.";
      }

      const id = randomIntFromInterval(0, children.length - 1);
      const quoteBlock = children[id];

      let string = `> ${quoteBlock?.string || ""}`;

      if (quoteBlock?.children?.[0]?.string) {
        string += `\n\n${formatAuthor(quoteBlock.children[0].string)}`;
      }

      return string;
    }

    async function fetchRandomLocalQuoteTag() {
      if (!extensionAPI.settings.get("rq-localTag")) {
        sendConfigAlert("UID");
        return "Missing Local Quotes tag (set it in Roam Depot settings).";
      }

      const tagInput = extensionAPI.settings.get("rq-localTag").trim();
      const tag = tagInput.replace(/^#/, "").replace(/^\[\[(.*)\]\]$/, "$1").trim();

      if (!tag) {
        showToast("warning", "Please enter a tag in the configuration settings via the Roam Depot tab.");
        return "No tag configured.";
      }

      const results = await window.roamAlphaAPI.q(
        `[:find (pull ?block [:block/string :block/uid {:block/children ...}])
          :where
          [?block :block/refs ?tag]
          [?tag :node/title "${tag}"]]`
      );

      if (results.length > 0 && results?.[0]?.[0]) {
        const upper = results.length - 1;
        const id = randomIntFromInterval(0, upper);
        const block = results[id][0];

        const cleanedQuote = (block?.string || "").replace(/^\s*>\s*/, "");
        let string = `> ${cleanedQuote}`;

        if (block?.children?.[0]?.string) {
          string += `\n\n${formatAuthor(block.children[0].string)}`;
        }

        return string;
      }

      showToast("warning", `No quotes found with tag #${tag}.`);
      return `No quotes found with tag #${tag}.`;
    }

    async function fetchTolkienQuote() {
      if (!extensionAPI.settings.get("tolkien-api")) {
        sendConfigAlert("API");
        return "Missing The One API key (set it in Roam Depot settings).";
      }

      const apiKey = extensionAPI.settings.get("tolkien-api");
      const random = randomIntFromInterval(1, 2384);

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${apiKey}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        let name, film;

        const response = await fetch(
          `https://the-one-api.dev/v2/quote?offset=${random}&limit=1`,
          requestOptions
        );

        if (!response.ok) {
          console.error(response);
          showToast("error", "Failed to fetch data from The One API");
          return "Failed to fetch quote.";
        }

        const data = await response.json();
        const dialog = data?.docs?.[0]?.dialog;

        if (!dialog) return "Failed to fetch quote.";

        let string = `> ${dialog}`;

        const characterId = data?.docs?.[0]?.character;
        if (characterId) {
          const response1 = await fetch(
            `https://the-one-api.dev/v2/character/${characterId}`,
            requestOptions
          );
          if (response1.ok) {
            const data1 = await response1.json();
            name = data1?.docs?.[0]?.name;
          }
        }

        const movieId = data?.docs?.[0]?.movie;
        if (movieId) {
          const response2 = await fetch(`https://the-one-api.dev/v2/movie/${movieId}`, requestOptions);
          if (response2.ok) {
            const data2 = await response2.json();
            film = data2?.docs?.[0]?.name;
          }
        }

        if (name) string += `\n\n${formatAuthor(name)}`;
        if (film) string += ` in ${formatAuthor(film)}`;

        return string;
      } catch (e) {
        console.error("Tolkien fetch error:", e);
        return "Failed to fetch quote.";
      }
    }

    async function fetchAN(uid) {
      if (!extensionAPI.settings.get("api-ninjas")) {
        sendConfigAlert("API");
        return "Missing API Ninjas key (set it in Roam Depot settings).";
      }

      const apiKey = extensionAPI.settings.get("api-ninjas");
      const category = extensionAPI.settings.get("api-ninjas-cat") || "None";

      const myHeaders = new Headers();
      myHeaders.append("X-Api-Key", apiKey);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      let url = "https://api.api-ninjas.com/v2/randomquotes";
      if (category && category !== "None") {
        url += `?category=${encodeURIComponent(category)}`;
      }

      try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          let body = "";
          try {
            body = await response.text();
          } catch { }
          console.error("API Ninjas response not OK:", response.status, body);
          return `API Ninjas request failed (${response.status}).`;
        }

        const data = await response.json();

        if (!Array.isArray(data) || !data[0]?.quote) {
          console.error("Unexpected API Ninjas payload:", data);
          return "API Ninjas returned an unexpected response.";
        }

        const quote = data[0].quote;
        const author = data[0].author || "Unknown";

        return `> ${quote}\n\n${formatAuthor(author)}`;
      } catch (error) {
        console.error("Failed to fetch data from API Ninjas", error);
        return "Call to API Ninjas failed (network error).";
      }
    }

    async function fetchShakespeareQuote() {
      if (!extensionAPI.settings.get("api-ninjas")) {
        sendConfigAlert("API");
        return "Missing API Ninjas key (set it in Roam Depot settings).";
      }

      const apiKey = extensionAPI.settings.get("api-ninjas");
      const myHeaders = new Headers();
      myHeaders.append("X-Api-Key", apiKey);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "https://api.api-ninjas.com/v2/randomquotes?author=Shakespeare",
          requestOptions
        );

        if (!response.ok) {
          let body = "";
          try {
            body = await response.text();
          } catch { }
          console.error("Shakespeare API Ninjas not OK:", response.status, body);
          return `API Ninjas request failed (${response.status}).`;
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          showToast("warning", "No Shakespeare quotes returned from API Ninjas.");
          return "Failed to fetch quote.";
        }

        const quote = data[0]?.quote;
        const author = data[0]?.author;
        const work = data[0]?.work;

        if (!quote) return "Failed to fetch quote.";

        let string = `> ${quote}`;
        if (author) string += `\n\n${formatAuthor(author)}`;
        if (work) string += ` in ${formatAuthor(work)}`;

        return string;
      } catch (e) {
        console.error("Shakespeare fetch error:", e);
        return "Failed to fetch quote.";
      }
    }

    async function fetchNinjasJoke() {
      if (!extensionAPI.settings.get("api-ninjas")) {
        sendConfigAlert("API");
        return "Missing API Ninjas key (set it in Roam Depot settings).";
      }

      const apiKey = extensionAPI.settings.get("api-ninjas");
      const myHeaders = new Headers();
      myHeaders.append("X-Api-Key", apiKey);

      const url = "https://api.api-ninjas.com/v1/jokes";

      try {
        const response = await fetch(url, { method: "GET", headers: myHeaders, redirect: "follow" });
        if (!response.ok) {
          const body = await response.text().catch(() => "");
          console.error("API Ninjas jokes not OK:", response.status, body);
          return `API Ninjas jokes failed (${response.status}).`;
        }

        const data = await response.json();
        const joke = Array.isArray(data) ? (data[0]?.joke || "").trim() : "";
        if (!joke) return "API Ninjas jokes returned an unexpected response.";

        return `> ${joke}`;
      } catch (e) {
        console.error("API Ninjas jokes fetch error:", e);
        return "API Ninjas jokes request failed.";
      }
    }
  },

  onunload: () => {
    if (window.roamjs?.extension?.smartblocks) {
      smartblockCommandTexts.forEach((text) =>
        window.roamjs.extension.smartblocks.unregisterCommand(text)
      );
    }
  },
};

// -------------------- Providers (non-UI) --------------------

async function fetchRandomQuote() {
  const response = await fetch(
    "https://florinbobis-quotes-net.hf.space/quotes/random?dataset=quotable" // original quotable api is down
  );

  if (!response.ok) {
    let body = "";
    try {
      body = await response.text();
    } catch { }
    console.error("RandomQuote not OK:", response.status, body);
    return `Failed to fetch quote (${response.status}).`;
  }

  const data = await response.json();

  const quote = data?.quoteText;
  const author = data?.author;

  if (!quote) return "Failed to fetch quote.";

  return `> ${quote}\n\n${formatAuthor(author)}`;
}

async function fetchStoicQuote() {
  const response = await fetch("https://stoic-quotes.com/api/quote");

  if (!response.ok) {
    let body = "";
    try {
      body = await response.text();
    } catch { }
    console.error("StoicQuote not OK:", response.status, body);
    return `Failed to fetch quote (${response.status}).`;
  }

  const data = await response.json();

  const quote = data?.text;
  const author = data?.author;

  if (!quote) return "Failed to fetch quote.";

  return `> ${quote}\n\n${formatAuthor(author)}`;
}

async function fetchSwansonQuote() {
  const response = await fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes");

  if (!response.ok) {
    let body = "";
    try {
      body = await response.text();
    } catch { }
    console.error("SwansonQuote not OK:", response.status, body);
    return `Failed to fetch quote (${response.status}).`;
  }

  const data = await response.json();
  const quote = Array.isArray(data) ? data[0] : null;

  if (!quote) return "Failed to fetch quote.";

  return `> ${quote}\n\n${formatAuthor("Ron Swanson")}`;
}

async function fetchGOTQuote() {
  const response = await fetch("https://api.gameofthronesquotes.xyz/v1/random");

  if (!response.ok) {
    let body = "";
    try {
      body = await response.text();
    } catch { }
    console.error("GOTQuote not OK:", response.status, body);
    return `Failed to fetch quote (${response.status}).`;
  }

  const data = await response.json();
  const quote = data?.sentence;
  const author = data?.character?.name;

  if (!quote) return "Failed to fetch quote.";

  return `> ${quote}\n\n${formatAuthor(author)}`;
}

async function fetchDadJoke() {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const response = await fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  });

  if (!response.ok) {
    let body = "";
    try {
      body = await response.text();
    } catch { }
    console.error("DadJoke not OK:", response.status, body);
    return `Failed to fetch joke (${response.status}).`;
  }

  const data = await response.json();
  const joke = data?.joke;

  if (!joke) return "Failed to fetch joke.";

  return `> ${joke}`;
}

async function fetchMPFC() {
  const response = await fetch("https://monty-pythons-flying-api.fly.dev/v1/quotes/random");

  if (!response.ok) {
    let body = "";
    try {
      body = await response.text();
    } catch { }
    console.error("MPFC not OK:", response.status, body);
    return `Failed to fetch quote (${response.status}).`;
  }

  const data = await response.json();

  const quote = data?.quote;
  const character = data?.character;
  const actor = data?.actor;
  const episode = data?.episode;
  const sketch = data?.sketch;

  if (!quote) return "Failed to fetch quote.";

  let string = `> ${quote}\n\n${formatAuthor(character)}`;

  if (actor != null) {
    string += ` (${formatAuthor(actor)})`;
  }

  if (sketch != null || episode != null) {
    string += " in";
    if (sketch != null) {
      string += ` ${formatAuthor(sketch)}`;
    }
    if (episode != null) {
      string += ` (Ep. ${episode})`;
    }
  }

  return string;
}

async function fetchJokeAPI() {
  const response = await fetch(
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&safe-mode"
  );

  if (!response.ok) {
    let body = "";
    try {
      body = await response.text();
    } catch { }
    console.error("JokeAPI not OK:", response.status, body);
    return `Failed to fetch joke (${response.status}).`;
  }

  const data = await response.json();

  let string = "> ";

  if (data?.type === "twopart") {
    const setup = data?.setup || "";
    const delivery = data?.delivery || "";
    string += setup;
    string += "\n\n";
    string += delivery;
  } else {
    const joke = strip(data?.joke || "");
    string += joke;
  }

  return string.trimEnd();
}

async function fetchMovieQuote() {
  const data = movieQuote.getSomeRandom(1);
  const item = Array.isArray(data) ? data[0] : null;

  if (!item?.quote) return "Failed to fetch quote.";

  let string = `> ${item.quote}\n\n${formatAuthor(item.movie)}`;
  if (item.year) string += ` (${item.year})`;
  return string;
}

async function fetchInspQuote() {
  const data = getRandom();

  if (!data?.quote) return "Failed to fetch quote.";

  let string = `> ${data.quote}\n\n${formatAuthor(data.author)}`;
  if (Object.prototype.hasOwnProperty.call(data, "source") && data.source) {
    string += ` (${data.source})`;
  }
  return string;
}

async function fetchZQDaily() {
  const url = "https://zenquotes.io/api/today";

  try {
    const proxyBase = roamAlphaAPI?.constants?.corsAnywhereProxyUrl;
    if (!proxyBase) {
      console.error("Missing roamAlphaAPI.constants.corsAnywhereProxyUrl");
      return "Roam CORS proxy is not available.";
    }

    const response = await fetch(`${proxyBase}/${url}`);

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("ZenQuotes HTTP error:", response.status, response.statusText, text);
      return `ZenQuotes request failed (${response.status}).`;
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== "object" || data[0] === null) {
      console.error("Unexpected ZenQuotes payload:", data);
      return "ZenQuotes returned an unexpected response.";
    }

    const quote = typeof data[0].q === "string" ? data[0].q.trim() : "";
    const authorRaw = typeof data[0].a === "string" ? data[0].a.trim() : "Unknown";

    if (!quote) {
      console.error("ZenQuotes payload missing quote:", data);
      return "ZenQuotes returned an unexpected response.";
    }

    return `> ${quote}\n\n${formatAuthor(authorRaw)}`;
  } catch (e) {
    console.error("ZenQuotes fetch/parse error:", e);
    return "ZenQuotes request failed (network or parse error).";
  }
}

async function fetchZQRandom() {
  const url = "https://zenquotes.io/api/random";

  try {
    const proxyBase = roamAlphaAPI?.constants?.corsAnywhereProxyUrl;
    if (!proxyBase) {
      console.error("Missing roamAlphaAPI.constants.corsAnywhereProxyUrl");
      return "Roam CORS proxy is not available.";
    }

    const response = await fetch(`${proxyBase}/${url}`);

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("ZenQuotes HTTP error:", response.status, response.statusText, text);
      return `ZenQuotes request failed (${response.status}).`;
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== "object" || data[0] === null) {
      console.error("Unexpected ZenQuotes payload:", data);
      return "ZenQuotes returned an unexpected response.";
    }

    const quote = typeof data[0].q === "string" ? data[0].q.trim() : "";
    const authorRaw = typeof data[0].a === "string" ? data[0].a.trim() : "Unknown";

    if (!quote) {
      console.error("ZenQuotes payload missing quote:", data);
      return "ZenQuotes returned an unexpected response.";
    }

    return `> ${quote}\n\n${formatAuthor(authorRaw)}`;
  } catch (e) {
    console.error("ZenQuotes fetch/parse error:", e);
    return "ZenQuotes request failed (network or parse error).";
  }
}

async function fetchQuotesDbQuote() {
  const url = "https://cdn.jsdelivr.net/gh/JamesFT/Database-Quotes-JSON@master/quotes.json";

  try {
    if (!quotesDbCache) {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        const text = await response.text().catch(() => "");
        console.error("Quotes DB HTTP error:", response.status, response.statusText, text);
        return `Quotes dataset request failed (${response.status}).`;
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length < 500) {
        console.error("Quotes DB suspicious payload size:", data?.length, data);
        return "Quotes dataset returned an incomplete response.";
      }

      quotesDbCache = data;
    }

    const q = quotesDbCache[Math.floor(Math.random() * quotesDbCache.length)];
    const quote = typeof q?.quoteText === "string" ? q.quoteText.trim() : "";
    const authorRaw =
      typeof q?.quoteAuthor === "string" && q.quoteAuthor.trim()
        ? q.quoteAuthor.trim()
        : "Unknown";

    if (!quote) return "Quotes dataset returned an unexpected response.";

    return `> ${quote}\n\n${formatAuthor(authorRaw)}`;
  } catch (e) {
    console.error("Quotes DB fetch error:", e);
    return "Quotes dataset request failed.";
  }
}

async function fetchOfficialJoke() {
  const url = "https://official-joke-api.appspot.com/jokes/general/random";
  try {
    const res = await fetch(url);
    if (!res.ok) return `Official Joke API request failed (${res.status}).`;
    const data = await res.json();

    const j = Array.isArray(data) ? data[0] : data;
    const setup = (j?.setup || "").trim();
    const punchline = (j?.punchline || "").trim();

    if (!setup) return "Official Joke API returned an unexpected response.";
    return `> ${setup}\n\n${punchline ? punchline : ""}`.trim();
  } catch (e) {
    console.error("Official Joke API fetch error:", e);
    return "Official Joke API request failed.";
  }
}

async function fetchProgrammingJoke() {
  const url =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&safe-mode";
  const response = await fetch(url);
  if (!response.ok) return `JokeAPI failed (${response.status}).`;
  const data = await response.json();

  let string = "> ";
  if (data.type === "twopart") {
    string += `${data.setup}\n\n${data.delivery}`;
  } else {
    string += strip(data.joke);
  }
  return string;
}

// -------------------- Helpers --------------------

function sendConfigAlert(key) {
  if (key === "API") {
    showToast("warning", "Please enter your API key in the configuration settings via the Roam Depot tab.");
  } else if (key === "UID") {
    showToast("warning", "Please enter the title of your Quotes page in the configuration settings via the Roam Depot tab.");
  }
}

function showToast(type, message) {
  const base = { message, position: "bottomRight", timeout: 5000 };
  if (type === "error") {
    iziToast.error({ title: "Error", id: "rq_error", ...base });
    return;
  }
  iziToast.warning({ title: "Notice", id: "rq_warning", ...base });
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function strip(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function formatAuthor(authorRaw) {
  const a = (authorRaw || "").toString().trim();
  if (!a) return "Unknown";
  return !/[#[\]{}|]/.test(a) ? `[[${a}]]` : a;
}
