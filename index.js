import chalkAnimation from "chalk-animation";
import fetch from "node-fetch";

const args = process.argv.slice(2);

const parsed = { _ : [] };

const shortFlags = {
	r: "rainbow",
}

for (const arg of args) {
	if (arg.startsWith("--")) {
		parsed[arg.slice(2)] = true;
	} else if (arg.startsWith("-")) {
		if (shortFlags[arg.slice(1)]) {
			parsed[shortFlags[arg.slice(1)]] = true;
		}
	} else {
		parsed._.push(arg);
	}
}

if (parsed.help) {
	console.log("Usage: catfact [--rainbow | -r] [--help]");
}

if (parsed._.length === 0) {
	await randomCatFact(parsed.rainbow);
} else if (parsed._.length === 1) {
	if (parsed._[0] === "list") {
		const response = await fetch("https://catfact.ninja/facts");
		const { data } = await response.json();
		for (const fact of data) {
			console.log(`- ${fact.fact}`);
		}
	} else if (parsed._[0] === "breeds") {
		const response = await fetch("https://catfact.ninja/breeds");
		const { data } = await response.json();
		for (const breed of data) {
			console.log(`
				Breed: ${breed.breed}
				Country: ${breed.country}
				Origin: ${breed.origin}
				Coat: ${breed.coat}
				Pattern: ${breed.pattern}
			`);
		}
	}
}

async function randomCatFact(rainbow = false) {
	console.log("=^.^=");
	const response = await fetch("https://catfact.ninja/fact");
	const { fact } = await response.json();
	if (rainbow) {
		chalkAnimation.rainbow(fact);
	} else {
		console.log(fact);
	}
}