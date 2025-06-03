// src/theme.js
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
    globalCss: {
    "html, body": {
      fontFamily: "body",
    },
    "main": {
      fontFamily: "heading",
    },
    
  },
    theme:{
        tokens:{
            fonts:{
                heading:`"Rubik"`,
                main:`"Rubik"`
            }
        }
    },
   
})
export const system = createSystem(defaultConfig, customConfig)

