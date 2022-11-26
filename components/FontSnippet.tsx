import { Cormorant, Lora, Marhey, Overpass, Poppins, Sono, Roboto, Roboto_Condensed } from "@next/font/google";

const lora = Lora({ subsets: ['latin'] });
const marhey = Marhey({ subsets: ['latin'] });
const overpass = Overpass({ subsets: ['latin'], weight: ["400", "700", "900"] });
const poppins = Poppins({ subsets: ['latin'], weight: ["400", "700"] });
const sono = Sono({ subsets: ['latin'], weight: ["400", "700"] });
const roboto = Roboto({ subsets: ['latin'], weight: ["400", "700"] });
const cormorant = Cormorant({weight: ["300", "400", "700"]});
const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], weight: ["400", "700"] });

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
          --font-roboto-condensed: ${robotoCondensed.style.fontFamily};
        }
      `}</style>
  )
}

export default FontSnippet;