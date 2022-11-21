import { Lora, Marhey, Overpass, Poppins, Sono } from "@next/font/google";

const lora = Lora({ subsets: ['latin'] });
const marhey = Marhey({ subsets: ['latin'] });
const overpass = Overpass({ subsets: ['latin'] });
const poppins = Poppins({ subsets: ['latin'], weight: ["400", "700"] });
const sono = Sono({ subsets: ['latin'], weight: ["400", "700"] });

function FontSnippet() {
  return (
    <style jsx global>{`
        html {
          --font-lora: ${lora.style.fontFamily};
          --font-marhey: ${marhey.style.fontFamily};
          --font-overpass: ${overpass.style.fontFamily};
          --font-poppins: ${poppins.style.fontFamily};
          --font-sono: ${sono.style.fontFamily};
        }
      `}</style>
  )
}

export default FontSnippet;