import { Cormorant, Lora, Marhey, Overpass, Poppins, Sono, Roboto, Roboto_Condensed, Bungee, Unica_One, Mirza, Alegreya } from "@next/font/google";

const lora = Lora({ subsets: ['latin'] });
const marhey = Marhey({ subsets: ['latin'] });
const overpass = Overpass({weight: ["400", "700", "900"], subsets: ['latin']});
const poppins = Poppins({weight: ["400", "700"], subsets: ['latin'] });
const sono = Sono({weight: ["400", "700"],  subsets: ['latin']});
const roboto = Roboto({weight: ["400", "700"],  subsets: ['latin']});
const cormorant = Cormorant({weight: ["300", "400", "700"],  subsets: ['latin']});
const robotoCondensed = Roboto_Condensed({weight: ["400", "700"],  subsets: ['latin']});
const bungee = Bungee({weight:"400",  subsets: ['latin']});
const mirza = Mirza({weight: "400",  subsets: ['latin']});
const alegreya = Alegreya({weight: ["400", "700", "800"], subsets: ['latin']});

function FontSnippet() {
  return (
    <style jsx global>{`
        :root {
          --font-lora: ${lora.style.fontFamily};
          --font-marhey: ${marhey.style.fontFamily};
          --font-overpass: ${overpass.style.fontFamily};
          --font-poppins: ${poppins.style.fontFamily};
          --font-sono: ${sono.style.fontFamily};
          --font-cormorant: ${cormorant.style.fontFamily};
          --font-roboto: ${roboto.style.fontFamily};
          --font-bungee: ${bungee.style.fontFamily};
          --font-roboto-condensed: ${robotoCondensed.style.fontFamily};
          --font-fancy: ${mirza.style.fontFamily};
          --font-alegreya: ${alegreya.style.fontFamily};
        }
      `}</style>
  )
}

export default FontSnippet;